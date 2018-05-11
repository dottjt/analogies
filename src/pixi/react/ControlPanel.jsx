import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as REDUX from './redux';

// CONTROL PANEL COMPONENT

class ControlPanel extends React.Component {
  render() {
    let { store } = this.props;
    
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

ControlPanel.propTypes = {
  store: PropTypes.object,
  changeSpeed: PropTypes.func,
  organiseDirection: PropTypes.func,
  singleOutDirection: PropTypes.func,
  selectRadioButtonSingleOut: PropTypes.func,
  selectRadioButtonOrganise: PropTypes.func, 
  createDirection: PropTypes.func,
  balanceClarity: PropTypes.func,
  multipleBrainConfiguration: PropTypes.func,
};

// CONTROL PANEL CONTAINER

const mapStateToProps = store => {
  return {
    store,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    organiseDirection: (value) => {
      dispatch(REDUX.organiseDirection(value))
    },
    createDirection: (value) => {
      dispatch(REDUX.createDirection(value))
    },
    changeSpeed: (value) => {
      dispatch(REDUX.changeSpeed(value))
    },
    balanceClarity: (value) => {
      dispatch(REDUX.balanceClarity(value))
    },
    singleOutDirection: (value) => {
      dispatch(REDUX.singleOutDirection(value))
    },
    multipleBrainConfiguration: (value) => {
      dispatch(REDUX.multipleBrainConfiguration(value))
    },
  }
}

const ControlPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);

export default ControlPanelContainer;

class Slider extends React.Component {
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
          onChange={(event) => onInput(event.currentTarget.value)} 
        />
      </div>
    )
  }
}

Slider.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  onInput: PropTypes.func,
  selectedValue: PropTypes.number,
}

class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.props.onClick(this.props.selectedValue);
  }
  render() {
    return (
      <div className={`${this.props.text}__radio radio__container field has-addons`}>
        {this.props.items.map((item) => {
          let selected = item.selected ? "is-primary" : "is-primary is-outlined";
          return (
            <div key={item.text} className={`radio__item control`}>
              <div className={`${selected} button`} onClick={() => this.props.onClick(item.text) }>
                {item.text}
              </div>
            </div>
          );
        })
        }
      </div>
    )
  }
}

Radio.propTypes = {
  text: PropTypes.string,
  items: PropTypes.array,
  onClick: PropTypes.func,
  selectedValue: PropTypes.string,
}

class Button extends React.Component {
  render() {
    let { name, text, onClick } = this.props;

    return (
      <div className={`${name}__button button__container`}>
          <button
            className={`${name}__button__input button__input button is-primary`}
            onClick={() => onClick()}
          >
          {text}
          </button>
      </div>
    )
  }
}

Button.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
}
