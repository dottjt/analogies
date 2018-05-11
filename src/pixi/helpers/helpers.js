import * as CONSTANT from './constants';

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

export const filterColour = (filterColour, colour) => {
  if (Array.isArray(colour)) {
    for (let i = 0; i < colour.length; i++) {
      if (filterColour === colour[i]) {
        return colour[i];
      } else {
        return CONSTANT.whiteColour;
      }
    }
  }
  if (filterColour === colour) {
    return colour;
  } else {
    return CONSTANT.whiteColour;
  }
};


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


