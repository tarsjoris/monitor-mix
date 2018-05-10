declare module 'react-native-udp' {
	type SocketType = "udp4" | "udp6";

	export interface IRemoteInfo {
		address: string;
		family: string;
		port: number;
	}

	export function createSocket(type: SocketType, callback?: (msg: Buffer, rinfo: IRemoteInfo) => void): Socket;

	export interface IAddressInfo {
		address: string;
		family: string;
		port: number;
	}

	export class Socket {
		bind(callback?: () => void): void;
		send(msg: Buffer | String | any[] | Uint8Array, offset: number, length: number, port: number, address: string, callback?: (error: Error | null) => void): void;
		on(event: "close", listener: () => void): this;
		on(event: "error", listener: (err: Error) => void): this;
		on(event: "listening", listener: () => void): this;
		on(event: "message", listener: (msg: Buffer, rinfo: IAddressInfo) => void): this;
		close(callback?: () => void): void;
	}
}