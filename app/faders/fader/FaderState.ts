import { IColor } from "../../Color";

export interface IFaderState extends IColor {
	id: number,
	name: string,
	position: number
}