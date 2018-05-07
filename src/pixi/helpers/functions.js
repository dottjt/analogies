import React from 'react';
import ReactDOM from 'react-dom';

import * as PIXI from 'pixi.js';
import * as CONSTANT from './constants';
import * as HELPERS from './helpers';

import { observable, action, computed, useStrict } from 'mobx';

import { Button, Radio, Slider } from '../react/components.jsx';
import ControlPanelStore from '../react/mobx';
import moment from 'moment';


export default class BrainGraph {
  constructor(name, options) {

    // GRAPH CONFIG
    this.name = name;
    this.graphAttributes = options;
    this.previousTime = moment().format("x");
    this.previousTimeComparison = moment();
    this.domElement = document.querySelector(`#${this.name}`);
    this.domElementPanel = document.querySelector(`#${this.name}Panel`);

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
    this.behaviourFunctionColour = this.graphAttributes.behaviourFunctionColour;
    this.behaviourFunctionHeight = this.graphAttributes.behaviourFunctionHeight;
    this.behaviourFunctionFrequency = this.graphAttributes.behaviourFunctionFrequency;

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

    let store = new ControlPanelStore(this.organiseDirectionFunction, this.selectRadioButton);

    // CREATE CONTROL PANEL
    if (this.graphAttributes.hasControlPanel) {

      const organiseDirectionRadio = this.graphAttributes.organiseDirection ?
        <Radio
          name="organise direction"
          items={store.organiseDirectionItems}
        />
      : null

      const createDirectionButton = this.graphAttributes.createDirection ?
        <Button
          name="create__direction"
          text="create direction"
          clickFunction={() => this.createDirectionFunction("gratitude")}
        />
      : null

      const singleOutDirectionRadio = this.graphAttributes.singleOutDirection ?
        <Radio
          name="change__focus"
          items={this.singleOutDirectionItems}
        />
      : null

      const changeSpeedSlider = this.graphAttributes.changeSpeed ?
        <Slider
          name="change__speed"
          text="change speed"
          sliderFunction={this.changeSpeedFunction}
        />
      : null

      const balanceClaritySlider = this.graphAttributes.balanceClarity ?
        <Slider
          name="balance__clarity"
          text="clarity balance"
          sliderFunction={this.balanceClarityFunction}
        />
      : null

      ReactDOM.render(
        <div className="panel">
          { organiseDirectionRadio }
          { createDirectionButton }
          { singleOutDirectionRadio }
          { changeSpeedSlider }
          { balanceClaritySlider }
        </div>, this.domElementPanel);
    }

    // SET ANIMATION
    if (this.graphAttributes.hasGraph) {
      this.app.ticker.add(delta => {
        let rateOfChange = this.previousTimeComparison.format("SSS") / 1000;
        let randomColourIndex = Math.floor(Math.random() * this.colour.length);
        let randomHeightIndex = Math.floor(Math.random() * this.height.length);

        if (this.previousTime + this.speedFunction(this.speed, rateOfChange) < this.previousTimeComparison.format("x")) {
          for (let index = 0; index < CONSTANT.elementTotal; index++) {
            this.container.children[index].tint = this.colourFunction(
                                                    // this.filterFunction(
                                                    //   this.filter,
                                                      this.colour,
                                                    // ),
                                                  index,
                                                  this.distributionFunction(this.distribution),
                                                  randomColourIndex,
                                                  rateOfChange,
                                                  this.behaviour,
                                                  this.behaviourFunctionColour,
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
                                                    this.behaviourFunctionHeight,
                                                  ),
                                                  index,
                                                  rateOfChange,
                                                  this.behaviour,
                                                  this.behaviourFunctionFrequency,
                                                );
          }
          this.previousTime = moment();
          this.previousTimeComparison = moment();
        }  
        this.previousTimeComparison = moment();
      }
    );
  }
  }

  // CONTROL PANEL FUNCTIONS
  // change from normal to group.

  // @observable
  // organiseDirectionItems = [{
  //   text: "scrambled",
  //   selected: true,
  //   clickFunction: () => this.organiseDirectionFunction("scrambled"),
  //   selectFunction: () => this.selectRadioButton("scrambled"),
  // },
  // {
  //   text: "organised",
  //   selected: false,
  //   clickFunction: () => this.organiseDirectionFunction("organised"), 
  //   selectFunction: () => this.selectRadioButton("organised"),
  // }]


  organiseDirectionFunction(type) {
    switch(type) {
      case "scrambled":
        this.colour = CONSTANT.standardColour;
        this.colourFunction = HELPERS.singleRandom;
        break;
      case "organised":
        this.colour = [ CONSTANT.thoughtColour, CONSTANT.opinionColour, CONSTANT.judgementColour ];
        this.colourFunction = HELPERS.multipleSections;
        break;
      default:
        null;
    }
  }

  createDirectionFunction(type) {
    switch(type) {
      case "gratitude":
        this.colour = CONSTANT.gratitudeColour;
        break;
      case "clear":
        this.colour = CONSTANT.whiteColour;
        break;
      default: 
        null;
    }
  }

  @observable
  singleOutDirectionItems = [{
    text: "all",
    selected: true,
    clickFunction: () => this.singleOutDirectionFunction("all"),
  },
  {
    text: "thought",
    selected: false,
    clickFunction: () => this.singleOutDirectionFunction("thought"),
  },
  {
    text: "opinion",
    selected: false,
    clickFunction: () => this.singleOutDirectionFunction("opinion"), 
  },
  {
    text: "judgement",
    selected: false,            
    clickFunction: () => this.singleOutDirectionFunction("judgement"),
  }]

  // change focus - (create/select specific thoughts to show)
  singleOutDirectionFunction(type) {
    switch(type) {
      case "all":
        this.colour = CONSTANT.standardColour;
        this.colourFunction = HELPERS.singleRandom;
        // this.frequency = CONSTANT.frequencyConstant;
        break;
      case "thought":
        this.colour = [ CONSTANT.thoughtColour, CONSTANT.whiteColour, CONSTANT.whiteColour ];
        this.colourFunction = HELPERS.multipleSections;
        // this.frequency = CONSTANT.frequencyConstantFull;
        break;
      case "opinion":
        this.colour = [ CONSTANT.whiteColour, CONSTANT.opinionColour, CONSTANT.whiteColour ];
        this.colourFunction = HELPERS.multipleSections;        
        // this.frequency = CONSTANT.frequencyConstantFull;
        break;
      case "judgement":
        this.colour = [ CONSTANT.whiteColour, CONSTANT.whiteColour, CONSTANT.judgementColour ];
        this.colourFunction = HELPERS.multipleSections;                
        // this.frequency = CONSTANT.frequencyConstantFull;
        break;
      default:
        null;
        break;
    }
  }

  // change thought speed
  changeSpeedFunction(sliderValue) {
    this.speed = sliderValue * 10;
  }

}




