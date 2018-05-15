import { Socket, createSocket } from 'react-native-udp';
import Rx from 'rxjs';
import { IArg, IOSCBundle, IOSCMessage, readPacket, writePacket } from './osc';

const REMOTE_PORT = 10024
export const OUTPUT_COUNT = 6
export const CHANNEL_COUNT = 17;
export const AUX_CHANNEL = 17;

export interface IAPIResult {

}

export class XR18API {
	socket?: Socket = undefined
	observer: Rx.Observer<IOSCMessage>
	host: string
	output: number

	constructor(observer: Rx.Observer<IOSCMessage>, host: string, output: number) {
		this.observer = observer
		this.host = host
		this.output = output
	}

	setHost = (host: string) => {
		this.host = host
	}

	makeConnection = () => {
		this.closeConnection()
		const socket = createSocket("udp4")
		socket.on("message", (msg, rinfo) => this.onPacket(readPacket(msg, { metadata: true })))
		socket.on('error', (err) => {
			console.log(`server error:\n${err.stack}`)
			this.closeConnection()
		});
		socket.bind()
		this.socket = socket;

		this.fetchConfigs()
		this.fetchLevels()
	}

	closeConnection = () => {
		if (this.socket !== undefined) {
			this.socket.close
			this.socket = undefined
		}
	}

	fetchConfigs = () => {
		for (var i = 0; i < OUTPUT_COUNT; ++i) {
			this.fetchOutputConfig(i + 1)
		}
		for (var i = 0; i < CHANNEL_COUNT; ++i) {
			this.fetchChannelConfig(i + 1)
		}
	}

	private fetchOutputConfig = (output: number) =>
		this.fetchConfig('/bus/' + output)

	private fetchChannelConfig = (channel: number) =>
		this.fetchConfig(this.getChannelPrefix(channel))

	private fetchConfig = (prefix: string) => {
		this.send(prefix + '/config/name')
		this.send(prefix + '/config/color')
	}

	changeOutput = (output: number) => {
		this.output = output
		this.fetchLevels()
	}

	private fetchLevels = () => {
		for (var i = 0; i < CHANNEL_COUNT; ++i) {
			this.fetchChannelLevel(i + 1)
		}
		this.fetchOutputLevel()
	}

	private fetchChannelLevel = (channel: number) =>
		this.send(this.getChannelLevelAddress(channel))

	setChannelLevel = (channel: number, level: number) =>
		this.send(
			this.getChannelLevelAddress(channel),
			[{ type: 'f', value: level }]
		)

	private getChannelLevelAddress = (channel: number) =>
		this.getChannelPrefix(channel) + '/mix/' + pad(this.output, 2) + '/level'

	private getChannelPrefix = (channel: number) => {
		switch (channel) {
			case AUX_CHANNEL:
				return '/rtn/aux'
			default:
				return '/ch/' + pad(channel, 2)
		}
	}

	setOutputLevel = (level: number) =>
		this.send(
			this.getOutputLevelAddress(),
			[{ type: 'f', value: level }]
		)

	private fetchOutputLevel = () =>
		this.send(this.getOutputLevelAddress())

	private getOutputLevelAddress = () =>
		this.getOutputPrefix() + '/mix/input'

	private getOutputPrefix = () => '/bus/' + this.output

	private send = (address: string, args: IArg[] = []) => {
		if (this.socket == undefined) {
			return
		}
		const msg = writePacket(
			{
				address: address,
				args: args
			},
			{
				metadata: true
			}
		)
		this.socket.send(msg, 0, msg.length, REMOTE_PORT, this.host)
	}

	private onPacket = (packet: IOSCMessage | IOSCBundle) => {
		if ('address' in packet) {
			this.observer.next(packet)
		}
		else {
			packet.packets.forEach(this.onPacket)
		}
	}
}

export const pad = (number: number, size: number) => {
	let padder = ''
	for (let i = 0; i < size; ++i) {
		padder += '0'
	}
	const s = '' + number
	return padder.substring(0, size - s.length) + s
}