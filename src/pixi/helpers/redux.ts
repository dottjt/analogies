
import * as CONSTANT from '../helpers/constants';
import * as HELPERS from '../helpers/helpers';

import { Moment } from 'moment';
import { ActionCreator, AnyAction } from 'redux';
import { IHelpers, ReduxActions } from './types';

// REDUCER
export const reducer = (state = normalBrain, action: AnyAction ): IHelpers.Options => {
  switch (action.type) {
    // CONTROL PANEL COMPONENTS

      // radio
    case 'ORGANISE_DIRECTION':
      switch (action.value) {
        case 'scrambled':
          return { 
            ...state, 
            colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ], 
            colourFunction: [ HELPERS.multipleRandomArrayIndex ],
            organiseDirectionItems: state.organiseDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'organised':
          return { 
            ...state, 
            colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ], 
            colourFunction: [ HELPERS.multipleEvenDistributionSections ],
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
            colour: [ CONSTANT.standardColour ],
            colourFunction: [ HELPERS.multipleEvenDistributionSections ],
            colourPost: [ CONSTANT.standardColour ],
            colourPostFunction: [ HELPERS.constantColour ],
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'thought':
          return { 
            ...state, 
            colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.whiteColour ],
            colourFunction: [ HELPERS.multipleEvenDistributionSections ],
            colourPost: [ CONSTANT.thoughtColour ],
            colourPostFunction: [ HELPERS.filterColour ],
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'opinion':
          return { 
            ...state, 
            colour: [ CONSTANT.whiteColour, CONSTANT.opinionColour, CONSTANT.whiteColour ],
            colourFunction: [ HELPERS.multipleEvenDistributionSections ],
            colourPost: [ CONSTANT.opinionColour ],
            colourPostFunction: [ HELPERS.filterColour ],                             
            singleOutDirectionItems: state.singleOutDirectionItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
          };
        case 'judgement':
          return { 
            ...state, 
            colour: [ CONSTANT.whiteColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
            colourFunction: [ HELPERS.multipleEvenDistributionSections ],
            colourPost: [ CONSTANT.judgementColour ],
            colourPostFunction: [ HELPERS.filterColour ],                             
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
            multipleBrainConfigurationItems: state.multipleBrainConfigurationItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),

            behaviour: [0.3, 0.4, 1],

            height: [ CONSTANT.heightConstant, CONSTANT.heightConstant, 80 ],
            heightFunction: [ HELPERS.singleMultiplyRandomNumberValue, HELPERS.constantNumberValue, HELPERS.singleMultiplyRandomNumberValue ],
            
            heightPost: [ CONSTANT.heightPostConstantTiny, CONSTANT.heightPostConstantFull, CONSTANT.heightPostConstant ],
            heightPostFunction: [ HELPERS.constantHeight, HELPERS.percentageHeightTimesFour, HELPERS.constantHeight ],
            
            colour: [ CONSTANT.thoughtColour, 0x000000, CONSTANT.judgementColour ],
            colourFunction: [ HELPERS.multipleRandomArrayIndex, HELPERS.multipleSectionRandom, HELPERS.multipleSectionRandom ],

            speed: [ 40 ],
            speedFunction: [ HELPERS.sin ],
          };
        case 'balance': 
          return {
            ...state,
            multipleBrainConfigurationItems: state.multipleBrainConfigurationItems.map((item: IHelpers.RadioItem) => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
    
            colour: [ CONSTANT.standardColour ], // '0x4cfeb1'
            colourFunction: [ HELPERS.constantNumberValue ],
          
            height: [ CONSTANT.heightConstant ], // 150
            heightFunction: [ HELPERS.singleMultiplyRandomNumberValue ],
    
            heightPost: [ CONSTANT.heightPostConstant ], // 0.6
            heightPostFunction: [ HELPERS.constantHeight ],
    
            speed: [ CONSTANT.standardSpeed ], // 50
            speedFunction: [ HELPERS.constantSpeed ],
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

// ACTIONS
export const calculateHeight: ActionCreator<ReduxActions.NumberArrayAction> = (array: number[]) => ({ type: 'CALCULATE_HEIGHT', array });
export const calculateTint: ActionCreator<ReduxActions.StringArrayAction> = (array: string[]) => ({ type: 'CALCULATE_TINT', array });

export const calculateRateOfChange = (previousTime: Moment) => ({ type: 'CALCULATE_RATE_OF_CHANGE', previousTime });
export const calculateRandomColourIndex: ActionCreator<ReduxActions.TypeAction> = () => ({ type: 'CALCULATE_RANDOM_COLOUR_INDEX' });
export const calculateRandomHeightIndex: ActionCreator<ReduxActions.TypeAction> = () => ({ type: 'CALCULATE_RANDOM_HEIGHT_INDEX' });

export const organiseDirection: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'ORGANISE_DIRECTION', value });
export const singleOutDirection: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'SINGLE_OUT_DIRECTION', value });
export const multipleBrainConfiguration: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'MULTIPLE_BRAIN_CONFIGURATION', value });

export const createDirection: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'CREATE_DIRECTION', value });

export const changeSpeed: ActionCreator<ReduxActions.NumberValueAction> = (value: number) => ({ type: 'CHANGE_SPEED', value });
export const balanceClarity: ActionCreator<ReduxActions.NumberValueAction> = (value: number) => ({ type: 'BALANCE_CLARITY', value });

// GENERIC OPTIONS

export const options = (normalBrainOptions: IHelpers.Options, additionalOptions = {}): IHelpers.Options => Object.assign({}, normalBrainOptions, additionalOptions);

export const normalBrain: IHelpers.Options = {
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
  // calculatedTint: [...Array(200)].fill(CONSTANT.heightConstant, 0, 199),
  // randomColourIndex: 0,
  // randomHeightIndex: 0,
  // rateOfChange: +moment().format('SSS') / 1000,

  colour: [ CONSTANT.standardColour ], // '0x4cfeb1'
  colourFunction: [ HELPERS.constantNumberValue ],

  colourPost: [ CONSTANT.standardColour ],
  colourPostFunction: [ HELPERS.constantColour ],

  height: [ CONSTANT.heightConstant ], // 150
  heightFunction: [ HELPERS.singleMultiplyRandomNumberValue ],

  heightPost: [ CONSTANT.heightPostConstant ], // 0.6
  heightPostFunction: [ HELPERS.percentageHeight ],

  speed: [ CONSTANT.standardSpeed ], // 50
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

export const thoughtBrain = options(normalBrain, {
  colour: [ CONSTANT.whiteColour, CONSTANT.thoughtColour, CONSTANT.whiteColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],

  heightPost: [ 1 ],
  distribution: [ 0, 90, 110, 200 ], // even distribution
});

export const TOJBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleRandomArrayIndex ],
});

export const TOJBrainGroup = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],
  heightPost: [ 1 ],
});

export const emptySectionBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleEvenDistributionSections ],
  distribution: [0, 80, 120, 200],
  heightPost: [ 0.8 ],
});

export const selectiveClarityBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleSectionRandom ],

  distribution: [0, 80, 120, 200],
  speed: [ 300 ],
  heightPost: [ 1 ],
});

export const overloadBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour ],
  heightPost: [ 1 ],
  heightPostFunction: [ HELPERS.percentageHeightTimesFour ],
});

export const emptyBrain = options(normalBrain, {
  colour: [ CONSTANT.judgementColour ],
  height: [ CONSTANT.heightConstantTiny ],
  heightPost: [ CONSTANT.heightPostConstantTiny ],
});

export const emptyClarityBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleRandomArrayIndex ],

  heightPostFunction: [ HELPERS.percentageHeightTimesFour ],
  heightPost: [ 0.8 ],
  
  speed: [ 1000 ],
});

export const mentalIllnessBrain = options(normalBrain, {
  behaviour: [0.3, 0.4, 1],

  height: [ CONSTANT.heightConstant, CONSTANT.heightConstant, 80 ],
  heightFunction: [ HELPERS.singleMultiplyRandomNumberValue, HELPERS.constantNumberValue, HELPERS.singleMultiplyRandomNumberValue ],

  heightPost: [ CONSTANT.heightPostConstantTiny, CONSTANT.heightPostConstantFull, CONSTANT.heightPostConstant ],
  heightPostFunction: [ HELPERS.constantHeight, HELPERS.percentageHeightTimesFour, HELPERS.constantHeight ],
  
  colour: [ CONSTANT.thoughtColour, CONSTANT.standardColour, CONSTANT.judgementColour ],
  colourFunction: [ HELPERS.multipleRandomArrayIndex, HELPERS.percentageHeightTimesFour, HELPERS.multipleSectionRandom ],
                                                  //  HELPERS.percentageHeightTimesFour doesn't technically work in this context.
  colourPost: [ CONSTANT.standardColour, CONSTANT.standardColour, CONSTANT.standardColour ],
  colourPostFunction: [ HELPERS.constantColour, HELPERS.constantColour, HELPERS.constantColour ],
                                                    
  speed: [ 40 ],
  speedFunction: [ HELPERS.sin ],
});

export const multipleConfigurationBrainMentalIllness = options(mentalIllnessBrain, {
  hasGraph: true,
  hasControlPanel: true,
  multipleBrainConfiguration: 'mental illness',
});

export const multipleConfigurationBrainAdjusted = options(normalBrain, {
  hasGraph: true,
  hasControlPanel: true,
  multipleBrainConfiguration: 'balance',
});

// self-awarenesss

export const selfAwareness = options(normalBrain, {
  hasGraph: false,
  hasControlPanel: true,
  
  changeSpeed: 50,
  balanceClarity: 50,
  
  // createDirection: true,

  organiseDirection: 'scrambled',
  singleOutDirection: 'all',
});

export const selfAwarenessGraph = options(normalBrain, {
  hasControlPanel: true,

  changeSpeed: 50,
  balanceClarity: 50,  
  // createDirection: true,
  organiseDirection: 'scrambled',
  singleOutDirection: 'all',
});
