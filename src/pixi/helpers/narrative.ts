// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';
import * as REDUX_NARRATIVE from './reduxNarrative';
import { runAnimationOnce, attachGraphIfInViewPort, showElement } from './functions';

import { IHelpers } from './types';
import { Moment } from 'moment';

// import { ControlPanelContainer } from '../react/ControlPanel';
import { createStore, Store, AnyAction } from 'redux';
// import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const createNarrativeGraphLine = (): PIXI.Graphics => {
  const bar: PIXI.Graphics = new PIXI.Graphics(); // ; = new PIXI.Sprite(PIXI.Texture.WHITE);

  bar.position.x = CONSTANT.narrativeXPositionConstant;
  bar.position.y = CONSTANT.narrativeYPositionConstant;

  bar.lineStyle(CONSTANT.narrativeStandardLineThickness, CONSTANT.whiteColour)
      //  .moveTo(0, 0)
      //  .lineTo(endPoint.x, endPoint.y);

  return bar;
}

const setNarrativeLoop = (container: PIXI.Container, store: IHelpers.NarrativeOptions, previousTime: number, previousTimeComparison: Moment): { previousTime: number, previousTimeComparison: Moment } => {  
  
  if (previousTime < +previousTimeComparison.format("x")) {
    const randomColourIndex: number = Array.isArray(store.colour) ? Math.floor(Math.random() * store.colour.length) : 0;
    const randomXPositionIndex: number = Array.isArray(store.xPosition) ? Math.floor(Math.random() * store.xPosition.length) : 0;
    const randomYPositionIndex: number = Array.isArray(store.yPosition) ? Math.floor(Math.random() * store.xPosition.length) : 0;
    const randomlineThickness: number = Array.isArray(store.lineThickness) ? Math.floor(Math.random() * store.lineThickness.length) : 0;

    for (let index = 0; index < container.children.length; index++) {
      for (let behaviourIndex = 0; behaviourIndex < store.behaviour.length; behaviourIndex++) {
        if (rateOfChange < store.behaviour[behaviourIndex]) {

          const calculateLineThickness = () => 

          const calculateLineColour = () => 

          const 

          const calculateXPosition = () => 

          const calculateYPosition = () => 

          // @ts-ignore // because lineStyle does exist on DisplayObject      
          container.children[index].lineStyle(calculateLineThickness, calculateLineColour)
                                  .lineTo(calculateXPosition, calculateYPosition)


          if (container.children[index].position.x > 600) {
            
            container.children[index].position.x = CONSTANT.narrativeXPositionConstant;
            container.children[index].position.y = CONSTANT.narrativeYPositionConstant;
          
            // @ts-ignore // because lineStyle does exist on DisplayObject              
            container.children[index].lineStyle(CONSTANT.narrativeStandardLineThickness, CONSTANT.whiteColour)
                                    .moveTo(0, 0)
                                    .lineTo(0, 0)
          }
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

  // we have 50 frames. 
  // a sprite should move through those frames. So really, we only need one sprite
  // (we need the ability to add multiple sprites to the container, at some point)

  // we divide each of the 50 positions by the duration? so if we hit a specific duration, we 
};

export const NarrativeGraph = (name: string, options: IHelpers.NarrativeOptions): IHelpers.NarrativeGraph => {
  const previousTime: number = +moment().format('x');
  const previousTimeComparison: Moment = moment();
  
  const store: Store<IHelpers.NarrativeOptions, AnyAction> = createStore(REDUX_NARRATIVE.reducer, options, composeWithDevTools());
  const domElement: Element | null = document.querySelector(`#${name}`);

  const app: PIXI.Application | null = attachGraphIfInViewPort(store.getState().hasGraph, domElement);

  return {
    app,
    store,
    domElement,
    animationFunction: null,
    previousTime,
    previousTimeComparison,
  };  
};

export const createNarrativeGraph = (name: string, options: IHelpers.NarrativeOptions): void => {
  let graph = NarrativeGraph(name, options);
      graph = runAnimationOnce(graph);

  window.addEventListener('scroll', function() { 
    graph = showElement(graph);
  }, false);  
}
