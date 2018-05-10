import { IOutputState } from '../IState';

const initialState: IOutputState = {
	channels: [
		{
			id: 1,
			name: "1",
			fgcolor: "#FF0000",
			bgcolor: "#000000"
		},
		{
			id: 2,
			name: "2",
			fgcolor: "#FF0000",
			bgcolor: "#000000"
		},
		{
			id: 3,
			name: "3",
			fgcolor: "#FF0000",
			bgcolor: "#000000"
		},
		{
			id: 4,
			name: "4",
			fgcolor: "#FF0000",
			bgcolor: "#000000"
		},
		{
			id: 5,
			name: "5",
			fgcolor: "#FF0000",
			bgcolor: "#000000"
		},
		{
			id: 6,
			name: "6",
			fgcolor: "#FF0000",
			bgcolor: "#000000"
		}
	],
	choice: 1
}
export const outputReducer = (state: IOutputState = initialState, action: string): IOutputState => {
	return state;
}