import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';
import moment from 'moment';


export default class BrainGraph {
  constructor(name, options) {

    // GRAPH CONFIG 
    this.name = name;
    this.graphAttributes = options;
    this.previousTime = moment().format("x");
    this.previousTimeComparison = moment();
    this.domElement = document.querySelector(`#${this.name}`);

    // GRAPH ATTRIBUTES CONFIG 
    this.colour = this.graphAttributes.colour;
    this.colourFunction = this.graphAttributes.colourFunction;
    this.height = this.graphAttributes.height;
    this.heightFunction = this.graphAttributes.heightFunction;
    this.frequency = this.graphAttributes.frequency;
    this.frequencyFunction = this.graphAttributes.frequencyFunction;
    this.speed = this.graphAttributes.speed;
    this.speedFunction = this.graphAttributes.speedFunction;
    this.distribution = this.graphAttributes.distribution;
    this.distributionFunction = this.graphAttributes.distributionFunction;
    this.behaviour = this.graphAttributes.behaviour;
    this.behaviourFunction = this.graphAttributes.behaviourFunction;

    // CREATE GRAPH
    this.app = new PIXI.Application(600, 160, { antialias: true, backgroundColor: 0xffffff });          

    if (this.graphAttributes.hasGraph) {
      // maybe the container is the problem and why interactivity isn't working. app should be the container?
      this.container = new PIXI.Container();
      this.container.x = 0;
      this.container.y = this.app.screen.height;
      this.app.stage.addChild(this.container);
      for (let i = 0; i < CONSTANT.elementTotal; i++) {
        var bar = new PIXI.Sprite(PIXI.Texture.WHITE);
            bar.position.x = i * CONSTANT.positionConstant;
            bar.tint = CONSTANT.whiteColour;
            bar.width = CONSTANT.widthConstant;
            bar.height = CONSTANT.heightConstant;
            bar.anchor.set(1);
            this.container.addChild(bar);
      }
      this.domElement.appendChild(this.app.view);
    }

    // CONTROL PANEL CONFIG
    this.changeSpeed = this.graphAttributes.changeSpeed;
    this.identifyThoughts = this.graphAttributes.identifyThoughts;
    this.changeFocus = this.graphAttributes.changeFocus;
    this.balanceClarity = this.graphAttributes.balanceClarity;

    // CREATE CONTROL PANEL
    if (this.graphAttributes.hasControlPanel) {
      let container = document.createElement('div');
          container.classList.add("control__panel");

      if (this.identifyThoughts.active) {
        let radio = radio("identify__thoughts", 2);        
        radio.children[0].children[0].oninput = function (event) { this.identifyThoughts() };        
        container.appendChild(this.identifyThoughts());
      }
      if (this.changeFocus.active) {
        container.appendChild(this.changeFocus()); 
        container.children[0].children[0].oninput = function (event) { this.changeFocus() };                
      }
      if (this.speed.active) {
        let radio = radio("change__speed", 2);
        container.children[0].children[0].oninput = function (event) { this.changeSpeed() };
        container.appendChild(radio);        
      }
      if (this.balanceClarity.active) {
        container.appendChild(this.balanceClarity());
      }
      this.domElement.appendChild(container)
    }

    // SET ANIMATION
    this.app.ticker.add(delta => {
      let rateOfChange = this.previousTimeComparison.format("SSS") / 1000;
      let randomColourIndex = Math.floor(Math.random() * this.colour.length);
      let randomHeightIndex = Math.floor(Math.random() * this.height.length);
        
      if (this.previousTime + this.speedFunction(this.speed, rateOfChange) < this.previousTimeComparison.format("x")) {
        for (let index = 0; index < CONSTANT.elementTotal; index++) {
          this.container.children[index].tint = this.colourFunction(
                                                this.colour,
                                                index,
                                                this.distributionFunction(this.distribution),
                                                randomColourIndex,
                                                rateOfChange,
                                                this.behaviour,
                                                this.behaviourFunction,
                                              );

          this.container.children[index].height = this.frequencyFunction(
                                                this.frequency,
                                                this.heightFunction(
                                                  this.height,
                                                  index,
                                                  this.distributionFunction(this.distribution),
                                                  randomHeightIndex,
                                                  rateOfChange,
                                                  this.behaviour,
                                                  this.behaviourFunction,
                                                ),
                                                index,
                                                this.behaviour,
                                                this.behaviourFunction,
                                              );
        }
        this.previousTime = moment();
        this.previousTimeComparison = moment();
      }  
      this.previousTimeComparison = moment();
    });
  }


  // CONTROL PANEL FUNCTIONS
  
  // change from normal to group.
  identifyThoughts() {
    this.colourFunction = HELPERS.multipleSections;
  }

  // change focus - (create/select specific thoughts to show)
  changeFocus() {
    // basically it changes 
    let container = this.sliderPanel("change__focus");
  }

  // change thought speed
  changeSpeed(event) {
    this.brainGraph.graphAttributes.timeFormat = "";
  }

  // change clarity - change both height AND frequency.
  balanceClarity() {
    for(let i = 0; i < 3; i++) {
      this.brainGraph.graphAttributes.sectionArray[i].height = () => heightVar[i];
    }
    return;

    this.brainGraph.graphAttributes.height = () => heightVar;
  }
}



// ELEMENT HELPERS

const slider = (name, changeFunction) => {
  let container = document.createElement('div');
      container.classList.add(`${name}__slider`);
      container.classList.add(`slider`);

  let input = document.createElement('input');
      input.setAttribute("type", "range");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", "50");
      input.classList.add(`${name}__slider__input`);
      input.classList.add(`slider__input`);

      container.appendChild(input);

  return container;
}

const radio = (name, number, valuesArray) => {
  let container = document.createElement('div');
      container.classList.add(`${name}__radio`);
      container.classList.add(`radio`);

  for(let i = 0; i < number; i++) {
    let input = document.createElement('input');
        input.classList.add(`${name}__radio__input`);
        input.setAttribute("type", "radio");
        input.setAttribute("value", valuesArray[2]);  
        input.classList.add(`radio__input`);

        container.appendChild(input);
  }
  return container;
}

const checkbox = (name) => {
  let container = document.createElement('div');
      container.classList.add(`checkbox`);

  let input = document.createElement('input');
      input.setAttribute("type", "checkbox");
      input.classList.add(`checkbox__${name}`);
      input.classList.add(`checkbox__input`);

      container.appendChild(input);

  return container;
}

const button = (name) => {
  let container = document.createElement('div');
      container.classList.add(`button`);

  let input = document.createElement('button');
      input.classList.add(`button__${name}`);
      input.classList.add(`button`);

      container.appendChild(input);

  return container;
}

