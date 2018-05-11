// import ReactDOM from 'react-dom';
// import React from 'react';
// import { ChecklistFullContainer, ChecklistPartialContainer, ChecklistItemAnnotation } from './react/Checklist.jsx';
import { BrainGraph, runAnimation } from './helpers/functions';
// import { createCube, createCrazyCube } from '../three/three';
import * as REDUX from './react/redux';
// import BrainGraphIndex from './react';

// EXTERNAL COMPONENTS

// GRAPH COMPONENTS
// BrainGraph("selfAwareness", REDUX.selfAwareness);

let normalBrain = BrainGraph("normalBrain", REDUX.selfAwarenessGraph);
    normalBrain.app.ticker.add(() => {
      normalBrain = runAnimation(normalBrain);
    });



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
