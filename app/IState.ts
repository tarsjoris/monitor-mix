export interface IColor {
	fgcolor: string,
	bgcolor: string
}

export interface IChooseMixState {
	isReady: boolean
}

export interface IOutputChannel extends IColor {
	id: number,
	name: string
}

export interface IOutputState {
	channels: IOutputChannel[],
	choice: number
}

export interface IFader extends IColor {
	id: number,
	name: string,
	position: number
}

export interface IFadersState {
	faders: IFader[]
}

export interface IState {
	output: IOutputState,
	chooseMix: IChooseMixState,
	faders: IFadersState
}