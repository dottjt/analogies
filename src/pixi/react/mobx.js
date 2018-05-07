import { observable, action, computed, useStrict } from 'mobx';

export default class ControlPanelStore {

  constructor(organiseDirectionFunction) {
    this.organiseDirectionFunction = organiseDirectionFunction;
  }

  @observable organiseDirectionItems = [{
    text: "scrambled",
    selected: true,
    clickFunction: () => this.organiseDirectionFunction("scrambled"),
    selectFunction: () => this.selectRadioButton("scrambled"),
  },
  {
    text: "organised",
    selected: false,
    clickFunction: () => this.organiseDirectionFunction("organised"), 
    selectFunction: () => this.selectRadioButton("organised"),
  }]

  @action selectRadioButton = (text) => {
    this.organiseDirectionItems = this.organiseDirectionItems.map(item => item.text === text ? { ...item, selected: true } : { ...item, selected: false } );
  }
}
