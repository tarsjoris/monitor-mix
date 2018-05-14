import { EActionTypes, IActionTypes } from '../../Actions';
import { IFaderState } from './FaderState';


export const faderReducer = (state: IFaderState, action: IActionTypes): IFaderState => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_FADER_LEVEL:
		case EActionTypes.INTERNAL_FADER_LEVEL:
			return {
				...state,
				position: action.value * 100
			}
		default:
			return state
	}
}