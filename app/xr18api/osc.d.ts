export interface IArg {
	type: string,
	value: any
}

export interface IOSCMessage {
	address: string,
	args: IArg[]
}

export interface IOSCTimeTag {
	raw: number[],
	native: any
}

export interface IOSCBundle {
	timeTag: IOSCTimeTag,
	packets: (IOSCMessage | IOSCBundle)[]
}

export interface IOptions {
	metadata: boolean
}

export function readPacket(
	data: Buffer,
	options?: IOptions
): IOSCMessage | IOSCBundle

export function writePacket(
	packet: IOSCMessage,
	options: IOptions
): Uint8Array