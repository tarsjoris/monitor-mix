declare module 'react-native-udp' {
	import dgram from 'dgram';

	export function createSocket(type: dgram.SocketType, callback?: (msg: Buffer, rinfo: dgram.RemoteInfo) => void): Socket;

	export class Socket {
		send(msg: Buffer | String | any[] | Uint8Array, offset: number, length: number, port: number, address: string, callback?: (error: Error | null, bytes: number) => void): void;
	}
}