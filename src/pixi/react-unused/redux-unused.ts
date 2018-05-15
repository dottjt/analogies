  // case "CALCULATE_HEIGHT":
    //   return { ...state,
    //           calculatedHeight: action.array.map((index: number) => 
    //             state.heightPostFunction(
    //               state.heightPost,
    //               state.heightFunction(
    //                 state.height,
    //                 index,
    //                 state.distributionFunction(state.distribution),
    //                 state.randomHeightIndex,
    //                 state.rateOfChange,
    //                 state.behaviour,
    //                 state.behaviourFunctionHeight,
    //               ),
    //               index,
    //               state.rateOfChange,
    //               state.behaviour,
    //               state.behaviourFunctionFrequency,
    //           ))
    //         }

    // case "CALCULATE_TINT":
    //   return { ...state,
    //           calculatedTint: action.array.map((index: number) => 
    //             state.colourPostFunction(
    //               state.colourPost,
    //               state.colourFunction(
    //                 state.colour,
    //                 index,
    //                 state.distributionFunction(state.distribution),
    //                 state.randomColourIndex,
    //                 state.rateOfChange,
    //                 state.behaviour,
    //                 state.behaviourFunctionColour,
    //               ),
    //               index,
    //               state.rateOfChange,
    //               state.behaviour,
    //               state.behaviourFunctionFrequency,
    //             ))
    //         }

    // case "CALCULATE_RATE_OF_CHANGE":
    //   return {
    //     ...state,
    //     rateOfChange: <number> action.previousTime.format("SSS") / 1000,
    //   }

    // case "CALCULATE_RANDOM_COLOUR_INDEX":
    //   return {
    //     ...state,
    //     randomColourIndex: Array.isArray(state.colour) ? <number> Math.floor(Math.random() * state.colour.length) : 0,
    //   }

    // case "CALCULATE_RANDOM_HEIGHT_INDEX":
    //   return {
    //     ...state,
    //     randomHeightIndex: Array.isArray(state.height) ? <number> Math.floor(Math.random() * state.height.length) : 0,
    //   }

