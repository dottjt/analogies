import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';
import * as REDUX from './reduxBrain';
import { runAnimationOnce, attachGraphIfInViewPort, showElement } from './functions';

// import * as R from 'ramda';

import { IHelpers } from './types';
import { Moment } from 'moment';

import { ControlPanelContainer } from '../react/ControlPanel';
import { createStore, Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const createBrainGraphBar = (index: number): PIXI.Sprite => {
  const bar: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  bar.position.x = index * CONSTANT.brainPositionConstant;
  bar.tint = CONSTANT.whiteColour;
  bar.width = CONSTANT.brainWidthConstant;
  bar.height = CONSTANT.brainHeightConstant;
  bar.anchor.set(1);
  return bar;
}

                                     // setting 'store' to any is the only way to make this work.
const setBrainLoop = (container: PIXI.Container, store: any, previousTime: number, previousTimeComparison: Moment): { previousTime: number, previousTimeComparison: Moment } => {

  const rateOfChange: number = +previousTimeComparison.format("SSS") / 1000;
  
  if (previousTime + store.speedFunction[0](store.speed, rateOfChange) < +previousTimeComparison.format("x")) {
    const randomColourIndex: number = Array.isArray(store.colour) ? Math.floor(Math.random() * store.colour.length) : 0;
    const randomHeightIndex: number = Array.isArray(store.height) ? Math.floor(Math.random() * store.height.length) : 0;

    for (let index = 0; index < CONSTANT.brainElementTotal; index++) {
      for (let behaviourIndex = 0; behaviourIndex < store.behaviour.length; behaviourIndex++) {
        if (rateOfChange < store.behaviour[behaviourIndex]) {
          
          const calculateColour = (index: number, behaviourIndex: number): number => store.colourFunction[behaviourIndex](
            store.colour,
            index,
            store.distributionFunction[0](store.distribution),
            randomColourIndex,
            rateOfChange,
          );

          const calculatePostColour = (index: number, behaviourIndex: number): number => store.colourPostFunction[behaviourIndex](
            store.colourPost,
            calculateColour(index, behaviourIndex),
            index,
            rateOfChange,  
          );

          // @ts-ignore // because tint does exist on Sprite
          container.getChildAt(index).tint = calculatePostColour(index, behaviourIndex);

          const calculateHeight = (index: number, behaviourIndex: number): number => store.heightFunction[behaviourIndex](
            store.height,
            index,
            store.distributionFunction[0](store.distribution),
            randomHeightIndex,
            rateOfChange,
          );
          
          const calculatePostHeight = (index: number, behaviourIndex: number): number => store.heightPostFunction[behaviourIndex](
            store.heightPost,
            calculateHeight(index, behaviourIndex),
            index,
            rateOfChange,
          );

          // @ts-ignore // because height does exist on Sprite      
          container.getChildAt(index).height = calculatePostHeight(index, behaviourIndex);
        }
      }
    }
    return {
      previousTime: +moment(),
      previousTimeComparison: moment(),
    };
  }
  return {
    previousTime: previousTime,
    previousTimeComparison: moment(),
  };
};

export const BrainGraph = (name: string, options: IHelpers.BrainOptions): IHelpers.BrainGraph => {
  const previousTime: number = +moment().format('x');
  const previousTimeComparison: Moment = moment();
  
  const store: Store<IHelpers.BrainOptions, AnyAction> = createStore(REDUX.reducer, options, composeWithDevTools());
  const domElement: Element | null = document.querySelector(`#${name}`);
  const domElementPanel: Element | null = document.querySelector(`#${name}Panel`);

  const app: PIXI.Application | null = attachGraphIfInViewPort(store.getState().hasGraph, domElement, createBrainGraphBar, "brain");

  // CREATE CONTROL PANEL
  if (store.getState().hasControlPanel && domElementPanel) {

    ReactDOM.render(
      <Provider store={store}>
        <ControlPanelContainer/>
      </Provider>
    , domElementPanel);
  }

  return {
    app,
    store,
    domElement,
    animationFunction: null,
    previousTime,
    previousTimeComparison,
  };  
};


export const createBrainGraph = (name: string, options: IHelpers.BrainOptions): void => {
  let graph = BrainGraph(name, options);
      graph = runAnimationOnce(graph, setBrainLoop);

  window.addEventListener('scroll', function() { 
    graph = showElement(graph, createBrainGraphBar, setBrainLoop, "brain");
  }, false);  
}
