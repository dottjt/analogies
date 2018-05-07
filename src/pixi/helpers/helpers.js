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
  behaviourFunctionColour: [ CONSTANT.singleConstant ],
  behaviourFunctionHeight: [ CONSTANT.singleConstant ],
  behaviourFunctionFrequency: [ CONSTANT.singleConstant ],
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




// ELEMENT HELPERS

// export const slider = (name, text) => {
//   let container = document.createElement('div');
//       container.classList.add(`${name}__slider`);
//       container.classList.add(`slider`);

//   let label = document.createElement('label');
//       label.innerHTML = text;

//   let input = document.createElement('input');
//       input.setAttribute("type", "range");
//       input.setAttribute("min", "1");
//       input.setAttribute("max", "100");
//       input.setAttribute("value", "50");
//       input.classList.add(`${name}__slider__input`);
//       input.classList.add(`slider__input`);

//       container.appendChild(label);
//       container.appendChild(input);

//   return container;
// }

// export const radio = (name, number, valuesArray) => {
//   let container = document.createElement('form');
//       container.classList.add(`${name}__radio`);
//       container.classList.add(`radio`);

//   for(let i = 0; i < number; i++) {
//     let radioContainer = document.createElement('div');
//         radioContainer.classList.add("radio__item");

//     let label = document.createElement('label');
//         label.classList.add(`radio__label`);
//         label.setAttribute("for", valuesArray[i]);
//         label.innerHTML = valuesArray[i];
//         radioContainer.appendChild(label);

//     let input = document.createElement('input');
//         input.classList.add(`${name}__radio__input`);
//         input.setAttribute("type", "radio");
//         input.setAttribute("name", name);
//         input.setAttribute("value", valuesArray[i]);  
//         input.setAttribute("id", valuesArray[i]);  
//         input.classList.add(`radio__input`);

//         radioContainer.appendChild(input);

//         container.appendChild(radioContainer)
//   }
//   return container;
// }

// export const checkbox = (name) => {
//   let container = document.createElement('div');
//       container.classList.add(`checkbox`);

//   let input = document.createElement('input');
//       input.setAttribute("type", "checkbox");
//       input.classList.add(`checkbox__${name}`);
//       input.classList.add(`checkbox__input`);

//       container.appendChild(input);

//   return container;
// }

// export const button = (name, text) => {
//   let container = document.createElement('div');
//       container.classList.add(`button`);

//   let input = document.createElement('button');
//       input.classList.add(`button__${name}`);
//       input.classList.add(`button__input`);
//       input.innerHTML = text;

//       container.appendChild(input);

//   return container;
// }
