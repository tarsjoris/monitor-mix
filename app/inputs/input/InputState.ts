import { IColor } from "../../Color";

export interface IInputState extends IColor {
	id: number,
	name: string,
	position: number
}