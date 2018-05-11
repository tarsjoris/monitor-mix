import { IFadersState } from '../IState';

export const ACTION_FADER_CHANGED = "FADER_CHANGED"

export interface IFaderAction {
	type: string,
	fader: number,
	value: number
}

const initialState: IFadersState = {
	faders: []
}
for (var i = 0; i < 16; ++i) {
	initialState.faders.push({
		id: i + 1,
		name: "" + (i + 1),
		fgcolor: "#FF0000",
		bgcolor: "#000000",
		position: 0
	})
}

export const fadersReducer = (state: IFadersState = initialState, action: IFaderAction): IFadersState => {
	switch (action.type) {
		case ACTION_FADER_CHANGED:
			const faders = state.faders.slice();
			faders[action.fader - 1] = {
				...faders[action.fader - 1],
				position: action.value * 100
			}
			return {
				...state,
				faders
			}
		default:
			return state
	}
}