export interface IOSCMessage {
	address: string,
	args: any[]
}

export interface IOSCTimeTag {
	raw: number[],
	native: any
}

export interface IOSCBundle {
	timeTag: IOSCTimeTag,
	packets: IOSCMessage | IOSCBundle[]
}

export function readPacket(
	data: Uint8Array,
	options: any,
	offsetState: any,
	len: any
): IOSCMessage | IOSCBundle

export function writePacket(
	packet: IOSCMessage,
	options: any
): Uint8Array