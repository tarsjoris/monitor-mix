import { IMainState } from "./IState";

export interface ILoadingAction {
	type: string
}

export const ACTION_LOADING_DONE = "LOADING_DONE"

export const mainReducer = (state: IMainState = { isReady: false }, action: ILoadingAction): IMainState => {
	switch (action.type) {
		case ACTION_LOADING_DONE:
			return { ...state, isReady: true }
		default:
			return state;
	}
}