import { IInputsState } from "./inputs/InputsState";
import { IMainState } from "./main/MainState";
import { IOutputState } from "./output/OutputState";


export interface IState {
	output: IOutputState,
	main: IMainState,
	inputs: IInputsState
}