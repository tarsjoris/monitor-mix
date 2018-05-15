import { EActionTypes, IActionTypes } from '../../Actions';
import { IInputState } from './InputState';


export const inputReducer = (state: IInputState, action: IActionTypes): IInputState => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_INPUT_LEVEL:
		case EActionTypes.INTERNAL_INPUT_LEVEL:
			return {
				...state,
				position: action.value * 100
			}
		case EActionTypes.EXTERNAL_INPUT_NAME:
			return {
				...state,
				name: action.name
			}
		case EActionTypes.EXTERNAL_INPUT_COLOR:
			return {
				...state,
				color: action.color
			}
		default:
			return state
	}
}