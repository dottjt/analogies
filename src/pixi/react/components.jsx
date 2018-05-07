import React from 'react';
import { connect } from 'react-redux';

import * as HELPERS from '../helpers/helpers';


class ControlPanel extends React.Component {
  render() {
    let { store } = this.props;

    return (
      <div className="panel">
        { store.organiseDirection ?
          <Radio
            name="organise direction"
            items={store.organiseDirectionItems}
            clickFunction={this.props.organiseDirection}
            selectFunction={this.props.selectRadioButtonOrganise}
          />
        : null }

        { store.singleOutDirection ?
          <Radio
            name="change__focus"
            items={store.singleOutDirectionItems}
            clickFunction={this.props.singleOutDirection}
            selectFunction={this.props.selectRadioButtonSingleOut}
          />
        : null }

        { store.createDirection ?
          <Button
            name="create__direction"
            text="create direction"
            clickFunction={() => this.props.createDirection("gratitude")}
          />
        : null }

        { store.changeSpeed ?
          <Slider
            name="change__speed"
            text="change speed"
            sliderFunction={this.props.changeSpeed}
          />
        : null }

        { store.balanceClarity ?
          <Slider
            name="balance__clarity"
            text="clarity balance"
            sliderFunction={this.props.balanceClarity}
          />
        : null }
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    store,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    organiseDirection: (value) => {
      dispatch(HELPERS.organiseDirection(value))
    },
    createDirection: (value) => {
      dispatch(HELPERS.createDirection(value))
    },
    changeSpeed: (value) => {
      dispatch(HELPERS.changeSpeed(value))
    },
    balanceClarity: (value) => {
      dispatch(HELPERS.balanceClarity(value))
    },
    singleOutDirection: (value) => {
      dispatch(HELPERS.singleOutDirection(value))
    },
    selectRadioButtonOrganise: (value) => {
      dispatch(HELPERS.selectRadioButtonOrganise(value))
    },
    selectRadioButtonSingleOut: (value) => {
      dispatch(HELPERS.selectRadioButtonSingleOut(value))
    },
  }
}

export const ControlPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);


export class Slider extends React.Component {
  render() {
    let { name, text, sliderFunction } = this.props;
    return (
      <div className={`${name}__slider slider__container`}>
        <label htmlFor={`${name}__slider`}>{text}</label>
        <input 
          className={`${name}__slider__input slider is-circle`}
          name={`${name}__slider`}
          type="range"
          min="1"
          max="100"
          value="50"
          onChange={(event) => sliderFunction(event.currentTarget.value)} 
        />
      </div>
    )
  }
}

export class Radio extends React.Component {

  render() {
    return (
      <div className={`${this.props.text}__radio radio__container field has-addons`}>
        {this.props.items.map((item) => {
          let selected = item.selected ? "is-primary" : "is-primary is-outlined";
          return (
            <div key={item.text} className={`radio__item control`}>
              <div className={`${selected} button`} onClick={() => { this.props.clickFunction(item.text); this.props.selectFunction(item.text) } }>
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

export class Button extends React.Component {
  render() {
    let { name, text, clickFunction } = this.props;

    return (
      <div className={`${name}__button button__container`}>
          <button
            className={`${name}__button__input button__input button is-primary`}
            onClick={() => clickFunction()}
          >
          {text}
          </button>
      </div>
    )
  }
}



// EXTERNAL COMPONENTS

export class Checklist extends React.Component {
  
  constructor() {
    super();
    this.state = { c1: false, c2: false, c3: false, c1hover: false, c2hover: false, c3hover: false }
    this.check = this.check.bind(this);
  }
  
  check(event, c, crossout) {
    if(!crossout) {
      this.setState({
        [event.currentTarget.id]: !c,
      });  
    }
  }

  onMouseUp(event, c, crossout) {
    if(!crossout) {
      this.setState({
        [event.currentTarget.id + "hover"]: false,
      });  
    }
  }

  onMouseDown(event, c, crossout) {
    if(!crossout) {
      this.setState({
        [event.currentTarget.id + "hover"]: true,
      });  
    }
  }

  render() {
    let { c1, c2, c3, c1hover, c2hover, c3hover } = this.state;
    let { crossout } = this.props;
    return (
      <ul className="checkbox__list">
        <li className={`checkbox__item checkbox__item__onclick__${c1hover}`} id="c1" 
          onClick={(event) => this.check(event, c1, false)}
          onMouseDown={(event) => this.onMouseDown(event, c1, false)}
          onMouseUp={(event) => this.onMouseUp(event, c1, false)}>
          <Checkbox bool={c1}/><p className="text">Brush teeth.</p>
        </li>
        <li className={`checkbox__item checkbox__item__disabled__${crossout} checkbox__item__onclick__${c2hover}`} id="c2" 
            onClick={(event) => this.check(event, c2, crossout)}
            onMouseDown={(event) => this.onMouseDown(event, c2, crossout)}
            onMouseUp={(event) => this.onMouseUp(event, c2, crossout)}>
          <Checkbox bool={c2}/><p className="text">Cry in the shower alone.</p>
        </li>
        <li className={`checkbox__item checkbox__item__disabled__${crossout} checkbox__item__onclick__${c3hover}`} id="c3" 
            onClick={(event) => this.check(event, c3, crossout)}
            onMouseDown={(event) => this.onMouseDown(event, c3, crossout)}
            onMouseUp={(event) => this.onMouseUp(event, c3, crossout)}>

          <Checkbox bool={c3}/><p className="text">Binge eat an entire bucket of ice cream.</p>
        </li>
      </ul>
    )
  }
}

const Checkbox = ({bool}) => (
  bool ? (
    <div className="checkbox checkbox__checked"></div>
  ) : (
    <div className="checkbox"></div>
  )
)
