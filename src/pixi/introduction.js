import * as CONSTANT from './helpers/constants';
import * as HELPERS from './helpers/helpers';

import BrainGraph from './helpers/functions';


new BrainGraph("normalBrain", HELPERS.normalBrainOptions);
new BrainGraph("normalBrainTwo", HELPERS.normalBrainOptions);
new BrainGraph("normalBrainThree", HELPERS.normalBrainOptions);

new BrainGraph("TOJBrain", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleRandomOrder,
}));

new BrainGraph("TOJBrainGroup", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSections,
  frequency: 1,
}));

new BrainGraph("emptySectionBrain", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSections,
  distribution: [0, 80, 120, 200],
  frequency: 0.8,
}));

new BrainGraph("selectiveClarityBrain", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSectionRandom,
  distribution: [0, 80, 120, 200],
  frequency: 1,
}));

new BrainGraph("selectiveClarityBrainSlower", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSectionRandom,
  distribution: [0, 80, 120, 200],
  frequency: 1,
  speed: 800,
}));


new BrainGraph("overloadBrain", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: CONSTANT.thoughtColour,
  frequency: 1,
  frequencyFunction: HELPERS.jammingFrequency,
}));

new BrainGraph("overloadBrainTwo", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: CONSTANT.thoughtColour,
  frequency: 1,
  frequencyFunction: HELPERS.jammingFrequency,
}));

new BrainGraph("emptyBrain", HELPERS.options(HELPERS.normalBrainOptions, {
    colour: CONSTANT.thoughtColour,
    height: CONSTANT.heightConstantTiny,
    frequency: CONSTANT.frequencyConstantTiny,
  }
));

new BrainGraph("emptyBrainTwo", HELPERS.options(HELPERS.normalBrainOptions, {
  colour: CONSTANT.thoughtColour,
  height: CONSTANT.heightConstantTiny,
  frequency: CONSTANT.frequencyConstantTiny,
}));


// new BrainGraph("emptyClarityBrain", HELPERS.options(HELPERS.normalBrainOptions, {
//   colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
//   colourFunction: HELPERS.multipleRandomOrder,

//   frequency: [ CONSTANT.frequencyConstant, CONSTANT.frequencyConstantTiny ],
//   frequencyFunction: HELPERS.multipleBehaviour,

//   behaviourFunction: [ HELPERS.percentageShowFrequency, HELPERS.jammingFrequency ],

//   height: [ CONSTANT.heightConstant, CONSTANT.heightConstantTiny ],
//   heightFunction: HELPERS.multipleBehaviour,

//   speed: 300,
// }));

// new BrainGraph("mentalIllnessBrain", HELPERS.options(HELPERS.mentalIllnessBrainOptions, {
//   colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
//   colourFunction: HELPERS.multipleRandomOrder,

//   frequency: [ CONSTANT.frequencyConstant, CONSTANT.frequencyConstantTiny ],
//   frequencyFunction: HELPERS.multipleBehaviour,

//   height: [ CONSTANT.heightConstant, CONSTANT.heightConstantTiny ],
//   heightFunction: HELPERS.multipleBehaviour,

//   behaviourFunction: [ HELPERS.percentageShowFrequency, HELPERS.jammingFrequency ],
  
//   speed: 200,
// }));



