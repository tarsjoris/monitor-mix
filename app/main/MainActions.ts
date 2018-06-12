import { Action } from "redux";
import { EActionTypes } from "../Actions";

export interface IInternalLoadingDoneAction extends Action {
	type: EActionTypes.INTERNAL_LOADING_DONE
}

export const createLoadingDone = (): IInternalLoadingDoneAction => (
	{
		type: EActionTypes.INTERNAL_LOADING_DONE
	}
)

export interface IInternalRefreshParemetersAction extends Action {
	type: EActionTypes.INTERNAL_REFRESH_PARAMETERS
}

export const createRefreshParameters = (): IInternalRefreshParemetersAction => (
	{
		type: EActionTypes.INTERNAL_REFRESH_PARAMETERS
	}
)