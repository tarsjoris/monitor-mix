import { IColor } from "../../IColor";

export interface IFaderState extends IColor {
	id: number,
	name: string,
	position: number
}