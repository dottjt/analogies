import ReactDOM from 'react-dom';
import React from 'react';
import { ChecklistFullContainer, ChecklistPartialContainer, ChecklistItemAnnotation } from './react/Checklist.jsx';
import { BrainGraph, runAnimation } from './helpers/functions';
import { createCube, createCrazyCube } from '../three/three';
import * as REDUX from './react/redux';
// import BrainGraphIndex from './react';

// EXTERNAL COMPONENTS


ReactDOM.render(<ChecklistFullContainer />, document.querySelector('.introduction__checklist'));
ReactDOM.render(<ChecklistPartialContainer />, document.querySelector('.introduction__checklist__crossout'));
ReactDOM.render(<ChecklistItemAnnotation />, document.querySelector('.checklist__item'));

// ReactDOM.render(<BrainGraphIndex hasGraph={true} hasControlPanel={false} options={REDUX.normalBrain} />, 
//                 document.querySelector('#normalBrain'));

createCube("cube");
createCrazyCube("crazy_cube");


// GRAPH COMPONENTS
let normalBrain = BrainGraph("normalBrain", REDUX.normalBrain);
    normalBrain.app.ticker.add(() => {
      normalBrain = runAnimation(normalBrain);
    });

let normalBrainTwo = BrainGraph("normalBrainTwo", REDUX.normalBrain);
    normalBrainTwo.app.ticker.add(() => {
      normalBrainTwo = runAnimation(normalBrainTwo);
    });
    

let TOJBrain = BrainGraph("TOJBrain", REDUX.TOJBrain);
    TOJBrain.app.ticker.add(() => {
      TOJBrain = runAnimation(TOJBrain);
    });

let TOJBrainGroup = BrainGraph("TOJBrainGroup", REDUX.TOJBrainGroup);
    TOJBrainGroup.app.ticker.add(() => {
      TOJBrainGroup = runAnimation(TOJBrainGroup);
    });


let emptySectionBrain = BrainGraph("emptySectionBrain", REDUX.emptySectionBrain);
    emptySectionBrain.app.ticker.add(() => {
      emptySectionBrain = runAnimation(emptySectionBrain);
    });


let selectiveClarityBrain = BrainGraph("selectiveClarityBrain", REDUX.selectiveClarityBrain);
    selectiveClarityBrain.app.ticker.add(() => {
      selectiveClarityBrain = runAnimation(selectiveClarityBrain);
    });


let overloadBrain = BrainGraph("overloadBrain", REDUX.overloadBrain);
    overloadBrain.app.ticker.add(() => {
      overloadBrain = runAnimation(overloadBrain);
    });

let overloadBrainTwo = BrainGraph("overloadBrainTwo", REDUX.overloadBrain);
    overloadBrainTwo.app.ticker.add(() => {
      overloadBrainTwo = runAnimation(overloadBrainTwo);
    });


let emptyBrain = BrainGraph("emptyBrain", REDUX.emptyBrain);
    emptyBrain.app.ticker.add(() => {
      emptyBrain = runAnimation(emptyBrain);
    });

let emptyBrainTwo = BrainGraph("emptyBrainTwo", REDUX.emptyBrain);
    emptyBrainTwo.app.ticker.add(() => {
      emptyBrainTwo = runAnimation(emptyBrainTwo);
    });


let emptyClarityBrain = BrainGraph("emptyClarityBrain", REDUX.emptyClarityBrain);
    emptyClarityBrain.app.ticker.add(() => {
      emptyClarityBrain = runAnimation(emptyClarityBrain);
    });


let mentalIllnessBrain = BrainGraph("mentalIllnessBrain", REDUX.mentalIllnessBrain);
    mentalIllnessBrain.app.ticker.add(() => {
      mentalIllnessBrain = runAnimation(mentalIllnessBrain);
    });

let multipleConfigurationBrain = BrainGraph("multipleConfigurationBrain", REDUX.multipleConfigurationBrainMentalIllness);
    multipleConfigurationBrain.app.ticker.add(() => {
      multipleConfigurationBrain = runAnimation(multipleConfigurationBrain);
    });

let multipleConfigurationBrainTwo = BrainGraph("multipleConfigurationBrainTwo", REDUX.multipleConfigurationBrainAdjusted);
    multipleConfigurationBrainTwo.app.ticker.add(() => {
      multipleConfigurationBrainTwo = runAnimation(multipleConfigurationBrainTwo);
    });




