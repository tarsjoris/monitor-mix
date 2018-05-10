import { IFadersState } from '../IState';

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

export const fadersReducer = (state: IFadersState = initialState, action: string): IFadersState => {
	return state;
}