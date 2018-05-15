// import * as React from 'react';
// import { Store } from 'redux';
// import { connect } from 'react-redux';
// import * as PropTypes from 'prop-types';
// import * as moment from 'moment';

// import * as PIXI from 'pixi.js';
// import * as CONSTANT from '../helpers/constants';
// import * as REDUX from './redux';

// import { Container, Sprite } from "react-pixi-fiber";


// interface BrainGraphProps {
//   store: Store<IHelpers.Options>,
//   calculateRateOfChange: (n: number) => number,
//   calculateRandomColourIndex: (n: number) => number,
//   calculateRandomHeightIndex: (n: number) => number,
//   calculateHeight: ,
//   calculateTint: ,
// }

// interface BrainGraphState {
//   elementTotal: number[],
//   previousTime: number,
//   previousTimeComparison: moment.Moment
// }

// class BrainGraph extends React.Component< , BrainGraphState> {

//   static propTypes = {
//     store: PropTypes.object,
//     calculateRateOfChange: PropTypes.func,
//     calculateRandomColourIndex: PropTypes.func,
//     calculateRandomHeightIndex: PropTypes.func,
//     calculateHeight: PropTypes.func,
//     calculateTint: PropTypes.func,
//   }

//   constructor(props: ) {
//     super(props);

//     this.state = {
//       elementTotal: [...Array(CONSTANT.elementTotal).keys()],
//       previousTime: moment().format("x"),
//       previousTimeComparison: moment(),
//     }

//     this.animate = this.animate.bind(this);
//   }

//   componentDidMount() {
//     this.context.app.ticker.add(delta => {
//       this.animate(this.props.store, this.state.previousTime, this.state.previousTimeComparison);
//     }); 
//   }

//   componentWillUnmount() {
//     this.context.app.ticker.remove(this.animate);
//   }

//   animate(store, previousTime, previousTimeComparison) {
//     this.props.calculateRateOfChange(previousTimeComparison);
//     this.props.calculateRandomColourIndex();
//     this.props.calculateRandomHeightIndex();

//     if (previousTime + store.speedFunction(store.speed, store.rateOfChange) < previousTimeComparison.format("x")) {
//       this.props.calculateHeight(this.state.elementTotal);
//       this.props.calculateTint(this.state.elementTotal);
//       this.setState({
//         previousTime: moment(),
//         previousTimeComparison: moment(),
//       });
//     }
//     this.setState({
//       previousTimeComparison: moment(),
//       rateOfChange: moment().format("SSS") / 1000,      
//     });
//   }

//   render() {
//     return (
//       <Container x={0} y={this.context.app.screen.height}>
//         {this.state.elementTotal.map(index => (
//           <Bar
//             key={index} 
//             index={index}
//             calculatedTint={this.props.store.calculatedTint}
//             calculatedHeight={this.props.store.calculatedHeight}
//           />
//         ))}
//       </Container>             
//     )
//   }
// }

// BrainGraph.

// BrainGraph.contextTypes = {
//   app: PropTypes.object,
// };

// const mapStateToProps = store => {
//   return {
//     store,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     calculateHeight: (array) => {
//       dispatch(REDUX.calculateHeight(array))
//     },
//     calculateTint: (array) => {
//       dispatch(REDUX.calculateTint(array))
//     },
//     calculateRateOfChange: (previousTime) => {
//       dispatch(REDUX.calculateRateOfChange(previousTime))
//     },
//     calculateRandomColourIndex: () => {
//       dispatch(REDUX.calculateRandomColourIndex())
//     },
//     calculateRandomHeightIndex: () => {
//       dispatch(REDUX.calculateRandomHeightIndex())
//     },
//   }
// }

// const BrainGraphContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BrainGraph);

// export default BrainGraphContainer;

// const Bar = props => (
//   <Sprite
//     texture={PIXI.Texture.WHITE}
//           x={props.index * CONSTANT.positionConstant}
    
//     tint={props.calculatedTint[props.index]}
//     height={props.calculatedHeight[props.index]}

//     width={CONSTANT.widthConstant}
//     anchor={new PIXI.Point(0.5, 0.5)}
//     // okay, I need to figure out this bad boi.
//   />
// );

// Bar.propTypes = {
//   index: PropTypes.number,
//   calculatedTint: PropTypes.array,
//   calculatedHeight: PropTypes.array,
// }




