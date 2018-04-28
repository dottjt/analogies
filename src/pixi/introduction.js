import moment from 'moment';
import mojs from 'mo-js';

import * as CONSTANT from './helpers/constants';
import BrainGraph from './helpers/functions';
import {
  heightWithClarityConstant,
  heightWithJamming,
  randomTOJColour
} from './helpers/helpers';


let normalBrain = new BrainGraph(
  "normalBrain",
  CONSTANT.timeFormat,
  { colour: () => CONSTANT.standardBarColour,
    height: () => heightWithClarityConstant(CONSTANT.clarityConstant, CONSTANT.heightConstant),
  }
)
normalBrain.app.ticker.add(delta => normalBrain.brainActivity());


let normalBrainTwo = new BrainGraph(
  "normalBrainTwo",
  CONSTANT.timeFormat,
  { colour: () => CONSTANT.standardBarColour,
    height: () => heightWithClarityConstant(CONSTANT.clarityConstant, CONSTANT.heightConstant),
  }
)
normalBrainTwo.app.ticker.add(delta => normalBrainTwo.brainActivity());


let normalBrainThree = new BrainGraph(
  "normalBrainThree",
  CONSTANT.timeFormat,
  { colour: () => CONSTANT.standardBarColour,
    height: () => heightWithClarityConstant(CONSTANT.clarityConstant, CONSTANT.heightConstant),
  }
)
normalBrainThree.app.ticker.add(delta => normalBrainThree.brainActivity());


let emptyBrain = new BrainGraph(
  "emptyBrain",
  CONSTANT.timeFormat,
  { colour: () => randomTOJColour(),
    height: () => heightWithClarityConstant(0.01, CONSTANT.heightConstantTiny),
  }
)
emptyBrain.app.ticker.add(delta => emptyBrain.brainActivity());


let emptyBrainTwo = new BrainGraph(
  "emptyBrainTwo",
  CONSTANT.timeFormat,
  { colour: () => randomTOJColour(),
    height: () => heightWithClarityConstant(0.01, CONSTANT.heightConstantTiny),
  }
)
emptyBrainTwo.app.ticker.add(delta => emptyBrainTwo.brainActivity());


let TOJBrain = new BrainGraph(
  "TOJBrain",
  CONSTANT.timeFormat,
  { colour: () => randomTOJColour(),
    height: () => heightWithClarityConstant(CONSTANT.clarityConstant, CONSTANT.heightConstant),
  }
)
TOJBrain.app.ticker.add(delta => TOJBrain.brainActivity());


let overloadBrain = new BrainGraph(
  "overloadBrain",
  CONSTANT.timeFormat,
  { colour: () => CONSTANT.thoughtColour,
    height: () => heightWithJamming(CONSTANT.heightConstant),
  }
)
overloadBrain.app.ticker.add(delta => overloadBrain.brainActivity());


let overloadBrainTwo = new BrainGraph(
  "overloadBrainTwo",
  CONSTANT.timeFormat,
  { colour: () => CONSTANT.thoughtColour,
    height: () => heightWithJamming(CONSTANT.heightConstant),
  }
)
overloadBrainTwo.app.ticker.add(delta => overloadBrainTwo.brainActivity());


let emptyClarityBrain = new BrainGraph(
  "emptyClarityBrain",
  CONSTANT.timeFormatSecond,
  { comparison: () => moment().format("ss") % 2 === 0,
    colour: () => randomTOJColour(),
    height: () => heightWithJamming(CONSTANT.heightConstant),
    heightCondition: () => 0,
  }
)
emptyClarityBrain.app.ticker.add(delta => emptyClarityBrain.brainActivityInterval());


let mentalIllnessBrain = new BrainGraph(
  "mentalIllnessBrain",
  CONSTANT.timeFormat,
  { comparison: () => moment().format("S") % 8 !== 0,
    colour: () => randomTOJColour(),
    height: () => heightWithClarityConstant(0.98, CONSTANT.heightConstant),
    heightCondition: () => heightWithClarityConstant(0.015, CONSTANT.heightConstant)
  }
)
mentalIllnessBrain.app.ticker.add(delta => mentalIllnessBrain.brainActivityInterval());


let TOJBrainGroup = new BrainGraph(
  "TOJBrainGroup",
  CONSTANT.timeFormat,
  { ratio: () => [0.7, 0.7, 1],
    ratioType: () => "randomSingle",
    clearGraphAfterEachFrame: () => false,    
    sectionArray:
      [
        {
          height: () => heightWithClarityConstant(0.95, CONSTANT.heightConstant),
          colour: () => CONSTANT.opinionColour,
        },
        {
          height: () => heightWithClarityConstant(0.95, CONSTANT.heightConstant),
          colour: () => CONSTANT.judgementColour,
        },
        {
          height: () => heightWithClarityConstant(0.95, CONSTANT.heightConstant),
          colour: () => CONSTANT.thoughtColour,
        }
      ]
  }
)
TOJBrainGroup.app.ticker.add(delta => TOJBrainGroup.brainActivitySections());


let selectiveClarityBrain = new BrainGraph(
  "selectiveClarityBrain",
  CONSTANT.timeFormat,
  { ratio: () => [0.5, 0.5, 0.5],
    ratioType: () => "randomMulti",
    clearGraphAfterEachFrame: () => true,
    sectionArray:
      [
        { 
          height: () => heightWithClarityConstant(0.95, CONSTANT.heightConstant),
          colour: () => CONSTANT.thoughtColour,
        },
        {
          height: () => heightWithClarityConstant(0.95, CONSTANT.heightConstant),
          colour: () => CONSTANT.judgementColour,
        },
        {
          height: () => heightWithClarityConstant(0.95, CONSTANT.heightConstant),
          colour: () => CONSTANT.opinionColour,
        }
      ]
  }
)
selectiveClarityBrain.app.ticker.add(delta => selectiveClarityBrain.brainActivitySections());



let selectiveClaritySlowerBrain = new BrainGraph(
  "selectiveClaritySlowerBrain",
  CONSTANT.timeFormatSecond,
  { ratio: () => [1, 0.7, 1],
    ratioType: () => "randomMulti",
    clearGraphAfterEachFrame: () => true,
    sectionArray:
      [
        { 
          height: () => heightWithClarityConstant(1, CONSTANT.heightConstant),
          colour: () => CONSTANT.judgementColour,
        },
        {
          height: () => heightWithClarityConstant(1, CONSTANT.heightConstant),
          colour: () => CONSTANT.opinionColour,
        },
        {
          height: () => heightWithClarityConstant(1, CONSTANT.heightConstant),
          colour: () => CONSTANT.thoughtColour,
        }
      ]
  }
)
selectiveClaritySlowerBrain.app.ticker.add(delta => selectiveClaritySlowerBrain.brainActivitySections());



let emptySectionBrain = new BrainGraph(
  "emptySectionBrain",
  CONSTANT.timeFormat,
  { ratio: () => [2, 0.4, 2],
    ratioType: () => "nonRandom",
    clearGraphAfterEachFrame: () => false,    
    sectionArray:
      [
        { 
          height: () => heightWithClarityConstant(1, CONSTANT.heightConstant),
          colour: () => CONSTANT.judgementColour,
        },
        {
          height: () => 0,
          colour: () => CONSTANT.whiteBarColour,
        },
        {
          height: () => heightWithClarityConstant(1, CONSTANT.heightConstant),
          colour: () => CONSTANT.thoughtColour,
        }
      ]
  }
)
emptySectionBrain.app.ticker.add(delta => emptySectionBrain.brainActivitySections());

