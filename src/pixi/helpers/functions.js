import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';

import moment from 'moment';

// CREATE NEW GRAPH

export default class BrainGraph {

  constructor(name, timeFormat, graphObject) {
    this.name = name;
    this.timeFormat = timeFormat;
    this.graphObject = graphObject;
    
    this.app = new PIXI.Application(600, 160, { antialias: true, backgroundColor: 0xffffff });

    this.container = new PIXI.Container();
    this.container.x = 0;
    this.container.y = this.app.screen.height;
    this.app.stage.addChild(this.container);

    for (let i = 0; i < CONSTANT.numberOfElements; i++) {
      var bar = new PIXI.Sprite(PIXI.Texture.WHITE);
          bar.position.x = i * CONSTANT.positionConstant;
          bar.tint = CONSTANT.whiteBarColour;
          bar.width = CONSTANT.widthConstant;
          bar.height = CONSTANT.heightConstant;
          bar.anchor.set(1);
      this.container.addChild(bar);
    }

    this.previousTime = moment().format(this.timeFormat); 

    document.querySelector(`#${name}`).appendChild(this.app.view);
  }

  brainActivity() {
    if (this.previousTime < moment().format(this.timeFormat)) {
      for (let i = 0; i < CONSTANT.numberOfElements; i++) {
        this.container.children[i].height = this.graphObject.height();
        this.container.children[i].tint = this.graphObject.colour();
      }
    }
    this.previousTime = moment().format(this.timeFormat);
  }

  // comparison, height
  brainActivityInterval() {
    if (this.previousTime < moment().format(this.timeFormat)) {
      if(this.graphObject.comparison()) {
        for (let i = 0; i < CONSTANT.numberOfElements; i++) {
          this.container.children[i].height = this.graphObject.heightCondition();
          this.container.children[i].tint = this.graphObject.colour();
        }  
      } else {
        for (let i = 0; i < CONSTANT.numberOfElements; i++) {
          this.container.children[i].height = this.graphObject.height();
          this.container.children[i].tint = this.graphObject.colour();
        }  
      }
    }
    this.previousTime = moment().format(this.timeFormat);
  }

  // timeFormat, ratio,
  // ratioType: randomMulti, randomSingle, nonRandom
  brainActivitySections() {
    if (this.previousTime < moment().format(this.timeFormat)) {

      let { sectionOneTotal, sectionTwoTotal, } = colourRatio(this.graphObject.ratio(), this.graphObject.ratioType());
      
      if (this.graphObject.clearGraphAfterEachFrame()) {
        for (let i = 0; i < 200; i++) {
          this.container.children[i].height = 0;
          this.container.children[i].tint = CONSTANT.whiteBarColour;
        }
      }

      if (this.graphObject.ratioType() === "randomMulti") {
        let randomNumber = Math.random();

        if (randomNumber < 0.33) {
          for (let i = 0; i < sectionOneTotal; i++) {
            this.container.children[i].height = this.graphObject.sectionArray[0].height();        
            this.container.children[i].tint = this.graphObject.sectionArray[0].colour();
          }  
        }
          
        if (randomNumber > 0.33 && randomNumber < 0.66) {
          for (let i = sectionOneTotal; i < sectionTwoTotal; i++) {
            this.container.children[i].height = this.graphObject.sectionArray[1].height();        
            this.container.children[i].tint = this.graphObject.sectionArray[1].colour();
          }  
        }  

        if (randomNumber > 0.66) {
          for (let i = sectionTwoTotal; i < 200; i++) {
            this.container.children[i].height = this.graphObject.sectionArray[2].height();        
            this.container.children[i].tint = this.graphObject.sectionArray[2].colour();
          }  
        }
      }

      if (this.graphObject.ratioType() !== "randomMulti") {
        for (let i = 0; i < sectionOneTotal; i++) {
          this.container.children[i].height = this.graphObject.sectionArray[0].height();        
          this.container.children[i].tint = this.graphObject.sectionArray[0].colour();
        }
        for (let i = sectionOneTotal; i < sectionTwoTotal; i++) {
          this.container.children[i].height = this.graphObject.sectionArray[1].height();        
          this.container.children[i].tint = this.graphObject.sectionArray[1].colour();
        }
        for (let i = sectionTwoTotal; i < 200; i++) {
          this.container.children[i].height = this.graphObject.sectionArray[2].height();        
          this.container.children[i].tint = this.graphObject.sectionArray[2].colour();
        }  
      }
      
    }
    this.previousTime = moment().format(this.timeFormat);
  }
}


// FUNCTION HELPERS

export const colourRatio = ([sectionOneRatio, sectionTwoRatio, sectionThreeRatio], ratioType) => {
  if (ratioType === "randomSingle" || ratioType === "randomMulti") {
    var sectionOneConstant = Math.random() * sectionOneRatio;
    var sectionTwoConstant = Math.random() * sectionTwoRatio;
    var sectionThreeConstant = Math.random() * sectionThreeRatio;
  }

  if (ratioType === "nonRandom") {
    var sectionOneConstant = sectionOneRatio;
    var sectionTwoConstant = sectionTwoRatio;
    var sectionThreeConstant = sectionThreeRatio;
  }

  let totalConstant = sectionOneConstant + sectionTwoConstant + sectionThreeConstant;
  
  let sectionOneTotal = Math.floor(CONSTANT.numberOfElements * (sectionOneConstant / totalConstant));
  let sectionTwoTotal = Math.floor(CONSTANT.numberOfElements * (sectionTwoConstant / totalConstant)) + Math.floor(CONSTANT.numberOfElements * (sectionOneConstant / totalConstant));
  return {
    sectionOneTotal,
    sectionTwoTotal,
  }  

}

