import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Checklist } from './react/components.jsx';

import * as CONSTANT from './helpers/constants';
import * as HELPERS from './helpers/helpers';
import moment from 'moment';
import { BrainGraph, setLoop } from './helpers/functions';


let selfAwareness = BrainGraph("selfAwareness", HELPERS.options(HELPERS.normalBrain, {
  hasGraph: true,
  hasControlPanel: true,
  
  changeSpeed: true,
  organiseDirection: true,
  createDirection: true,
  singleOutDirection: true,
  balanceClarity: true,
}));

let store = createStore(HELPERS.reducer, HELPERS.options(HELPERS.normalBrain, {
  hasGraph: true,
  hasControlPanel: true,
  
  changeSpeed: true,
  organiseDirection: true,
  // createDirection: true,
  singleOutDirection: true,
  balanceClarity: true,
}));

let pT1 = selfAwareness.previousTime;
let pT1C = selfAwareness.previousTimeComparison;

let getStore = store.getState();

selfAwareness.app.ticker.add(delta => {
    store.subscribe(() => {  
      getStore = store.getState()
      console.log(getStore);    
    });
  
    let { previousTime, previousTimeComparison } = setLoop(selfAwareness.container, getStore, pT1, pT1C);
    pT1 = previousTime; pT1C = previousTimeComparison; 
});

// create a function which returns both times


// new BrainGraph("normalBrain", HELPERS.options(HELPERS.normalBrain, {
//   hasControlPanel: true,
  
//   changeSpeed: true,
//   organiseDirection: true,
//   // createDirection: true,
//   singleOutDirection: true,
//   balanceClarity: true,
// }));


// new BrainGraph("selectiveClarityBrainSlower", HELPERS.options(HELPERS.selectiveClarityBrain, { speed: 500 }));
// new BrainGraph("TOJBrain", HELPERS.TOJBrain);
// new BrainGraph("normalBrainSlower", HELPERS.options(HELPERS.normalBrain, { speed: 400 }));
// new BrainGraph("emptySectionBrain", HELPERS.emptySectionBrain);
// new BrainGraph("selectiveClarityBrain", HELPERS.selectiveClarityBrain);
// new BrainGraph("mentalIllnessBrain", HELPERS.mentalIllnessBrain);
