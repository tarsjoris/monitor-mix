import { Action } from 'redux';
import { EActionTypes } from '../../Actions';

export interface IInputAction extends Action {
	input: number
}

export interface IInputLevelAction extends IInputAction {
	value: number
}

export interface IExternalInputLevelAction extends IInputLevelAction {
	type: EActionTypes.EXTERNAL_INPUT_LEVEL
}

export const createExternalInputLevel = (input: number, value: number): IExternalInputLevelAction => (
	{
		type: EActionTypes.EXTERNAL_INPUT_LEVEL,
		input,
		value
	}
)

export interface IInternalInputLevelAction extends IInputLevelAction {
	type: EActionTypes.INTERNAL_INPUT_LEVEL
}

export const createInternalInputLevel = (input: number, value: number): IInternalInputLevelAction => (
	{
		type: EActionTypes.INTERNAL_INPUT_LEVEL,
		input,
		value
	}
)

export interface IExternalInputNameAction extends IInputAction {
	type: EActionTypes.EXTERNAL_INPUT_NAME
	name: string
}

export const createExternalInputName = (input: number, name: string): IExternalInputNameAction => (
	{
		type: EActionTypes.EXTERNAL_INPUT_NAME,
		input,
		name
	}
)

export interface IExternalInputColorAction extends IInputAction {
	type: EActionTypes.EXTERNAL_INPUT_COLOR
	color: number
}

export const createExternalInputColor = (input: number, color: number): IExternalInputColorAction => (
	{
		type: EActionTypes.EXTERNAL_INPUT_COLOR,
		input,
		color
	}
)