import { EActionTypes, IActionTypes } from "../Actions";
import { IMainState } from "./MainState";

export const mainReducer = (state: IMainState = { isReady: false }, action: IActionTypes): IMainState => {
	switch (action.type) {
		case EActionTypes.INTERNAL_LOADING_DONE:
			return { ...state, isReady: true }
		default:
			return state;
	}
}