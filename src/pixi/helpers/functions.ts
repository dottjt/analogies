import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';

import { Moment } from 'moment';
import { IHelpers } from './types';

export const createGraphApp = (domElement: Element, childType: String, child: any): PIXI.Application => {
  const app: PIXI.Application = new PIXI.Application(600, 160, { antialias: true, backgroundColor: 0xffffff });
  const container: PIXI.Container = new PIXI.Container();
  container.x = 0;
  container.y = app.screen.height;
  
  switch (childType) {
    case "brain":
      for (let i = 0; i < CONSTANT.brainElementTotal; i++) {
        container.addChild(child(i));
      }
      break;

    case "narrative":
      container.addChild(child());
      break;

    default: 
      null
  }

  app.stage.addChild(container);
  domElement.appendChild(app.view);
  
  return app;  
}

export const isElementInViewport = (el: Element): Boolean => {
  var rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}


export const runAnimation = (graph: IHelpers.BrainGraph | IHelpers.NarrativeGraph, graphLoopFunction: any): IHelpers.BrainGraph | IHelpers.NarrativeGraph => {
  // @ts-ignore it says that children[0] isn't the container, however it is. 

  const { previousTime, previousTimeComparison } = graph.app ? graphLoopFunction(graph.app.stage.children[0], graph.store.getState(), graph.previousTime, graph.previousTimeComparison) : { previousTime: null, previousTimeComparison: null };

  if (previousTime) {
    graph.previousTime = previousTime;
  }
  if (previousTimeComparison) {
    graph.previousTimeComparison = previousTimeComparison; 
  }
  return graph;
};


export const runAnimationOnce = (graph: IHelpers.BrainGraph | IHelpers.NarrativeGraph, graphLoopFunction: any): IHelpers.BrainGraph | IHelpers.NarrativeGraph => {
  if (graph.app) {

    graph.animationFunction = (graphParams: IHelpers.BrainGraph | IHelpers.NarrativeGraph) => runAnimation(graphParams, graphLoopFunction);
  
    graph.app.ticker.add(() => {
      if (graph.animationFunction !== null) {
        graph = graph.animationFunction(graph);
      }
    });  


    return graph;
  }
  return graph;
}

export const attachGraphIfInViewPort = (hasGraph: boolean, domElement: Element | null, createGraphFunction: (index: number) => PIXI.Sprite | PIXI.Graphics, graphType: String): PIXI.Application | null => {
  if (domElement) {
    if (isElementInViewport(domElement)) {
      return createGraphApp(domElement, graphType, createGraphFunction);
    }  
  }
  return null;
}

                                                                                                                                                                                    // setting 'store' to any is the only way to make this work.
export const showElement = (graph: IHelpers.BrainGraph | IHelpers.NarrativeGraph, createGraphFunction: (index: number) => PIXI.Sprite | PIXI.Graphics, graphLoopFunction: (container: PIXI.Container, store: any, previousTime: number, previousTimeComparison: Moment) => { previousTime: number, previousTimeComparison: Moment }, graphType: String): IHelpers.BrainGraph | IHelpers.NarrativeGraph => {
  
  if (graph.domElement) {

    const domElementPosition = graph.domElement.getBoundingClientRect();

    // if graph is in bounds
    if (domElementPosition.top < 900 && domElementPosition.top > -900) {

      if (!graph.app) {
        // create app 
        graph.app = createGraphApp(graph.domElement, graphType, createGraphFunction);

        // create animate function
        graph.animationFunction = (graphParam: IHelpers.BrainGraph): IHelpers.BrainGraph => runAnimation(graphParam, graphLoopFunction);

        // run animation
        graph.app.ticker.add(() => {
          if (graph.animationFunction !== null) {
            graph = graph.animationFunction(graph);
          }
        });
      }
    }

    // if the graph is out of bounds
    if (domElementPosition.top > 900 || domElementPosition.top < -900) {
      
      // if graph exists
      if (graph.app) {

        // remove animation first
        if (graph.animationFunction) {
          graph.app.ticker.remove(graph.animationFunction);
          graph.animationFunction = null;            
        }

        // remove renderer
        // I think this needs to be children[0]? to truly access the container.
        graph.app.stage.removeChild(graph.app.stage.children[0]);
        
        graph.app = null;
        if (graph.domElement.firstChild) {
          graph.domElement.removeChild(graph.domElement.firstChild);
        }
      }
    }
  }
  return graph;
}