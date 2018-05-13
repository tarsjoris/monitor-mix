import { Action } from 'redux';
import { EActionTypes } from '../Actions';

export interface IFaderLevelAction extends Action {
	fader: number
	value: number
}

export interface IExternalFaderLevelAction extends IFaderLevelAction {
	type: EActionTypes.EXTERNAL_FADER_LEVEL
}

export const createExternalFaderLevel = (fader: number, value: number): IExternalFaderLevelAction => (
	{
		type: EActionTypes.EXTERNAL_FADER_LEVEL,
		fader,
		value
	}
)

export interface IInternalFaderLevelAction extends IFaderLevelAction {
	type: EActionTypes.INTERNAL_FADER_LEVEL
}

export const createInternalFaderLevel = (fader: number, value: number): IInternalFaderLevelAction => (
	{
		type: EActionTypes.INTERNAL_FADER_LEVEL,
		fader,
		value
	}
)