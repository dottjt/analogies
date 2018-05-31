
import * as CONSTANT from '../helpers/constants';
import * as HELPERS from '../helpers/helpersNarrative';

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

  xPosition: [ CONSTANT.narrativeStandardXPositionIncrease ],
  xPositionFunction: [ HELPERS.incrementPosition ],

  yPosition: [ CONSTANT.narrativeStandardYPositionIncrease ],
  yPositionFunction: [ HELPERS.incrementPosition ],
  
  lineThickness: [ CONSTANT.narrativeStandardLineThickness ],
  lineThicknessFunction: [ HELPERS.constantNumberValue ],

  speed: [ CONSTANT.narrativeStandardSpeed ], // 50
  speedFunction: [ HELPERS.constantSpeed ],

  distribution: [ 0, 66, 132, 200 ], // even distribution
  distributionFunction: [ HELPERS.constantDistribution ],

  behaviour: [1],
};
