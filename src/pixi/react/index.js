import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Stage } from "react-pixi-fiber";

import * as REDUX from './redux';

import BrainGraphContainer from './BrainGraph.jsx';
import ControlPanelContainer from './ControlPanel.jsx';

export default class BrainGraphIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: createStore(REDUX.reducer, this.props.options, composeWithDevTools()), 
    }
  }
  
  render() {
    return (
      <Provider store={this.state.store}>
        <div>
          { this.props.hasGraph ?
            <Stage width={600} height={160} options={{ antialias: true, backgroundColor: 0xffffff }}>
              <BrainGraphContainer />
            </Stage>
          : null }

          { this.props.hasControlPanel ?
            <ControlPanelContainer />
          : null }
        </div>
      </Provider>
    )
  }
}

BrainGraphIndex.propTypes = {
  hasGraph: PropTypes.bool,
  hasControlPanel: PropTypes.bool,
  options: PropTypes.object,
}