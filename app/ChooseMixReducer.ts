import { IChooseMixState } from "./IState";

export interface ILoadingAction {
	type: string
}

export const ACTION_LOADING_DONE = "LOADING_DONE"

export const chooseMixReducer = (state: IChooseMixState = { isReady: false }, action: ILoadingAction): IChooseMixState => {
	switch (action.type) {
		case ACTION_LOADING_DONE:
			return { ...state, isReady: true }
		default:
			return state;
	}
}