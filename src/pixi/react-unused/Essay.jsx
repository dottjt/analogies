// import React from 'react';
// import PropTypes from 'prop-types';
// import { observable, action } from 'mobx';
// import { observer } from 'mobx-react';

// /*
//  *
//  *
//  *
//  *  
//  *  ESSAY COMPONENT
//  *
//  *
//  * 
//  *  
//  */

// class ProofReadEssayState {
//   @observable textToWrite = Array.from("Dogs are my favourite animal, more-so than cats^^^^ or lions or");
//   @observable writtenText = "";

//   @action renderText(textArray) {
//     this.textToWrite.map(letter => {
//       setInterval(() => {
//         this.writtenText.push(letter)
//       }, 200);
//     })
//   }
// }

// @observer
// export class ProofReadEssay extends React.Component {

//   constructor(props) {
//     super(props);
//     this.props.renderText();
//   }

//   render() {
//     const { textToWrite } = this.props;

//     return (
//       <div>
//         <p>{textToWrite}</p>
//       </div>
//     )
//   }
// };

// ProofReadEssay.propTypes = {
//   textToWrite: PropTypes.string,
//   writtenText: PropTypes.string,
//   renderText: PropTypes.func,
// };

