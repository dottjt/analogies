// import * as React from 'react';
// import * as PropTypes from 'prop-types';
// import { Store, createStore } from 'redux';
// import { IHelpers } from '../helpers/types';

// import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { Stage } from "react-pixi-fiber";

// import * as REDUX from './reduxBrain';

// import BrainGraphContainer from './BrainGraph';
// import ControlPanelContainer from './ControlPanel';

// interface BrainGraphIndexProps {
//   options: IHelpers.BrainOptions,
//   hasGraph: boolean,
//   hasControlPanel: boolean,
// }

// interface BrainGraphIndexState {
//   store: Store<IHelpers.BrainOptions>
// }

// export default class BrainGraphIndex extends React.Component<BrainGraphIndexProps, BrainGraphIndexState> {
//   constructor(props: BrainGraphIndexProps) {
//     super(props);

//     this.state = {
//       store: createStore(REDUX.reducer, this.props.options, composeWithDevTools()), 
//     }
//   }
  
//   render() {
//     return (
//       <Provider store={this.state.store}>
//         <div>
//           { this.props.hasGraph ?
//             <Stage width={600} height={160} options={{ antialias: true, backgroundColor: 0xffffff }}>
//               <BrainGraphContainer />
//             </Stage>
//           : null }

//           { this.props.hasControlPanel ?
//             <ControlPanelContainer />
//           : null }
//         </div>
//       </Provider>
//     )
//   }
// }

// BrainGraphIndex.propTypes = {
//   hasGraph: PropTypes.bool,
//   hasControlPanel: PropTypes.bool,
//   options: PropTypes.object,
// }