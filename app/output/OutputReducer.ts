import { EActionTypes, IActionTypes } from "../Actions";
import { OUTPUT_COUNT } from "../xr18api/XR18API";
import { IOutputState } from "./OutputState";

const initialState: IOutputState = {
	channels: [],
	choice: 1,
	level: 0
}
for (var i = 0; i < OUTPUT_COUNT; ++i) {
	initialState.channels.push({
		id: i + 1,
		name: "" + (i + 1),
		scribbleStyle: 0
	})
}

export const outputReducer = (state: IOutputState = initialState, action: IActionTypes): IOutputState => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_OUTPUT_LEVEL:
		case EActionTypes.INTERNAL_OUTPUT_LEVEL:
			return {
				...state,
				level: action.value
			}
		case EActionTypes.INTERNAL_OUTPUT_CHOICE:
			return {
				...state,
				choice: action.choice
			}
		default:
			return state
	}
}