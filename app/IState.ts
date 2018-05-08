export interface IChooseMix {
	isReady: boolean
}

export interface IOutputChannel {
	id: number,
	name: string,
	color: string
}

export interface IOutputState {
	channels: IOutputChannel[],
	choice: number
}

export interface IState {
	output: IOutputState,
	chooseMix: IChooseMix
}