import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';
import * as HELPERS from './helpers';

import { ControlPanelContainer } from '../react/components.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';




export const BrainGraph = (name, options) => {
  let previousTime = moment().format("x");
  let previousTimeComparison = moment();
  
  let store = createStore(HELPERS.reducer, options, composeWithDevTools());

  let domElement = document.querySelector(`#${name}`);
  let domElementPanel = document.querySelector(`#${name}Panel`);

  let app = new PIXI.Application(600, 160, { antialias: true, backgroundColor: 0xffffff });
  let container = new PIXI.Container();
      container.x = 0;
      container.y = app.screen.height;

  // CREATE GRAPH
  if (store.getState().hasGraph) {
    for (let i = 0; i < CONSTANT.elementTotal; i++) {
      container.addChild(createBar(i));
    }

    app.stage.addChild(container);
    domElement.appendChild(app.view);    
  }

  // CREATE CONTROL PANEL 
  if (store.getState().hasControlPanel) {
    ReactDOM.render(
    <Provider store={store}>
      <ControlPanelContainer/>
    </Provider>, domElementPanel);
  }

  return {
    app,
    container,
    store: store.getState(),
    previousTime,
    previousTimeComparison,
  }
}


export const setLoop = (container, store, previousTime, previousTimeComparison) => {
  let rateOfChange = previousTimeComparison.format("SSS") / 1000;
  let randomColourIndex = Math.floor(Math.random() * store.colour.length);
  let randomHeightIndex = Math.floor(Math.random() * store.height.length);

  if (previousTime + store.speedFunction(store.speed, rateOfChange) < previousTimeComparison.format("x")) {
    for (let index = 0; index < CONSTANT.elementTotal; index++) {
      container.children[index].tint = store.colourFunction(
          store.colour,
          index,
          store.distributionFunction(store.distribution),
          randomColourIndex,
          rateOfChange,
          store.behaviour,
          store.behaviourFunctionColour,
        );

      container.children[index].height = store.frequencyFunction(
          store.frequency,
          store.heightFunction(
            store.height,
            index,
            store.distributionFunction(store.distribution),
            randomHeightIndex,
            rateOfChange,
            store.behaviour,
            store.behaviourFunctionHeight,
          ),
          index,
          rateOfChange,
          store.behaviour,
          store.behaviourFunctionFrequency,
        );
    }
    return {
      previousTime: moment(),
      previousTimeComparison: moment(),
    }
  }
  return {
    previousTime: previousTime,
    previousTimeComparison: moment(),
  }
}

const createBar = (index) => {
  let bar = new PIXI.Sprite(PIXI.Texture.WHITE);
      bar.position.x = index * CONSTANT.positionConstant;
      bar.tint = CONSTANT.whiteColour;
      bar.width = CONSTANT.widthConstant;
      bar.height = CONSTANT.heightConstant;
      bar.anchor.set(1);
  return bar;
}
