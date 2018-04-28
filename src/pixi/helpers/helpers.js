import * as CONSTANT from './constants';

// COLOUR FUNCTIONS

export const randomTOJColour = (randomConstant = Math.random() * 3) => (
  (randomConstant < 1) 
    ?
      CONSTANT.thoughtColour
    :
      (randomConstant > 1 && randomConstant < 2)
      ?
        CONSTANT.opinionColour
      :
        CONSTANT.judgementColour
)


// HEIGHT FUNCTIONS

export const heightWithClarityConstant = (clarityConstant, heightConstant) => Math.random() >= clarityConstant ? 0 : Math.random() * heightConstant;

export const heightWithJamming = (heightConstant) => (Math.random() * 2) * heightConstant;