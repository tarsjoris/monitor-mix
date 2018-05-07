export interface IChannel {
	id: number,
	name: string,
	color: string
}

export interface IOutputState {
	channels: IChannel[],
	choice: number
}

export interface IState {
	output: IOutputState
}