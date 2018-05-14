import React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';
import { scribbleStyles } from '../../Color';
import { IFaderState } from "./FaderState";

interface IProps extends IFaderState {
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	label: {
		flex: 0,
		borderStyle: "solid",
		borderWidth: StyleSheet.hairlineWidth,
		width: 40,
		height: 40,
		textAlign: "center"
	},
	slider: {
		flex: 1,
		marginLeft: 10
	}
})



const Fader = (props: IProps) => {
	const scribbleStyle = scribbleStyles[props.scribbleStyle]
	return (
		<View style={styles.view}>
			<Text style={StyleSheet.flatten([styles.label, scribbleStyle.background, scribbleStyle.border, scribbleStyle.color])}>{props.name}</Text>
			<Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={props.position} />
		</View>
	)
}
export default Fader