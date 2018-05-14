import { IColor } from "../Color";

export interface IOutputChannel extends IColor {
	id: number,
	name: string
}

export interface IOutputState {
	channels: IOutputChannel[],
	choice: number,
	level: number
}
