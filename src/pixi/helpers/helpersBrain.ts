import * as CONSTANT from './constants';

// RULES 
// heightFunction/colourFunction should return a single value.
// heightPostFunction/colourPostFunction take a single value

// SINGLE FUNCTIONS

// height / colour
export const constantNumberValue = (valueArray: number[], _index: number, _distribution: number[], _randomIndex: number, _rateOfChange: number): number => valueArray[0];

// height
export const singleMultiplyRandomNumberValue = (valueArray: number[], _index: number, _distribution: number[], _randomIndex: number, _rateOfChange: number): number => valueArray[0] * Math.random();

// height / colour
export const multipleRandomArrayIndex = (valueArray: number[], _index: number, _distribution: number[], _randomIndex: number, _rateOfChange: number): number => valueArray[Math.floor(Math.random() * valueArray.length)];

// height / colour - predictable even width colour sections
export const multipleEvenDistributionSections = (valueArray: number[], index: number, distribution: number[], _randomIndex: number, _rateOfChange: number): number => {
  for (let i = 0; i < valueArray.length; i++) {
    if (distribution[i] <= index && index <= distribution[i + 1]) {
      return valueArray[i];
    }
  }
  return 0;
};

// NOTE: DOES NOT WORK, IS NOT TRULY RANDOM. 
export const multipleSectionRandom = (valueArray: number[], index: number, distribution: number[], randomIndex: number, _rateOfChange: number): number => {
  for (let i = 0; i < valueArray.length; i++) {
    if (distribution[i] <= index && index <= distribution[i + 1] && i === randomIndex) {
      return valueArray[i];
    }
  }
  return CONSTANT.whiteColour;  
};


// HEIGHT POST FUNCTIONS

export const constantHeight = (percentageArray: number[], height: number, index: number, rateOfChange: number): number => height;

export const percentageHeight = (percentageArray: number[], height: number, index: number, rateOfChange: number): number => Math.random() >= percentageArray[0] ? 0 : height;

export const percentageHeightTimesFour = (percentageArray: number[], height: number, index: number, rateOfChange: number): number => Math.random() >= percentageArray[0] ? 0 : height * 4;


// COLOUR POST FUNCTIONS 

export const constantColour = (filterArray: number[], colour: number, index: number, rateOfChange: number): number => colour;

export const filterColour = (filterArray: number[], colour: number, index: number, rateOfChange: number): number => {
  for(let filterColour of filterArray) {
    if (filterColour === colour) {
      return colour;
    } 
  }
  return CONSTANT.whiteColour;  
};


// SPEED FUNCTIONS 

export const constantSpeed = (speed: number[], change: number): number => speed[0];
export const sin = (speed: number[], change: number): number => speed[0] * Math.sin(change);
export const cos = (speed: number[], change: number): number => speed[0] * Math.cos(change);


// DISTRIBUTION FUNCTIONS

export const constantDistribution = (distribution: number[]): number[] => distribution;

// this doesn't work, but needs to be addressed :)
// export const randomDistributionArray = (numberOfElements) => {
//   let distribution = [];

//   for (let i = 0; i < numberOfElements; i++) {
//     distribution.push(Math.random());
//   }

//   let totalConstant = distribution.reduce((acc, item) => acc + item, 0);
  
//   for (let i = 0; i < numberOfElements; i++) {
//     distribution[i] = Math.floor(CONSTANT.brainElementTotal * (distribution[i] / totalConstant));
//   };
  
//   let lastIndex = distribution.length-1
//   distribution[lastIndex] = 200;
//   distribution.unshift(0);
  
//   return distribution;
// }
