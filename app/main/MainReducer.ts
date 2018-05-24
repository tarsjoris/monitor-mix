import { IActionTypes } from "../Actions";
import { IMainState } from "./MainState";

export const mainReducer = (state: IMainState = { isReady: false }, action: IActionTypes): IMainState => {
	switch (action.type) {
		default:
			return state;
	}
}