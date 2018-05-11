import { Socket, createSocket } from 'react-native-udp';
import { IArg, readPacket, writePacket } from './osc';

const REMOTE_PORT = 10024

export const makeConnection = (host: string) => {
	const socket = createSocket("udp4")
	socket.on("message", function (msg, rinfo) {
		console.log(readPacket(msg, { metadata: true }))
	})
	socket.on('error', (err) => {
		console.log(`server error:\n${err.stack}`)
		socket.close()
	});
	socket.bind()
	return socket
}

export const setChannelLevel = (socket: Socket, channel: number, output: number, level: number) => {
	send(socket,
		'/ch/' + pad(channel, 2) + '/mix/' + pad(output, 2) + '/level',
		[{ type: 'f', value: level }]
	);
}

const send = (socket: Socket, address: string, args: IArg[] = []) => {
	const msg = writePacket(
		{
			address: address,
			args: args
		},
		{
			metadata: true
		}
	)
	socket.send(msg, 0, msg.length, REMOTE_PORT, '192.168.0.2')
}

export const pad = (number: number, size: number) => {
	let padder = ''
	for (let i = 0; i < size; ++i) {
		padder += '0'
	}
	const s = '' + number
	return padder.substring(0, size - s.length) + s
}