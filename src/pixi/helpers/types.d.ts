// type declarations
import { Moment } from 'moment';
import { Store, Action } from 'redux';

declare module IHelpers {

  // BRAIN GRAPH
  export type BrainOptions = {
    readonly hasGraph: boolean,
    readonly hasControlPanel: boolean,
    
    readonly changeSpeed: number | null,
    readonly balanceClarity: number | null,
     
    readonly createDirection: string | null,
     
    readonly organiseDirection: string | null,
    readonly singleOutDirection: string | null,
    readonly multipleBrainConfiguration: string | null,

    // readonly calculatedHeight: number[],
    // readonly calculatedTint: string[],

    // readonly randomColourIndex: number,
    // readonly randomHeightIndex: number,
    // readonly rateOfChange: number,
     
    readonly colour: number[],
    readonly colourFunction: { (valueArray: number[], _index: number, _distributionArray: number[], _randomIndex: number, _rateOfChange: number): number; } [],
     
    readonly colourPost: number[],
    readonly colourPostFunction: { (filterArray: number[], colour: number, index: number, rateOfChange: number): number } [],

    readonly height: number[],
    readonly heightFunction: { (valueArray: number[], _index: number, _distributionArray: number[], _randomIndex: number, _rateOfChange: number): number } [],

    readonly heightPost: number[],
    readonly heightPostFunction: { (percentageArray: number[], height: number, index: number, rateOfChange: number): number } [],

    readonly speed: number[],
    readonly speedFunction: { (speed: number[], change: number): number } [],

    readonly distribution: number[],
    readonly distributionFunction: { (n: number[]): number[] } [],

    readonly behaviour: number[],

    readonly singleOutDirectionItems: RadioItem[],
    readonly organiseDirectionItems: RadioItem[],
    readonly multipleBrainConfigurationItems: RadioItem[],
  }
  
  export interface RadioItem {
    text: string,
    selected: boolean,
  }

  export interface BrainGraph {
    app: PIXI.Application | null,
    store: Store<Options>,
    domElement: Element | null, 
    animationFunction: { (graph: BrainGraph): BrainGraph } | null,
    previousTime: number,
    previousTimeComparison: Moment,
  }


  
  // NARRATIVE GRAPH
  export type NarrativeOptions = {
    readonly hasGraph: boolean,
    readonly hasControlPanel: boolean,

    readonly colour: number[],
    readonly colourFunction: { (valueArray: number[], _index: number, _distributionArray: number[], _randomIndex: number, _rateOfChange: number): number; } [],
    
    readonly xPosition: number[],
    readonly xPositionFunction: { (currentXPosition: number, valueArray: number[], _index: number, _distributionArray: number[], _randomIndex: number, _rateOfChange: number): number; } [],
    
    readonly yPosition: number[],
    readonly yPositionFunction: { (currentYPosition: number, valueArray: number[], _index: number, _distributionArray: number[], _randomIndex: number, _rateOfChange: number): number; } [],
    
    readonly lineThickness: number[],
    readonly lineThicknessFunction: { (valueArray: number[], _index: number, _distributionArray: number[], _randomIndex: number, _rateOfChange: number): number; } [],

    readonly distribution: number[],
    readonly distributionFunction: { (n: number[]): number[] } [],

    readonly behaviour: number[],

    readonly speed: number[],
    readonly speedFunction: { (speed: number[], change: number): number } [],
  }

  export interface NarrativeGraph {
    app: PIXI.Application | null,
    store: Store<Options>,
    domElement: Element | null, 
    animationFunction: { (graph: NarrativeGraph): NarrativeGraph } | null,
    previousTime: number,
    previousTimeComparison: Moment,
  }

}


declare module ReduxActions {
  
  export interface StringValueAction extends Action {
    type: string,
    value: string,
  }

  export interface NumberValueAction extends Action {
    type: string,
    value: number,
  }
  
  export interface TypeAction extends Action {
    type: string,
  }

  export interface NumberArrayAction extends Action {
    type: string,
    array: number[],
  }

  export interface StringArrayAction extends Action {
    type: string,
    array: string[],
  }

  export interface MomentArrayAction extends Action {
    type: string,
    previousTime: Moment,
  }

}
