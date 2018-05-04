import * as CONSTANT from './constants';
import moment from 'moment';


// SINGLE FUNCTIONS

// height - constant height
// colour - constant colour
export const singleConstant = (item, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => item;

// height - random height 
// colour - N/A (impossible)
export const singleRandom = (item, _index, _distributionArray, _randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => item * Math.random();

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

export const multipleSectionRandom = (array, index, distributionArray, randomIndex, _rateOfChange, _behaviour, _behaviourFunction) => {
  for (let i = 0; i < array.length; i++) {
    if (distributionArray[i] <= index && index <= distributionArray[i+1] && i === randomIndex) {
      return array[i];
    }
  }
  return CONSTANT.whiteColour;  
}


export const multipleBehaviour = (array, index, distributionArray, _randomIndex, rateOfChange, behaviour, behaviourFunction) => { 
  // behaviour includes timings, function
  for (let j = 0; j < behaviour.length; j++) {
    if (rateOfChange < behaviour[j]) {
      return behaviourFunction[j](array, index, distributionArray, _randomIndex, rateOfChange, _behaviour, _behaviourFunction);
    } 
  }
}


// TRANSFORM FUNCTIONS

// frequency - random frequency based on a constant
export const percentageShowFrequency = (item, height, index, _behaviour, _behaviourFunction) => Math.random() >= item ? 0 : height;

export const jammingFrequency = (item, height, index, _behaviour, _behaviourFunction) => Math.random() >= item ? 0 : height * 4;

export const sin = (speed, change) => speed * Math.sin(change);
export const cos = (speed, change) => speed * Math.cos(change);


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


// GENERIC OPTIONS

export const options = (options, additionalOptions = {}) => Object.assign({}, normalBrainOptions, additionalOptions)

export const normalBrainOptions = {
  hasGraph: true,
  hasControlPanel: false,
  changeSpeed: false,
  identifyThoughts: false,
  changeFocus: false,
  balanceClarity: false,

  colour: CONSTANT.standardColour, // "0x4cfeb1"
  colourFunction: singleConstant,

  height: CONSTANT.heightConstant, // 150
  heightFunction: singleRandom,
  
  frequency: CONSTANT.frequencyConstant, // 0.6
  frequencyFunction: percentageShowFrequency,

  speed: CONSTANT.standardSpeed, // 50
  speedFunction: singleConstant,

  distribution: [0, 66, 132, 200], // even distribution
  distributionFunction: singleConstant,

  behaviour: [0.5, 1], // split timing
  behaviourFunction: singleConstant,
}
