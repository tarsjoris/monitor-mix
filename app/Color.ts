import { StyleSheet } from 'react-native';


export interface IColor {
	scribbleStyle: number
}

export const scribbleStyles = [
	StyleSheet.create({
		background: {
			backgroundColor: "#000000"
		},
		border: {
			borderColor: "#FFFFFF",
			borderStyle: "solid",
			borderWidth: StyleSheet.hairlineWidth
		},
		color: {
			color: "#FFFFFF"
		}
	})
]