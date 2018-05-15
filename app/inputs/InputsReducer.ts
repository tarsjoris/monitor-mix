import { EActionTypes, IActionTypes } from '../Actions';
import { CHANNEL_COUNT } from '../xr18api/XR18API';
import { IInputsState } from './InputsState';
import { inputReducer } from './input/InputReducer';


const initialState: IInputsState = {
	inputs: []
}
for (var i = 0; i < CHANNEL_COUNT; ++i) {
	initialState.inputs.push({
		id: i + 1,
		name: "" + (i + 1),
		color: 0,
		position: 0
	})
}

export const inputsReducer = (state: IInputsState = initialState, action: IActionTypes): IInputsState => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_INPUT_LEVEL:
		case EActionTypes.INTERNAL_INPUT_LEVEL:
		case EActionTypes.EXTERNAL_INPUT_NAME:
		case EActionTypes.EXTERNAL_INPUT_COLOR:
			const inputs = state.inputs.map(value =>
				(value.id === action.input) ? inputReducer(value, action) : value
			)
			return {
				...state,
				inputs
			}
		default:
			return state
	}
}