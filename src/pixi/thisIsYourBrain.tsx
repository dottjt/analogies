import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ChecklistFullContainer, ChecklistPartialContainer, ChecklistItemAnnotation } from './react/Checklist';
import { createBrainGraph } from './helpers/brain';
import { createCube, createCrazyCube } from '../three/three';
import * as REDUX_BRAIN from './helpers/reduxBrain';

// EXTERNAL COMPONENTS

ReactDOM.render(<ChecklistFullContainer />, document.querySelector('.introduction__checklist'));
ReactDOM.render(<ChecklistPartialContainer />, document.querySelector('.introduction__checklist__crossout'));
ReactDOM.render(<ChecklistItemAnnotation />, document.querySelector('.checklist__item'));

createCube("cube");
createCrazyCube("crazy_cube");

// GRAPH COMPONENTS

createBrainGraph("normalBrain", REDUX_BRAIN.normalBrain);
// createBrainGraph("normalBrainTwo", REDUX_BRAIN.normalBrain);
// createBrainGraph("thoughtBrain", REDUX_BRAIN.thoughtBrain);
// createBrainGraph("TOJBrain", REDUX_BRAIN.TOJBrain);
// createBrainGraph("TOJBrainGroup", REDUX_BRAIN.TOJBrainGroup);
// createBrainGraph("emptySectionBrain", REDUX_BRAIN.emptySectionBrain);
// createBrainGraph("selectiveClarityBrain", REDUX_BRAIN.selectiveClarityBrain);
// createBrainGraph("overloadBrain", REDUX_BRAIN.overloadBrain);
// createBrainGraph("overloadBrainTwo", REDUX_BRAIN.overloadBrain);
// createBrainGraph("emptyBrain", REDUX_BRAIN.emptyBrain);
// createBrainGraph("emptyBrainTwo", REDUX_BRAIN.emptyBrain);
// createBrainGraph("emptyClarityBrain", REDUX_BRAIN.emptyClarityBrain);
// createBrainGraph("mentalIllnessBrain", REDUX_BRAIN.mentalIllnessBrain);

// createBrainGraph("multipleConfigurationBrain", REDUX_BRAIN.multipleConfigurationBrainMentalIllness);
// createBrainGraph("multipleConfigurationBrainTwo", REDUX_BRAIN.multipleConfigurationBrainAdjusted);
