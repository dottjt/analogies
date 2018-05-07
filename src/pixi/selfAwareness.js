import * as CONSTANT from './helpers/constants';
import * as HELPERS from './helpers/helpers';

import BrainGraph from './helpers/functions';

new BrainGraph("selfAwareness", HELPERS.options(HELPERS.normalBrainOptions, {
  hasGraph: false,
  hasControlPanel: true,
  
  changeSpeed: true,
  organiseDirection: true,
  // createDirection: true,
  singleOutDirection: true,
  balanceClarity: true,
}));

new BrainGraph("normalBrain", HELPERS.options(HELPERS.normalBrain, {
  hasControlPanel: true,
  
  changeSpeed: true,
  organiseDirection: true,
  // createDirection: true,
  singleOutDirection: true,
  balanceClarity: true,
}));


new BrainGraph("selectiveClarityBrainSlower", HELPERS.options(HELPERS.selectiveClarityBrain, { speed: 500 }));
new BrainGraph("TOJBrain", HELPERS.TOJBrain);
new BrainGraph("normalBrainSlower", HELPERS.options(HELPERS.normalBrain, { speed: 400 }));
new BrainGraph("emptySectionBrain", HELPERS.emptySectionBrain);
new BrainGraph("selectiveClarityBrain", HELPERS.selectiveClarityBrain);
new BrainGraph("mentalIllnessBrain", HELPERS.mentalIllnessBrain);
