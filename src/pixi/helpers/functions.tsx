import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';
import * as REDUX from './redux';

import { IHelpers } from './types';
import { Moment } from 'moment';

import { ControlPanelContainer } from '../react/ControlPanel';
import { createStore, Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const createBar = (index: number) => {
  const bar: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  bar.position.x = index * CONSTANT.positionConstant;
  bar.tint = CONSTANT.whiteColour;
  bar.width = CONSTANT.widthConstant;
  bar.height = CONSTANT.heightConstant;
  bar.anchor.set(1);
  return bar;
}

export const createApp = (domElement: Element) => {
  const app: PIXI.Application = new PIXI.Application(600, 160, { antialias: true, backgroundColor: 0xffffff });
  const container: PIXI.Container = new PIXI.Container();
  container.x = 0;
  container.y = app.screen.height;
  
  for (let i = 0; i < CONSTANT.elementTotal; i++) {
    container.addChild(createBar(i));
  }
  
  app.stage.addChild(container);
  domElement.appendChild(app.view);

  return app;  
}

export const isElementInViewport = (el: Element) => {
  var rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}

export const attachGraphIfInViewPort = (hasGraph: boolean, domElement: Element | null): PIXI.Application | null => {
  if (domElement) {
    if (isElementInViewport(domElement)) {
      return createApp(domElement);
    }  
  }
  return null;
}


export const runAnimation = (graph: IHelpers.BrainGraph): IHelpers.BrainGraph => {
  // @ts-ignore it says that children[0] isn't the container, however it is. 
  const { previousTime, previousTimeComparison } = graph.app ? setLoop(graph.app.stage.children[0], graph.store.getState(), graph.previousTime, graph.previousTimeComparison) : { previousTime: null, previousTimeComparison: null };
  if (previousTime) {
    graph.previousTime = previousTime;
  }
  if (previousTimeComparison) {
    graph.previousTimeComparison = previousTimeComparison; 
  }
  return graph;
};

export const runAnimationOnce = (graph: IHelpers.BrainGraph): IHelpers.BrainGraph => {
  if (graph.app) {
    graph.animationFunction = (brainGraphParam: IHelpers.BrainGraph) => runAnimation(brainGraphParam);
  
    graph.app.ticker.add(() => {
      if (graph.animationFunction !== null) {
        graph = graph.animationFunction(graph);
      }
    });  
    return graph;
  }
  return graph;
}

const setLoop = (container: PIXI.Container, store: IHelpers.Options, previousTime: number, previousTimeComparison: Moment) => {
  const rateOfChange: number = +previousTimeComparison.format("SSS") / 1000;
  
  if (previousTime + store.speedFunction[0](store.speed, rateOfChange) < +previousTimeComparison.format("x")) {
    const randomColourIndex: number = Array.isArray(store.colour) ? Math.floor(Math.random() * store.colour.length) : 0;
    const randomHeightIndex: number = Array.isArray(store.height) ? Math.floor(Math.random() * store.height.length) : 0;

    for (let index = 0; index < CONSTANT.elementTotal; index++) {
      for (let j = 0; j < store.behaviour.length; j++) {
        if (rateOfChange < store.behaviour[j]) {
          // @ts-ignore // because tint does exist on Sprite      
          container.getChildAt(index).tint = store.colourPostFunction[j](
            store.colourPost,
            store.colourFunction[j](
              store.colour,
              index,
              store.distributionFunction[0](store.distribution),
              randomColourIndex,
              rateOfChange,
            ),
            index,
            rateOfChange,  
          )

          // @ts-ignore // because height does exist on Sprite      
          container.getChildAt(index).height = store.heightPostFunction[j](
              store.heightPost,
              store.heightFunction[j](
                store.height,
                index,
                store.distributionFunction[0](store.distribution),
                randomHeightIndex,
                rateOfChange,
              ),
              index,
              rateOfChange,
            )
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

export const BrainGraph = (name: string, options: IHelpers.Options): IHelpers.BrainGraph => {
  const previousTime: number = +moment().format('x');
  const previousTimeComparison: Moment = moment();
  
  const store: Store<IHelpers.Options, AnyAction> = createStore(REDUX.reducer, options, composeWithDevTools());
  const domElement: Element | null = document.querySelector(`#${name}`);
  const domElementPanel: Element | null = document.querySelector(`#${name}Panel`);

  const app: PIXI.Application | null = attachGraphIfInViewPort(store.getState().hasGraph, domElement);

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

export const showElement = (brainGraph: IHelpers.BrainGraph): IHelpers.BrainGraph => {
  
  if (brainGraph.domElement) {

    const domElementPosition = brainGraph.domElement.getBoundingClientRect();

    // if graph is in bounds
    if (domElementPosition.top < 600 && domElementPosition.top > -300) {

      if (!brainGraph.app) {
        // create app 
        brainGraph.app = createApp(brainGraph.domElement);

        // create animate function
        brainGraph.animationFunction = (brainGraphParam) => runAnimation(brainGraphParam);

        // run animation
        brainGraph.app.ticker.add(() => {
          if (brainGraph.animationFunction !== null) {
            brainGraph = brainGraph.animationFunction(brainGraph);
          }
        });
      }
    }

    // if the graph is out of bounds
    if (domElementPosition.top > 600 || domElementPosition.top < -300) {
      
      // if graph exists
      if (brainGraph.app) {

        // remove animation first
        if ( brainGraph.animationFunction ) {
          brainGraph.app.ticker.remove(brainGraph.animationFunction);
          brainGraph.animationFunction = null;            
        }

        // remove renderer
        // I think this needs to be children[0]? to truly access the container.
        brainGraph.app.stage.removeChild(brainGraph.app.stage.children[0]);
        
        brainGraph.app = null;
        if (brainGraph.domElement.firstChild) {
          brainGraph.domElement.removeChild(brainGraph.domElement.firstChild);
        }
      }
    }
  }
  return brainGraph;  
}

export const createGraph = (name: string): IHelpers.BrainGraph => {
  let graph = BrainGraph("normalBrain", REDUX.normalBrain);
      graph = runAnimationOnce(graph);

  window.addEventListener('scroll', function() { 
    graph = showElement(graph);
  }, false);  

  return graph;
}
