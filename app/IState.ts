import { IFadersState } from "./faders/FadersState";
import { IMainState } from "./main/MainState";
import { IOutputState } from "./output/OutputState";


export interface IState {
	output: IOutputState,
	main: IMainState,
	faders: IFadersState
}