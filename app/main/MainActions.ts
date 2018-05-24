import { Action } from "redux";
import { EActionTypes } from "../Actions";

export interface IInternalRefreshParemetersAction extends Action {
	type: EActionTypes.INTERNAL_REFRESH_PARAMETERS
}

export const createRefreshParameters = (): IInternalRefreshParemetersAction => (
	{
		type: EActionTypes.INTERNAL_REFRESH_PARAMETERS
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