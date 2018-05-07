import * as CONSTANT from './constants';
import moment from 'moment';


// SINGLE FUNCTIONS

// height - constant height
// colour - constant colour
export const singleConstant = (item, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => item;

// height - random height 
// colour - N/A (impossible)
export const singleRandom = (item, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => item * Math.random();

export const multipleConstant = (item, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => item[0];

export const multipleRandom = (item, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => item[item.length * Math.floor(Math.random())];

// height - predictable step of heights
// colour - predictable step of colours
export const multipleIterativeOrder = (array, index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => array[index % array.length === 0];

// colour - randomly iterate between fixed colours
// height - randomly iterate between fixed heights.
export const multipleRandomOrder = (array, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => array[Math.floor(Math.random() * array.length)];

// colour - predictable even width colour sections
// height - predictable even height colour sections
export const multipleSections = (array, index, distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => {
  for (let i = 0; i < array.length; i++) {
    if (distributionArray[i] <= index && index <= distributionArray[i+1]) {
      return array[i];
    }
  }
}

// this, I don't believe works?
export const multipleSectionRandom = (array, index, distributionArray, randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => {
  for (let i = 0; i < array.length; i++) {
    if (distributionArray[i] <= index && index <= distributionArray[i+1] && i === randomIndex) {
      return array[i];
    }
  }
  return CONSTANT.whiteColour;  
}

export const multipleBehaviourSingle = (array, index, distributionArray, _randomIndex, rateOfChange, behaviour, behaviourFunction) => { 
  // behaviour includes timings, function
  for (let j = 0; j < behaviour.length; j++) {
    if (rateOfChange < behaviour[j]) {
      return behaviourFunction[j](array[j], index, distributionArray, _randomIndex, rateOfChange, behaviour, behaviourFunction);
    } 
  }
}

export const multipleBehaviourMultiple = (array, index, distributionArray, _randomIndex, rateOfChange, behaviour, behaviourFunction) => { 
  // behaviour includes timings, function
  for (let j = 0; j < behaviour.length; j++) {
    if (rateOfChange < behaviour[j]) {
      return behaviourFunction[j](array, index, distributionArray, _randomIndex, rateOfChange, behaviour, behaviourFunction);
    } 
  }
}



// TRANSFORM FUNCTIONS

// frequency - random frequency based on a constant
export const singlePercentageShowFrequency = (item, height, index, rateOfChange, _behaviour, _behaviourFunction) => Math.random() >= item ? 0 : height;

export const singleJammingFrequency = (item, height, index, rateOfChange, _behaviour, _behaviourFunction) => Math.random() >= item ? 0 : height * 4;

export const sin = (speed, change) => speed * Math.sin(change);
export const cos = (speed, change) => speed * Math.cos(change);


export const multipleBehaviourFrequencySingle = (array, height, index, rateOfChange, behaviour, behaviourFunction) => { 
  // behaviour includes timings, function
  for (let j = 0; j < behaviour.length; j++) {
    if (rateOfChange < behaviour[j]) {
      return behaviourFunction[j](array[j], height, index, rateOfChange, behaviour, behaviourFunction);
    } 
  }
}

export const multipleBehaviourFrequencyMultiple = (array, height, index, rateOfChange, behaviour, behaviourFunction) => { 
  // behaviour includes timings, function
  for (let j = 0; j < behaviour.length; j++) {
    if (rateOfChange < behaviour[j]) {
      return behaviourFunction[j](array, height, index, rateOfChange, behaviour, behaviourFunction);
    } 
  }
}

// FILTER FUNCTIONS 

// export const noFilter = (filter, colour) => colour;

// export const filterInclude = (filter, colour) => {
//   for (let i = 0; i < filter.length; i++) {
//     if (filter[i] === colour[i] {
      
//     })
//   }
// };


// DISTRIBUTION FUNCTIONS

// this doesn't work, but needs to be addressed :)
export const randomDistributionArray = (numberOfElements) => {
  let distributionArray = [];

  for (let i = 0; i < numberOfElements; i++) {
    distributionArray.push(Math.random());
  }

  let totalConstant = distributionArray.reduce((acc, item) => acc + item, 0);
  
  for (let i = 0; i < numberOfElements; i++) {
    distributionArray[i] = Math.floor(CONSTANT.elementTotal * (distributionArray[i] / totalConstant));
  };
  
  let lastIndex = distributionArray.length-1
  distributionArray[lastIndex] = 200;
  distributionArray.unshift(0);
  
  return distributionArray;
}



export const reducer = (state, action) => {
  switch(action.type) {
    case "ORGANISE_DIRECTION":
        action.value === "scrambled" 
      ?
        { ...state, colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ], 
                    colourFunction: singleRandom }
      : 
        { ...state, colour: CONSTANT.standardColour, 
                    colourFunction: multipleSections }        

    case "SINGLE_OUT_DIRECTION":
      switch(action.value) {
        case "all":
          return { ...state, colour: CONSTANT.standardColour,
                             colourFunction: singleRandom }
          break;
        case "thought":
          return { ...state, colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.whiteColour ],
                             colourFunction: multipleSections }
          break;
        case "opinion":
          return { ...state, colour: [ CONSTANT.whiteColour, CONSTANT.opinionColour, CONSTANT.whiteColour ],
                             colourFunction: multipleSections }
          break;
        case "judgement":
          return { ...state, colour: [ CONSTANT.whiteColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
                             colourFunction: multipleSections }
          break;
        default:
          null;
          break;
      }

    case "CHANGE_SPEED":
      return {
        ...state,
        speed: action.value * 10,
      };

    case "CREATE_DIRECTION":
      switch(action.value) {
        case "gratitude":
          return { ...state, colour: CONSTANT.gratitudeColour }
          break;
        case "clear":
          return { ...state, colour: CONSTANT.whiteColour }
          break;
        default:
          null;
          break;
      }

      case "SELECT_RADIO_BUTTON_ORGANISE":
        return {
          ...state,
          organiseDirectionItems: state.organiseDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
        }
      
      case "SELECT_RADIO_BUTTON_SINGLE_OUT":
        return {
          ...state,
          singleOutDirectionItems: state.singleOutDirectionItems.map(item => item.text === action.value ? { ...item, selected: true } : { ...item, selected: false } )
        }

    default:
      return state;
  }
}


// ACTIONS
export const organiseDirection = (value) => ({ type: "ORGANISE_DIRECTION", value });
export const createDirection = (value) => ({ type: "CREATE_DIRECTION", value });
export const changeSpeed = (value) => ({ type: "CHANGE_SPEED", value });
export const balanceClarity = (value) => ({ type: "BALANCE_CLARITY", value });
export const singleOutDirection = (value) => ({ type: "SINGLE_OUT_DIRECTION", value });

export const selectRadioButtonOrganise = (value) => ({ type: "SELECT_RADIO_BUTTON_ORGANISE", value });
export const selectRadioButtonSingleOut = (value) => ({ type: "SELECT_RADIO_BUTTON_SINGLE_OUT", value });



// GENERIC OPTIONS

export const options = (options, additionalOptions = {}) => Object.assign({}, normalBrain, additionalOptions)

export const normalBrain = {
  hasGraph: true,
  hasControlPanel: false,
  
  changeSpeed: false,
  organiseDirection: false,
  createDirection: false,
  singleOutDirection: false,
  balanceClarity: false,

  colour: CONSTANT.standardColour, // "0x4cfeb1"
  colourFunction: singleConstant,

  // filter: [],
  // filterFunction: noFilter, 

  height: CONSTANT.heightConstant, // 150
  heightFunction: singleRandom,
  
  frequency: CONSTANT.frequencyConstant, // 0.6
  frequencyFunction: singlePercentageShowFrequency,

  speed: CONSTANT.standardSpeed, // 50
  speedFunction: singleConstant,

  distribution: [0, 66, 132, 200], // even distribution
  distributionFunction: singleConstant,

  behaviour: [0.5, 1], // split timing
  behaviourFunctionColour: [ singleConstant ],
  behaviourFunctionHeight: [ singleConstant ],
  behaviourFunctionFrequency: [ singleConstant ],

  singleOutDirectionItems: [{
    text: "all",
    selected: true,
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
    selected: true,
  },
  {
    text: "organised",
    selected: false,
  }],

}

export const TOJBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: multipleRandomOrder,
});

export const TOJBrainGroup = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: multipleSections,
  frequency: 1,
});

export const emptySectionBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.judgementColour ],
  colourFunction: multipleSections,
  distribution: [0, 80, 120, 200],
  frequency: 0.8,
});

export const selectiveClarityBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: multipleSectionRandom,
  distribution: [0, 80, 120, 200],
  frequency: 1,
});

export const overloadBrain = options(normalBrain, {
  colour: CONSTANT.thoughtColour,
  frequency: 1,
  frequencyFunction: singleJammingFrequency,
});

export const emptyBrain = options(normalBrain, {
  colour: CONSTANT.judgementColour,
  height: CONSTANT.heightConstantTiny,
  frequency: CONSTANT.frequencyConstantTiny,
});

export const emptyClarityBrain = options(normalBrain, {
  colour: [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ],
  colourFunction: multipleRandomOrder,

  frequencyFunction: singleJammingFrequency,
  frequency: 0.8,
  
  speed: 1000,
});

export const mentalIllnessBrain = options(normalBrain, {
  colourFunction: multipleBehaviourMultiple,
  heightFunction: multipleBehaviourSingle,
  frequencyFunction: multipleBehaviourFrequencySingle,
  
  behaviour: [0.3, 0.4, 1],
  height: [ CONSTANT.heightConstant, CONSTANT.heightConstant, 80 ],
  behaviourFunctionHeight: [ singleRandom, singleConstant, singleRandom ],
  
  frequency: [ CONSTANT.frequencyConstantTiny, CONSTANT.frequencyConstantFull, CONSTANT.frequencyConstant ],
  behaviourFunctionFrequency: [ singlePercentageShowFrequency, singleJammingFrequency, singlePercentageShowFrequency ],
  
  colour: [ CONSTANT.thoughtColour, CONSTANT.standardColour, CONSTANT.judgementColour ],
  behaviourFunctionColour: [ multipleRandom, multipleIterativeOrder, multipleSectionRandom ],

  speed: 40,
  speedFunction: sin,
});
