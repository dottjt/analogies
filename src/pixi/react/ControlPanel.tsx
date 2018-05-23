import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ACTIONS from '../helpers/actions';
import { IHelpers, ReduxActions } from '../helpers/types';

// CONTROL PANEL COMPONENT

interface SliderProps {
  name: string,
  text: string,
  onInput: (value: number) => {type: string, value: number},
  selectedValue: number,
}

class Slider extends React.Component<SliderProps, {}> {
  static propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    onInput: PropTypes.func,
    selectedValue: PropTypes.number,
  }

  render() {
    let { name, text, onInput } = this.props;
    
    return (
      <div className={`${name}__slider slider__container`}>
        <label htmlFor={`${name}__slider`}>{text}</label>
        <input 
          className={`${name}__slider__input slider is-circle`}
          name={`${name}__slider`}
          type="range"
          min="1"
          max="100"
          value={this.props.selectedValue}
          onChange={(event) => onInput(+event.currentTarget.value)} 
        />
      </div>
    )
  }
}


interface RadioProps {
  name: string,
  items: IHelpers.RadioItem[],
  onClick: (value: string) => ReduxActions.StringValueAction,
  selectedValue: string,
}

class Radio extends React.Component<RadioProps, {}> {

  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    onClick: PropTypes.func,
    selectedValue: PropTypes.string,
  }

  constructor(props: RadioProps) {
    super(props);
    this.props.onClick(this.props.selectedValue);
  }

  render() {
    console.log(this.props);

    // for whatever reason, this isn't rendered

    return (
      <div className={`${this.props.name}__radio radio__container field has-addons`}>
        {this.props.items.map((item) => (
          <div key={item.text} className={`radio__item control`}>
            <div className={`${item.selected ? "is-primary" : "is-primary is-outlined"} button`} onClick={() => this.props.onClick(item.text) }>
              {item.text}
            </div>
          </div>
          )
        )
        }
      </div>
    )
  }
}

interface ButtonProps {
  name: string,
  text: string,
  onClick: (value: string) => {type: string, value: string},
}

class Button extends React.Component<ButtonProps, {}> {

  static propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    let { name, text, onClick } = this.props;

    return (
      <div className={`${name}__button button__container`}>
          <button
            className={`${name}__button__input button__input button is-primary`}
            onClick={() => onClick(text)}
          >
          {text}
          </button>
      </div>
    )
  }
}


interface ControlPanelProps {
  store: IHelpers.BrainOptions,
  createDirection: (value: string) => ReduxActions.StringValueAction,
  
  changeSpeed: (value: number) => ReduxActions.NumberValueAction,
  balanceClarity: (value: number) => ReduxActions.NumberValueAction,
  
  organiseDirection: (value: string) => ReduxActions.StringValueAction,
  singleOutDirection: (value: string) => ReduxActions.StringValueAction,
  multipleBrainConfiguration: (value: string) => ReduxActions.StringValueAction,
}

class ControlPanel extends React.Component<ControlPanelProps, {}> {

  static propTypes = {
    store: PropTypes.object,

    createDirection: PropTypes.func,
    
    changeSpeed: PropTypes.func,
    balanceClarity: PropTypes.func,
    
    organiseDirection: PropTypes.func,
    singleOutDirection: PropTypes.func,
    multipleBrainConfiguration: PropTypes.func,
  };

  render() {
    let store: IHelpers.BrainOptions = this.props.store;
        
    return (
      <div className="panel">

      {/* SLIDER */}
        { store.changeSpeed ?
          <Slider
            name="change__speed"
            text="change speed"
            onInput={this.props.changeSpeed}
            selectedValue={store.changeSpeed}
          />
        : null }

        { store.balanceClarity ?
          <Slider
            name="balance__clarity"
            text="clarity balance"
            onInput={this.props.balanceClarity}
            selectedValue={store.balanceClarity}            
          />
        : null }

      {/* RADIO */}
        { store.organiseDirection ?
          <Radio
            name="organise direction"
            items={store.organiseDirectionItems}
            onClick={this.props.organiseDirection}
            selectedValue={store.organiseDirection}
          />
        : null }

        { store.singleOutDirection ?
          <Radio
            name="change__focus"
            items={store.singleOutDirectionItems}
            onClick={this.props.singleOutDirection}
            selectedValue={store.singleOutDirection}            
          />
        : null }

        { store.multipleBrainConfiguration ?
          <Radio
            name="multiple__brain__configurations"
            items={store.multipleBrainConfigurationItems}
            onClick={this.props.multipleBrainConfiguration}
            selectedValue={store.multipleBrainConfiguration}                        
          />
        : null }

      {/* BUTTON */}
        { store.createDirection ?
          <Button
            name="create__direction"
            text="create direction"
            onClick={() => this.props.createDirection("gratitude")}
          />
        : null }

      </div>
    )
  }
}



// CONTROL PANEL CONTAINER

const mapStateToProps = (store: IHelpers.BrainOptions) => ({ store });
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(ACTIONS, dispatch);

export const ControlPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
