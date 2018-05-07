import { IOutputState } from '../IState'

const initialState: IOutputState = {
	channels: [
		{
			id: 1,
			name: "Tars",
			color: "#FF0000"
		},
		{
			id: 3,
			name: "Kyra",
			color: "#0000FF"
		},
		{
			id: 4,
			name: "Lex",
			color: "#00FF00"
		},
		{
			id: 5,
			name: "Pieter",
			color: "#00FF00"
		},
		{
			id: 6,
			name: "Dries",
			color: "#00FF00"
		}
	],
	choice: 1
}
export const outputReducer = (state: IOutputState = initialState, action: string) => {
	return state;
}