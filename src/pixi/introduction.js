import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Checklist } from './react/components.jsx';

import * as CONSTANT from './helpers/constants';
import * as HELPERS from './helpers/helpers';
import moment from 'moment';
import { BrainGraph, setLoop } from './helpers/functions';

ReactDOM.render(<Checklist crossout={false} />, document.querySelector('.introduction__checklist'));
ReactDOM.render(<Checklist crossout={true} />, document.querySelector('.introduction__checklist__crossout'));

let normalBrain = BrainGraph("normalBrain", HELPERS.normalBrain);
let pT1 = normalBrain.previousTime;
let pT1C = normalBrain.previousTimeComparison;

normalBrain.app.ticker.add(delta => {
  let { previousTime, previousTimeComparison } = setLoop(normalBrain.container, normalBrain.store, pT1, pT1C);
  pT1 = previousTime; pT1C = previousTimeComparison;
});


// new BrainGraph("normalBrainTwo", HELPERS.normalBrain);
// new BrainGraph("normalBrainThree", HELPERS.normalBrain);

// new BrainGraph("TOJBrain", HELPERS.TOJBrain);
// new BrainGraph("TOJBrainGroup", HELPERS.TOJBrainGroup);

// new BrainGraph("emptySectionBrain", HELPERS.emptySectionBrain);

// new BrainGraph("selectiveClarityBrain", HELPERS.selectiveClarityBrain);

// new BrainGraph("overloadBrain", HELPERS.overloadBrain);
// new BrainGraph("overloadBrainTwo", HELPERS.overloadBrain);

// new BrainGraph("emptyBrain", HELPERS.emptyBrain);
// new BrainGraph("emptyBrainTwo", HELPERS.emptyBrain);

// new BrainGraph("emptyClarityBrain", HELPERS.emptyClarityBrain);

// new BrainGraph("mentalIllnessBrain", HELPERS.mentalIllnessBrain);



