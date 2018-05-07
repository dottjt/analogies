import ReactDOM from 'react-dom';
import React from 'react';
import { Checklist } from './react/components.jsx';

import * as CONSTANT from './helpers/constants';
import * as HELPERS from './helpers/helpers';

import BrainGraph from './helpers/functions';

ReactDOM.render(<Checklist crossout={false} />, document.querySelector('.introduction__checklist'));
ReactDOM.render(<Checklist crossout={true} />, document.querySelector('.introduction__checklist__crossout'));

new BrainGraph("normalBrain", HELPERS.normalBrain);
new BrainGraph("normalBrainTwo", HELPERS.normalBrain);
new BrainGraph("normalBrainThree", HELPERS.normalBrain);

new BrainGraph("TOJBrain", HELPERS.TOJBrain);
new BrainGraph("TOJBrainGroup", HELPERS.TOJBrainGroup);

new BrainGraph("emptySectionBrain", HELPERS.emptySectionBrain);

new BrainGraph("selectiveClarityBrain", HELPERS.selectiveClarityBrain);

new BrainGraph("overloadBrain", HELPERS.overloadBrain);
new BrainGraph("overloadBrainTwo", HELPERS.overloadBrain);

new BrainGraph("emptyBrain", HELPERS.emptyBrain);
new BrainGraph("emptyBrainTwo", HELPERS.emptyBrain);

new BrainGraph("emptyClarityBrain", HELPERS.emptyClarityBrain);

new BrainGraph("mentalIllnessBrain", HELPERS.mentalIllnessBrain);



