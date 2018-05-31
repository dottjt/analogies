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
  const bar: PIXI.Graphics = new PIXI.Graphics();

  bar.lineStyle(CONSTANT.narrativeStandardLineThickness, CONSTANT.standardColour);
  bar.moveTo(CONSTANT.narrativeXPositionConstant, CONSTANT.narrativeYPositionConstant);
  bar.lineTo(120, CONSTANT.narrativeYPositionConstant);

  return bar;
}

const setNarrativeLoop = (container: PIXI.Container, store: IHelpers.NarrativeOptions, previousTime: number, previousTimeComparison: Moment): { previousTime: number, previousTimeComparison: Moment } => {  
  
  const rateOfChange: number = +previousTimeComparison.format("SSS") / 1000;
  
  if (previousTime < +previousTimeComparison.format("x")) {
    const randomColourIndex: number = Array.isArray(store.colour) ? Math.floor(Math.random() * store.colour.length) : 0;
    const randomXPositionIndex: number = Array.isArray(store.xPosition) ? Math.floor(Math.random() * store.xPosition.length) : 0;
    const randomYPositionIndex: number = Array.isArray(store.yPosition) ? Math.floor(Math.random() * store.xPosition.length) : 0;
    const randomlineThicknessIndex: number = Array.isArray(store.lineThickness) ? Math.floor(Math.random() * store.lineThickness.length) : 0;

    for (let index = 0; index < container.children.length; index++) {
      for (let behaviourIndex = 0; behaviourIndex < store.behaviour.length; behaviourIndex++) {
        if (rateOfChange < store.behaviour[behaviourIndex]) {

          const calculateLineThickness = (index: number, behaviourIndex: number): number => store.lineThicknessFunction[behaviourIndex](
            store.lineThickness,
            index,
            store.distributionFunction[0](store.distribution),            
            randomlineThicknessIndex,
            rateOfChange,
          );

          const calculateColour = (index: number, behaviourIndex: number) => store.colourFunction[behaviourIndex](
            store.colour,
            index,
            store.distributionFunction[0](store.distribution),            
            randomColourIndex,
            rateOfChange,
          );

          const currentXPosition = container.children[index].x;
          const calculateXPosition = (index: number, behaviourIndex: number) => store.xPositionFunction[behaviourIndex](
            currentXPosition,
            store.xPosition,
            index,
            store.distributionFunction[0](store.distribution),            
            randomXPositionIndex,
            rateOfChange,
          );

          const currentYPosition = container.children[index].y;          
          const calculateYPosition = (index: number, behaviourIndex: number) => store.yPositionFunction[behaviourIndex](
            currentYPosition,
            store.yPosition,
            index,
            store.distributionFunction[0](store.distribution),            
            randomYPositionIndex,
            rateOfChange,
          );

          console.log(container.children[index]);

          // @ts-ignore // because clear does exist on DisplayObject                
          // container.children[index].clear();

          // @ts-ignore // because lineStyle does exist on DisplayObject      
          container.children[index].lineStyle(calculateLineThickness(index, behaviourIndex), calculateColour(index, behaviourIndex), 1);
          
          // @ts-ignore // because lineStyle does exist on DisplayObject      
          container.children[index].lineTo(calculateXPosition(index, behaviourIndex), calculateYPosition(index, behaviourIndex));


          if (currentXPosition > 600) {          
            // @ts-ignore // because lineStyle does exist on DisplayObject                                      
            container.children[index].lineStyle(CONSTANT.narrativeStandardLineThickness, CONSTANT.whiteColour)

            // @ts-ignore // because lineStyle does exist on DisplayObject                          
            container.children[index].moveTo(CONSTANT.narrativeXPositionConstant, CONSTANT.narrativeYPositionConstant);

            // @ts-ignore // because lineStyle does exist on DisplayObject                          
            container.children[index].lineTo(0, CONSTANT.narrativeYPositionConstant);
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
};

export const NarrativeGraph = (name: string, options: IHelpers.NarrativeOptions): IHelpers.NarrativeGraph => {
  const previousTime: number = +moment().format('x');
  const previousTimeComparison: Moment = moment();
  
  const store: Store<IHelpers.NarrativeOptions, AnyAction> = createStore(REDUX_NARRATIVE.reducer, options, composeWithDevTools());
  const domElement: Element | null = document.querySelector(`#${name}`);

  const app: PIXI.Application | null = attachGraphIfInViewPort(store.getState().hasGraph, domElement, createNarrativeGraphLine, "narrative");

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
      graph = runAnimationOnce(graph, setNarrativeLoop);

  window.addEventListener('scroll', function() { 
    graph = showElement(graph, createNarrativeGraphLine, setNarrativeLoop, "narrative");
  }, false);  
}
