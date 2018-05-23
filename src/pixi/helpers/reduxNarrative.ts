
import * as CONSTANT from '../helpers/constants';
import * as HELPERS from '../helpers/helpers';

import { AnyAction } from 'redux';
import { IHelpers } from './types';

// REDUCER
export const reducer = (state = normalNarrative, action: AnyAction ): IHelpers.NarrativeOptions => {
  switch (action.type) {
    // NARRATIVE CONTROL PANEL COMPONENTS

    default:
      return state;
  }
};

// GENERIC OPTIONS

export const options = (normalNarrativeOptions: IHelpers.NarrativeOptions, additionalOptions = {}): IHelpers.NarrativeOptions => ({ ...normalNarrativeOptions, ...additionalOptions });

export const normalNarrative: IHelpers.NarrativeOptions = {

  hasGraph: true,
  hasControlPanel: false,

  colour: [ CONSTANT.standardColour ], // '0x4cfeb1'
  colourFunction: [ HELPERS.constantNumberValue ],

  xPosition: [], 
  xPositionFunction: [],

  yPosition: [],
  yPositionFunction: [],
  
  lineThickness: [],
  lineThicknessFunction: [],

  speed: [ CONSTANT.narrativeStandardSpeed ], // 50
  speedFunction: [ HELPERS.constantSpeed ],

};
