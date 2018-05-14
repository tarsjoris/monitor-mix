import { IExternalFaderLevelAction, IInternalFaderLevelAction } from './faders/fader/FaderActions';
import { IInternalLoadingDoneAction } from './main/MainActions';
import { IExternalOutputLevelAction, IInternalOutputChoiceAction, IInternalOutputLevelAction } from './output/OutputActions';

export enum EActionTypes {
	INTERNAL_LOADING_DONE = "INTERNAL_LOADING_DONE",
	EXTERNAL_OUTPUT_LEVEL = "EXTERNAL_OUTPUT_LEVEL",
	INTERNAL_OUTPUT_LEVEL = "INTERNAL_OUTPUT_LEVEL",
	INTERNAL_OUTPUT_CHOICE = "INTERNAL_OUTPUT_CHOICE",
	EXTERNAL_FADER_LEVEL = "EXTERNAL_FADER_LEVEL",
	INTERNAL_FADER_LEVEL = "INTERNAL_FADER_LEVEL"
}

export type IActionTypes =
	IInternalLoadingDoneAction |
	IExternalOutputLevelAction |
	IInternalOutputLevelAction |
	IInternalOutputChoiceAction |
	IExternalFaderLevelAction |
	IInternalFaderLevelAction