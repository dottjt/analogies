
import * as CONSTANT from '../helpers/constants';
import * as HELPERS from '../helpers/helpersBrain';

import { AnyAction } from 'redux';
import { IHelpers } from './types';

// REDUCER
export const reducer = (state = normalBrain, action: AnyAction ): IHelpers.BrainOptions => {
  switch (action.type) {
    // CONTROL PANEL COMPONENTS

      // radio
    case 'ORGANISE_DIRECTION':
      switch (action.value) {
        case 'scrambled':
          return {
            ...state,
            ...TOJBrain,
            organiseDirectionItems: state.organiseDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'organised':
          return { 
            ...state,
            ...TOJBrainGroup,
            organiseDirectionItems: state.organiseDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        default:
          return state;
      }

      // radio
    case 'SINGLE_OUT_DIRECTION':
      switch (action.value) {
        case 'all':
          return { 
            ...state, 
            ...normalBrain,
            colourFunction: [ HELPERS.multipleEvenDistributionSections ],
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'thought':
          return { 
            ...state, 
            ...thoughtBrainPost,
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'opinion':
          return { 
            ...state, 
            ...opinionBrainPost,
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'judgement':
          return { 
            ...state, 
            ...judgementBrainPost,                         
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        default:
          return state;
      }

      // radio
    case 'MULTIPLE_BRAIN_CONFIGURATION':
      switch (action.value) {
        case 'mental illness':
          return {
            ...state,
            ...mentalIllnessBrain,
          };
        case 'balance': 
          return {
            ...state,
            ...normalBrain,
          };
        default:
          return state;
      }
        
      // slider
    case 'CHANGE_SPEED':
      return {
        ...state,
        speed: [ action.value * 10 ],
      };

      // button
    case 'CREATE_DIRECTION':
      switch (action.value) {
        
        case 'gratitude':
          return { 
            ...state, 
            colour: [ CONSTANT.gratitudeColour ],
          };
        case 'clear':
          return { 
            ...state, 
            colour: [ CONSTANT.whiteColour ],
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

// GENERIC OPTIONS

export const options = (normalBrainOptions: IHelpers.BrainOptions, additionalOptions = {}): IHelpers.BrainOptions => ({ ...normalBrainOptions, ...additionalOptions });

export const normalBrain: IHelpers.BrainOptions = {
  // these first two options are only for desktop, not used for react.
  hasGraph: true,
  hasControlPanel: false,

  // slider
  changeSpeed: null, // 1 to 100
  balanceClarity: null, // 1 to 100

  // button
  createDirection: null, // gratitude, clear
  
  // radio
  organiseDirection: null, // scrambled, organised
  singleOutDirection: null, // all, thought, opinion, judgement
  multipleBrainConfiguration: null, // mental illness, balance

  // calculatedHeight: [...Array(200)].fill(CONSTANT.standardColour, 0, 199),
  // calculatedTint: [...Array(200)].fill(CONSTANT.brainHeightConstant, 0, 199),
  // randomColourIndex: 0,
  // randomHeightIndex: 0,
  // rateOfChange: +moment().format('SSS') / 1000,

  colour: [ CONSTANT.standardColour ], // '0x4cfeb1'
  colourFunction: [ HELPERS.constantNumberValue ],

  colourPost: [ CONSTANT.standardColour ],
  colourPostFunction: [ HELPERS.constantColour ],

  height: [ CONSTANT.brainHeightConstant ], // 150
  heightFunction: [ HELPERS.singleMultiplyRandomNumberValue ],

  heightPost: [ CONSTANT.brainHeightPostConstant ], // 0.6
  heightPostFunction: [ HELPERS.percentageHeight ],

  speed: [ CONSTANT.brainStandardSpeed ], // 50
  speedFunction: [ HELPERS.constantSpeed ],

  distribution: [ 0, 66, 132, 200 ], // even distribution
  distributionFunction: [ HELPERS.constantDistribution ],

  behaviour: [1], // split timing

  singleOutDirectionItems: <IHelpers.RadioItem[]> [{
    text: 'all',
    selected: false,
  },
  {
    text: 'thought',
    selected: false,
  },
  {
    text: 'opinion',
    selected: false,
  },
  {
    text: 'judgement',
    selected: false,            
  }],

  organiseDirectionItems: <IHelpers.RadioItem[]> [{
    text: 'scrambled',
    selected: false,
  },
  {
    text: 'organised',
    selected: false,
  }],

  multipleBrainConfigurationItems: <IHelpers.RadioItem[]> [{
    text: 'balance',
    selected: false,
  },
  {
    text: 'mental illness',
    selected: false,
  }],
};

// INITIAL STATE

export const thoughtBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.whiteColour, CONSTANT.thoughtColour, CONSTANT.whiteColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],

  heightPost: [ 1 ],
  distribution: [ 0, 90, 110, 200 ], // even distribution
});

export const thoughtBrainPost: IHelpers.BrainOptions = options(thoughtBrain, {
  colourPost: [ CONSTANT.thoughtColour ],
  colourPostFunction: [ HELPERS.filterColour ],  
});

export const opinionBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.whiteColour, CONSTANT.opinionColour, CONSTANT.whiteColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],

  heightPost: [ 1 ],
  distribution: [ 0, 90, 110, 200 ], // even distribution
});

export const opinionBrainPost: IHelpers.BrainOptions = options(opinionBrain, {
  colourPost: [ CONSTANT.opinionColour ],
  colourPostFunction: [ HELPERS.filterColour ],  
});

export const judgementBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.whiteColour, CONSTANT.judgementColour, CONSTANT.whiteColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],

  heightPost: [ 1 ],
  distribution: [ 0, 90, 110, 200 ], // even distribution
});

export const judgementBrainPost: IHelpers.BrainOptions = options(judgementBrain, {
  colourPost: [ CONSTANT.judgementColour ],
  colourPostFunction: [ HELPERS.filterColour ],  
});




export const TOJBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleRandomArrayIndex ],
});

export const TOJBrainGroup: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],
  heightPost: [ 1 ],
});

export const emptySectionBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],
  distribution: [0, 80, 120, 200],
  heightPost: [ 0.8 ],
});

export const selectiveClarityBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleSectionRandom ],

  distribution: [0, 80, 120, 200],
  speed: [ 300 ],
  heightPost: [ 1 ],
});

export const overloadBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour ],
  heightPost: [ 1 ],
  heightPostFunction: [ HELPERS.percentageHeightTimesFour ],
});

export const emptyBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.judgementColour ],
  height: [ CONSTANT.brainHeightConstantTiny ],
  heightPost: [ CONSTANT.brainHeightPostConstantTiny ],
});

export const emptyClarityBrain: IHelpers.BrainOptions = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleRandomArrayIndex ],

  heightPostFunction: [ HELPERS.percentageHeightTimesFour ],
  heightPost: [ 0.8 ],
  
  speed: [ 1000 ],
});

export const mentalIllnessBrain: IHelpers.BrainOptions = options(normalBrain, {
  behaviour: [0.3, 0.4, 1],

  height: [ CONSTANT.brainHeightConstant, CONSTANT.brainHeightConstant, 80 ],
  heightFunction: [ HELPERS.singleMultiplyRandomNumberValue, HELPERS.constantNumberValue, HELPERS.singleMultiplyRandomNumberValue ],

  heightPost: [ CONSTANT.brainHeightPostConstantTiny, CONSTANT.brainHeightPostConstantFull, CONSTANT.brainHeightPostConstant ],
  heightPostFunction: [ HELPERS.constantHeight, HELPERS.percentageHeightTimesFour, HELPERS.constantHeight ],
  
  colour: [ CONSTANT.thoughtColour, CONSTANT.standardColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleRandomArrayIndex, HELPERS.percentageHeightTimesFour, HELPERS.multipleSectionRandom ],
                                                  //  HELPERS.percentageHeightTimesFour doesn't technically work in this context.
  colourPost: [ CONSTANT.standardColour, CONSTANT.standardColour, CONSTANT.standardColour ],
  colourPostFunction: [ HELPERS.constantColour, HELPERS.constantColour, HELPERS.constantColour ],
                                                    
  speed: [ 40 ],
  speedFunction: [ HELPERS.sin ],
});

export const multipleConfigurationBrainMentalIllness: IHelpers.BrainOptions = options(mentalIllnessBrain, {
  hasGraph: true,
  hasControlPanel: true,
  multipleBrainConfiguration: 'mental illness',
});

export const multipleConfigurationBrainAdjusted: IHelpers.BrainOptions = options(normalBrain, {
  hasGraph: true,
  hasControlPanel: true,
  multipleBrainConfiguration: 'balance',
});

// self-awarenesss

export const selfAwareness: IHelpers.BrainOptions = options(normalBrain, {
  hasGraph: false,
  hasControlPanel: true,
  
  changeSpeed: 50,
  balanceClarity: 50,
  
  // createDirection: true,

  organiseDirection: 'scrambled',
  singleOutDirection: 'all',
});

export const selfAwarenessGraph: IHelpers.BrainOptions = options(selfAwareness, {
  hasGraph: true,
});
