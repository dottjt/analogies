import { ActionCreator } from 'redux';
import { Moment } from 'moment';
import { ReduxActions } from './types';

// ACTIONS
export const calculateHeight: ActionCreator<ReduxActions.NumberArrayAction> = (array: number[]) => ({ type: 'CALCULATE_HEIGHT', array });
export const calculateTint: ActionCreator<ReduxActions.StringArrayAction> = (array: string[]) => ({ type: 'CALCULATE_TINT', array });

export const calculateRateOfChange: ActionCreator<ReduxActions.MomentArrayAction> = (previousTime: Moment) => ({ type: 'CALCULATE_RATE_OF_CHANGE', previousTime });
export const calculateRandomColourIndex: ActionCreator<ReduxActions.TypeAction> = () => ({ type: 'CALCULATE_RANDOM_COLOUR_INDEX' });
export const calculateRandomHeightIndex: ActionCreator<ReduxActions.TypeAction> = () => ({ type: 'CALCULATE_RANDOM_HEIGHT_INDEX' });

export const organiseDirection: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'ORGANISE_DIRECTION', value });
export const singleOutDirection: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'SINGLE_OUT_DIRECTION', value });
export const multipleBrainConfiguration: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'MULTIPLE_BRAIN_CONFIGURATION', value });

export const createDirection: ActionCreator<ReduxActions.StringValueAction> = (value: string) => ({ type: 'CREATE_DIRECTION', value });

export const changeSpeed: ActionCreator<ReduxActions.NumberValueAction> = (value: number) => ({ type: 'CHANGE_SPEED', value });
export const balanceClarity: ActionCreator<ReduxActions.NumberValueAction> = (value: number) => ({ type: 'BALANCE_CLARITY', value });
