import { EActionTypes, IActionTypes } from "../Actions";
import { OUTPUT_COUNT } from "../xr18api/XR18API";
import { IOutputChannel, IOutputState } from "./OutputState";

const initialState: IOutputState = {
	channels: [],
	choice: 1,
	level: 0
}
for (var i = 0; i < OUTPUT_COUNT; ++i) {
	initialState.channels.push({
		id: i + 1,
		name: "" + (i + 1),
		color: 0
	})
}

const outputChannelReducer = (state: IOutputChannel, action: IActionTypes): IOutputChannel => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_OUTPUT_NAME:
			return {
				...state,
				name: action.name
			}
		case EActionTypes.EXTERNAL_OUTPUT_COLOR:
			return {
				...state,
				color: action.color
			}
		default:
			return state
	}
}

export const outputReducer = (state: IOutputState = initialState, action: IActionTypes): IOutputState => {
	switch (action.type) {
		case EActionTypes.EXTERNAL_OUTPUT_LEVEL:
			return {
				...state,
				level: action.value
			}
		case EActionTypes.EXTERNAL_OUTPUT_NAME:
		case EActionTypes.EXTERNAL_OUTPUT_COLOR:
			return {
				...state,
				channels: state.channels.map(channel =>
					(channel.id === action.channel) ? outputChannelReducer(channel, action) : channel
				)
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