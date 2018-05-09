import { Socket, createSocket } from 'react-native-udp';
import { writePacket } from './osc';

const PORT = 10024

export const connect = () => {
	return createSocket("udp4")
}

export const setChannelLevel = (socket: Socket, channel: number, output: number, level: number) => {
	const msg = writePacket(
		{
			address: '/ch/' + pad(channel, 2) + '/mix/' + pad(output, 2) + '/level',
			args: [
				{
					type: 'f',
					value: level
				}
			]
		},
		{
			metadata: true
		}
	)
	socket.send(msg, 0, msg.length, PORT, '192.168.0.2');
}

const pad = (number: number, size: number) => {
	let padder = ''
	for (let i = 0; i < size; ++i) {
		padder += '0'
	}
	const s = '' + number
	return padder.substring(0, size - s.length) + s
}