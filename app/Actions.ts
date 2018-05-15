import { IExternalInputColorAction, IExternalInputLevelAction, IExternalInputNameAction, IInternalInputLevelAction } from './inputs/input/InputActions';
import { IInternalLoadingDoneAction } from './main/MainActions';
import { IExternalOutputColorAction, IExternalOutputLevelAction, IExternalOutputNameAction, IInternalOutputChoiceAction, IInternalOutputLevelAction } from './output/OutputActions';

export enum EActionTypes {
	INTERNAL_LOADING_DONE = "INTERNAL_LOADING_DONE",
	EXTERNAL_OUTPUT_LEVEL = "EXTERNAL_OUTPUT_LEVEL",
	EXTERNAL_OUTPUT_NAME = "EXTERNAL_OUTPUT_NAME",
	EXTERNAL_OUTPUT_COLOR = "EXTERNAL_OUTPUT_COLOR",
	INTERNAL_OUTPUT_LEVEL = "INTERNAL_OUTPUT_LEVEL",
	INTERNAL_OUTPUT_CHOICE = "INTERNAL_OUTPUT_CHOICE",
	EXTERNAL_INPUT_LEVEL = "EXTERNAL_INPUT_LEVEL",
	INTERNAL_INPUT_LEVEL = "INTERNAL_INPUT_LEVEL",
	EXTERNAL_INPUT_NAME = "EXTERNAL_INPUT_NAME",
	EXTERNAL_INPUT_COLOR = "EXTERNAL_INPUT_COLOR"
}

export type IActionTypes =
	IInternalLoadingDoneAction |
	IExternalOutputLevelAction |
	IInternalOutputLevelAction |
	IExternalOutputNameAction |
	IExternalOutputColorAction |
	IInternalOutputChoiceAction |
	IExternalInputLevelAction |
	IInternalInputLevelAction |
	IExternalInputNameAction |
	IExternalInputColorAction