import * as CONSTANT from '../helpers/constants';
import * as HELPERS from '../helpers/helpers';
import moment from 'moment';

// REDUCER

export const reducer = (store, action) => {
  switch(action.type) {
    case "CALCULATE_HEIGHT":
      return { ...store,
              calculatedHeight: action.array.map(index => 
                store.frequencyFunction(
                  store.frequency,
                  store.heightFunction(
                    store.height,
                    index,
                    store.distributionFunction(store.distribution),
                    store.randomHeightIndex,
                    store.rateOfChange,
                    store.behaviour,
                    store.behaviourFunctionHeight,
                  ),
                  index,
                  store.rateOfChange,
                  store.behaviour,
                  store.behaviourFunctionFrequency,
              ))
            }

    case "CALCULATE_TINT":
      return { ...store,
              calculatedTint: action.array.map(index => 
                store.filterColourFunction(
                  store.filterColour,
                  store.colourFunction(
                    store.colour,
                    index,
                    store.distributionFunction(store.distribution),
                    store.randomColourIndex,
                    store.rateOfChange,
                    store.behaviour,
                    store.behaviourFunctionColour,
                  ),
                  index,
                  store.rateOfChange,
                  store.behaviour,
                  store.behaviourFunctionFrequency,
                ))
            }

    case "CALCULATE_RATE_OF_CHANGE":
      return {
        ...store,
        rateOfChange: action.previousTime.format("SSS") / 1000,
      }

    case "CALCULATE_RANDOM_COLOUR_INDEX":
      return {
        ...store,
        randomColourIndex: Math.floor(Math.random() * store.colour.length),
      }

    case "CALCULATE_RANDOM_HEIGHT_INDEX":
      return {
        ...store,
        randomHeightIndex: Math.floor(Math.random() * store.height.length),
      }


    // CONTROL PANEL COMPONENTS

      // radio
    case "ORGANISE_DIRECTION":
      switch(action.value) {
        case "scrambled":
          return { ...store, colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ], 
                             colourFunction: HELPERS.multipleRandomOrder,
                             organiseDirectionItems: store.organiseDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
                            }
        case "organised":
          return { ...store, colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ], 
                             colourFunction: HELPERS.multipleSections,
                             organiseDirectionItems: store.organiseDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
                            }
        default:
          return;
      }

      
      // radio
    case "SINGLE_OUT_DIRECTION":
      switch(action.value) {
        case "all":
          return { ...store, colour: CONSTANT.standardColour,
                             filterColour: CONSTANT.standardColour,
                             filterColourFunction: HELPERS.singleConstant,
                             colourFunction: HELPERS.multipleSections,                             
                             singleOutDirectionItems: store.singleOutDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
                            }
        case "thought":
          return { ...store, colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.whiteColour ],
                             filterColour: CONSTANT.thoughtColour,
                             filterColourFunction: HELPERS.filterColour,                             
                             colourFunction: HELPERS.multipleSections,
                             singleOutDirectionItems: store.singleOutDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
                            }
        case "opinion":
          return { ...store, colour: [ CONSTANT.whiteColour, CONSTANT.opinionColour, CONSTANT.whiteColour ],
                             filterColour: CONSTANT.opinionColour,
                             filterColourFunction: HELPERS.filterColour,                                                          
                             colourFunction: HELPERS.multipleSections,
                             singleOutDirectionItems: store.singleOutDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
                             }
        case "judgement":
          return { ...store, colour: [ CONSTANT.whiteColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
                             filterColour: CONSTANT.judgementColour,
                             filterColourFunction: HELPERS.filterColour,                                                          
                             colourFunction: HELPERS.multipleSections,
                             singleOutDirectionItems: store.singleOutDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
                             }
        default:
          return;
      }

      // radio
    case "MULTIPLE_BRAIN_CONFIGURATION":
      switch(action.value) {
        case "mental illness":
          return {
            ...store,
            multipleBrainConfigurationItems: store.multipleBrainConfigurationItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
            
            colourFunction: HELPERS.multipleBehaviourMultiple,
            heightFunction: HELPERS.multipleBehaviourSingle,
            frequencyFunction: HELPERS.multipleBehaviourFrequencySingle,
            
            behaviour: [0.3, 0.4, 1],
            height: [ CONSTANT.heightConstant, CONSTANT.heightConstant, 80 ],
            behaviourFunctionHeight: [ HELPERS.singleRandom, HELPERS.singleConstant, HELPERS.singleRandom ],
            
            frequency: [ CONSTANT.frequencyConstantTiny, CONSTANT.frequencyConstantFull, CONSTANT.frequencyConstant ],
            behaviourFunctionFrequency: [ HELPERS.singlePercentageShowFrequency, HELPERS.singleJammingFrequency, HELPERS.singlePercentageShowFrequency ],
            
            colour: [ CONSTANT.thoughtColour, CONSTANT.standardColour, CONSTANT.judgementColour ],
            behaviourFunctionColour: [ HELPERS.multipleRandom, HELPERS.multipleIterativeOrder, HELPERS.multipleSectionRandom ],
          
            speed: 40,
            speedFunction: HELPERS.sin,
          }
        case "balance": 
          return {
            ...store,
            multipleBrainConfigurationItems: store.multipleBrainConfigurationItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } ),
    
            colour: CONSTANT.standardColour, // "0x4cfeb1"
            colourFunction: HELPERS.singleConstant,
          
            height: CONSTANT.heightConstant, // 150
            heightFunction: HELPERS.singleRandom,
    
            frequency: CONSTANT.frequencyConstant, // 0.6
            frequencyFunction: HELPERS.singlePercentageShowFrequency,
    
            speed: CONSTANT.standardSpeed, // 50
            speedFunction: HELPERS.singleConstant,
          }
        default:
          return;
      }
        
      // slider
    case "CHANGE_SPEED":
      return {
        ...store,
        speed: action.value * 10,
      };

      // button
    case "CREATE_DIRECTION":
      switch(action.value) {
        
        case "gratitude":
          return { ...store, colour: CONSTANT.gratitudeColour }
        case "clear":
          return { ...store, colour: CONSTANT.whiteColour }
        default:
          return;
      }

    default:
      return store;
  }
}


// ACTIONS
export const calculateHeight = (array) => ({ type: "CALCULATE_HEIGHT", array });
export const calculateTint = (array) => ({ type: "CALCULATE_TINT", array });
export const calculateRateOfChange = (previousTime) => ({ type: "CALCULATE_RATE_OF_CHANGE", previousTime });
export const calculateRandomColourIndex = () => ({ type: "CALCULATE_RANDOM_COLOUR_INDEX" });
export const calculateRandomHeightIndex = () => ({ type: "CALCULATE_RANDOM_HEIGHT_INDEX" });

export const organiseDirection = (value) => ({ type: "ORGANISE_DIRECTION", value });
export const singleOutDirection = (value) => ({ type: "SINGLE_OUT_DIRECTION", value });
export const multipleBrainConfiguration = (value) => ({ type: "MULTIPLE_BRAIN_CONFIGURATION", value });

export const createDirection = (value) => ({ type: "CREATE_DIRECTION", value });
export const changeSpeed = (value) => ({ type: "CHANGE_SPEED", value });
export const balanceClarity = (value) => ({ type: "BALANCE_CLARITY", value });



// GENERIC OPTIONS

export const options = (options, additionalOptions = {}) => Object.assign({}, normalBrain, additionalOptions)

export const normalBrain = {
  // these first two options are only for desktop, not used for react.
  hasGraph: true,
  hasControlPanel: false,

  // slider
  changeSpeed: false, // 1 to 100
  balanceClarity: false, // 1 to 100

  // button
  createDirection: false, // gratitude, clear
  
  // radio
  organiseDirection: false, // scrambled, organised
  singleOutDirection: false, // all, thought, opinion, judgement
  multipleBrainConfiguration: false, // mental illness, balance

  calculatedHeight: [...Array(200)].fill(CONSTANT.standardColour, 0, 199),
  calculatedTint: [...Array(200)].fill(CONSTANT.heightConstant, 0, 199),
  randomColourIndex: 0,
  randomHeightIndex: 0,
  rateOfChange: moment().format("SSS") / 1000,

  colour: CONSTANT.standardColour, // "0x4cfeb1"
  colourFunction: HELPERS.singleConstant,

  filterColour: CONSTANT.standardColour,
  filterColourFunction: HELPERS.singleConstant,

  height: CONSTANT.heightConstant, // 150
  heightFunction: HELPERS.singleRandom,
  
  frequency: CONSTANT.frequencyConstant, // 0.6
  frequencyFunction: HELPERS.singlePercentageShowFrequency,

  speed: CONSTANT.standardSpeed, // 50
  speedFunction: HELPERS.singleConstant,

  distribution: [0, 66, 132, 200], // even distribution
  distributionFunction: HELPERS.singleConstant,

  behaviour: [0.5, 1], // split timing
  behaviourFunctionColour: [ HELPERS.singleConstant ],
  behaviourFunctionHeight: [ HELPERS.singleConstant ],
  behaviourFunctionFrequency: [ HELPERS.singleConstant ],

  singleOutDirectionItems: [{
    text: "all",
    selected: false,
  },
  {
    text: "thought",
    selected: false,
  },
  {
    text: "opinion",
    selected: false,
  },
  {
    text: "judgement",
    selected: false,            
  }],

  organiseDirectionItems: [{
    text: "scrambled",
    selected: false,
  },
  {
    text: "organised",
    selected: false,
  }],

  multipleBrainConfigurationItems: [{
    text: "balance",
    selected: false,
  },
  {
    text: "mental illness",
    selected: false,
  }],
}


// INITIAL STATE

export const thoughtBrain = options(normalBrain, {
  colour: [ CONSTANT.whiteColour, CONSTANT.thoughtColour, CONSTANT.whiteColour ],
  colourFunction: HELPERS.multipleSections,
});

export const TOJBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleRandomOrder,
});

export const TOJBrainGroup = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSections,
  frequency: 1,
});

export const emptySectionBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSections,
  distribution: [0, 80, 120, 200],
  frequency: 0.8,
});

export const selectiveClarityBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleSectionRandom,
  distribution: [0, 80, 120, 200],
  speed: 300,
  frequency: 1,
});

export const overloadBrain = options(normalBrain, {
  colour: CONSTANT.thoughtColour,
  frequency: 1,
  frequencyFunction: HELPERS.singleJammingFrequency,
});

export const emptyBrain = options(normalBrain, {
  colour: CONSTANT.judgementColour,
  height: CONSTANT.heightConstantTiny,
  frequency: CONSTANT.frequencyConstantTiny,
});

export const emptyClarityBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: HELPERS.multipleRandomOrder,

  frequencyFunction: HELPERS.singleJammingFrequency,
  frequency: 0.8,
  
  speed: 1000,
});

export const mentalIllnessBrain = options(normalBrain, {
  colourFunction: HELPERS.multipleBehaviourMultiple,
  heightFunction: HELPERS.multipleBehaviourSingle,
  frequencyFunction: HELPERS.multipleBehaviourFrequencySingle,
  
  behaviour: [0.3, 0.4, 1],
  height: [ CONSTANT.heightConstant, CONSTANT.heightConstant, 80 ],
  behaviourFunctionHeight: [ HELPERS.singleRandom, HELPERS.singleConstant, HELPERS.singleRandom ],
  
  frequency: [ CONSTANT.frequencyConstantTiny, CONSTANT.frequencyConstantFull, CONSTANT.frequencyConstant ],
  behaviourFunctionFrequency: [ HELPERS.singlePercentageShowFrequency, HELPERS.singleJammingFrequency, HELPERS.singlePercentageShowFrequency ],
  
  colour: [ CONSTANT.thoughtColour, CONSTANT.standardColour, CONSTANT.judgementColour ],
  behaviourFunctionColour: [ HELPERS.multipleRandom, HELPERS.multipleIterativeOrder, HELPERS.multipleSectionRandom ],

  speed: 40,
  speedFunction: HELPERS.sin,
});

export const multipleConfigurationBrainMentalIllness = options(normalBrain, {
  hasGraph: true,
  hasControlPanel: true,

  multipleBrainConfiguration: "mental illness",
});

export const multipleConfigurationBrainAdjusted = options(normalBrain, {
  hasGraph: true,
  hasControlPanel: true,

  multipleBrainConfiguration: "balance",
});


// self-awarenesss

export const selfAwareness = options(normalBrain, {
  hasGraph: false,
  hasControlPanel: true,
  
  changeSpeed: 50,
  balanceClarity: 50,
  
  // createDirection: true,

  organiseDirection: "scrambled",
  singleOutDirection: "all",
});

export const selfAwarenessGraph = options(normalBrain, {
  hasControlPanel: true,
  
  changeSpeed: 50,
  balanceClarity: 50,
  
  // createDirection: true,

  organiseDirection: "scrambled",
  singleOutDirection: "all",
});
