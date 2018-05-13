import { EActionTypes, IActionTypes } from '../Actions';
import { CHANNEL_COUNT } from '../xr18api/XR18API';
import { IFadersState } from './FadersState';


const initialState: IFadersState = {
	faders: []
}
for (var i = 0; i < CHANNEL_COUNT; ++i) {
	initialState.faders.push({
		id: i + 1,
		name: "" + (i + 1),
		fgcolor: "#FF0000",
		bgcolor: "#000000",
		position: 0
	})
}

export const fadersReducer = (state: IFadersState = initialState, action: IActionTypes): IFadersState => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_FADER_LEVEL:
		case EActionTypes.INTERNAL_FADER_LEVEL:
			const faders = state.faders.map(value =>
				(value.id === action.fader) ?
					{
						...value,
						position: action.value * 100
					} :
					value
			)
			return {
				...state,
				faders
			}
		default:
			return state
	}
}