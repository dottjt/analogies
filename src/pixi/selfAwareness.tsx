// import * as ReactDOM from 'react-dom';
// import * as React from 'react';
// import { ChecklistFullContainer, ChecklistPartialContainer, ChecklistItemAnnotation } from './react/Checklist';
// import { createCube, createCrazyCube } from '../three/three';
import { createBrainGraph } from './helpers/brain';
import * as REDUX from './helpers/reduxBrain';

// EXTERNAL COMPONENTS


// GRAPH COMPONENTS
createBrainGraph("selfAwareness", REDUX.selfAwareness);
createBrainGraph("selfAwarenessGraph", REDUX.selfAwarenessGraph);

createBrainGraph("selectiveClarityBrainSlower", REDUX.options(REDUX.selectiveClarityBrain, { speed: 500 }));
createBrainGraph("TOJBrain", REDUX.TOJBrain);
createBrainGraph("normalBrainSlower", REDUX.options(REDUX.normalBrain, { speed: 400 }));
createBrainGraph("emptySectionBrain", REDUX.emptySectionBrain);
createBrainGraph("selectiveClarityBrain", REDUX.selectiveClarityBrain);
createBrainGraph("mentalIllnessBrain", REDUX.mentalIllnessBrain);
