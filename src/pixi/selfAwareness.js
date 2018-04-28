import * as PIXI from 'pixi.js';
import moment from 'moment';
import { newSetup, 
         brainActivity,
         brainFullDirectionActivity,
         brainTOJGroupActivity,
         brainEmptyClarityActivity,
         brainSelectiveClarityActivity,
         brainSelectiveClaritySlowerActivity,
         brainMentalIllness } from './helpers/functions';
import { timeFormat, timeFormatSecond } from './helpers/constants';

let normalBrain = newSetup();
let TOJBrain = newSetup();
let emptyBrain = newSetup();
let emptyBrainTwo = newSetup();
let TOJBrainGroup = newSetup();
let emptyClarityBrain = newSetup();
let normalEfficientBrain = newSetup();
let mentalIllnessBrain = newSetup();
let fullDirectionBrain = newSetup();
let fullDirectionBrainTwo = newSetup();
let selectiveClarityBrain = newSetup();
let selectiveClaritySlowerBrain = newSetup();


document.querySelector('#normalBrain').appendChild(normalBrain.app.view);
// document.querySelector('#TOJBrain').appendChild(TOJBrain.app.view);
// document.querySelector('#emptyBrain').appendChild(emptyBrain.app.view);
// document.querySelector('#emptyBrainTwo').appendChild(emptyBrainTwo.app.view);
// document.querySelector('#TOJBrainGroup').appendChild(TOJBrainGroup.app.view);
// document.querySelector('#emptyClarityBrain').appendChild(emptyClarityBrain.app.view);
// document.querySelector('#fullDirectionBrain').appendChild(fullDirectionBrain.app.view);
// document.querySelector('#fullDirectionBrainTwo').appendChild(fullDirectionBrainTwo.app.view);
// document.querySelector('#normalEfficientBrain').appendChild(normalEfficientBrain.app.view);
document.querySelector('#mentalIllnessBrain').appendChild(mentalIllnessBrain.app.view);
// document.querySelector('#selectiveClarityBrain').appendChild(selectiveClarityBrain.app.view);
document.querySelector('#selectiveClaritySlowerBrain').appendChild(selectiveClaritySlowerBrain.app.view);



let previousTime1 = moment().format(timeFormat);
let previousTime2 = moment().format(timeFormat);
let previousTime3 = moment().format(timeFormat);
let previousTime4 = moment().format(timeFormat);
let previousTime5 = moment().format(timeFormatSecond);
let previousTime6 = moment().format(timeFormat);
let previousTime7 = moment().format(timeFormat);
let previousTime8 = moment().format(timeFormat);
let previousTime9 = moment().format(timeFormat);
let previousTime10 = moment().format(timeFormatSecond);
let previousTime11 = moment().format(timeFormatSecond);
let previousTime12 = moment().format(timeFormatSecond);

normalBrain.app.ticker.add(function(delta) {
  previousTime1 = brainNormalActivity(previousTime1, normalBrain.container); 
});

// TOJBrain.app.ticker.add(function(delta) {
//   previousTime2 = brainTOJActivity(previousTime2, TOJBrain.container);   
// })

// emptyBrain.app.ticker.add(function(delta) {
//   previousTime3 = brainEmptyActivity(previousTime3, emptyBrain.container);   
// })

// TOJBrainGroup.app.ticker.add(function(delta) {
//   previousTime4 = brainTOJGroupActivity(previousTime4, TOJBrainGroup.container);   
// })

// emptyClarityBrain.app.ticker.add(function(delta) {
//   previousTime5 = brainEmptyClarityActivity(previousTime5, emptyClarityBrain.container);   
// })

// normalEfficientBrain.app.ticker.add(function(delta) {
//   previousTime6 = brainNormalActivity(previousTime6, normalEfficientBrain.container); 
// });

mentalIllnessBrain.app.ticker.add(function(delta) {
  previousTime7 = brainMentalIllness(previousTime7, mentalIllnessBrain.container);   
})

// fullDirectionBrain.app.ticker.add(function(delta) {
//   previousTime8 = brainFullDirectionActivity(previousTime8, fullDirectionBrain.container);   
// })

// emptyBrainTwo.app.ticker.add(function(delta) {
//   previousTime9 = brainEmptyActivity(previousTime9, emptyBrainTwo.container);   
// })

// selectiveClarityBrain.app.ticker.add(function(delta) {
//   previousTime10 = brainSelectiveClarityActivity(previousTime10, selectiveClarityBrain.container);   
// })

selectiveClaritySlowerBrain.app.ticker.add(function(delta) {
  previousTime11 = brainSelectiveClaritySlowerActivity(previousTime11, selectiveClaritySlowerBrain.container);   
})

// fullDirectionBrainTwo.app.ticker.add(function(delta) {
//   previousTime12 = brainFullDirectionActivity(previousTime12, fullDirectionBrainTwo.container);   
// })





