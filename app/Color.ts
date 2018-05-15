import { StyleSheet } from 'react-native';


export interface IColor {
	color: number
}

const createStyle = (backgroundColor: string, borderColor: string, color: string) =>
	StyleSheet.create({
		background: {
			backgroundColor
		},
		border: {
			borderColor,
			borderStyle: "solid",
			borderWidth: StyleSheet.hairlineWidth
		},
		text: {
			color
		}
	})

export const scribbleStyles = [
	createStyle("#000000", '#FFFFFF', '#FFFFFF'), // black
	createStyle("#FF0000", '#FF0000', '#000000'), // red
	createStyle("#00FF00", '#00FF00', '#000000'), // green
	createStyle("#FFFF00", '#FFFF00', '#000000'), // yellow
	createStyle("#0000FF", '#0000FF', '#000000'), // blue
	createStyle("#FF00FF", '#FF00FF', '#000000'), // magenta
	createStyle("#00FFFF", '#00FFFF', '#000000'), // cyan
	createStyle("#FFFFFF", '#FFFFFF', '#000000'), // white
	createStyle("#000000", '#FFFFFF', '#FFFFFF'), // black
	createStyle("#000000", '#FF0000', '#FF0000'), // red inv
	createStyle("#000000", '#00FF00', '#00FF00'), // green inv
	createStyle("#000000", '#FFFF00', '#FFFF00'), // yellow inv
	createStyle("#000000", '#0000FF', '#0000FF'), // blue inv
	createStyle("#000000", '#FF00FF', '#FF00FF'), // magenta inv
	createStyle("#000000", '#00FFFF', '#00FFFF'), // cyan inv
	createStyle("#000000", '#FFFFFF', '#FFFFFF'), // white inv
]