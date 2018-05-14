import React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';
import { IFaderState } from "./FaderState";

interface IProps extends IFaderState {
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		padding: 10
	},
	label: {
		color: "#FFFFFF",
		borderColor: "#FFFFFF",
		borderStyle: "solid",
		borderWidth: 1,
		width: 40,
		height: 40,
		textAlign: "center"
	},
	slider: {
		width: 200,
		marginLeft: 10,
		marginRight: 10
	}
})



const Fader = (props: IProps) => (
	<View style={styles.view}>
		<Text style={styles.label}>{props.name}</Text>
		<Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={props.position} />
	</View>
)
export default Fader