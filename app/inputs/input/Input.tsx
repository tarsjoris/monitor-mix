import React from 'react';
import { Slider, StyleSheet, Text, View } from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { IActionTypes } from '../../Actions';
import { scribbleStyles } from '../../Color';
import { createInternalInputLevel } from './InputActions';
import { IInputState } from './InputState';

interface IProps extends IInputState {
	sliderChanged: (position: number) => any
}

const styles = StyleSheet.create({
	view: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5
	},
	labelView: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40
	},
	label: {
		fontSize: 8
	},
	slider: {
		flex: 1,
		marginLeft: 5
	}
})



const InputBase = (props: IProps) => {
	const scribbleStyle = scribbleStyles[props.color]
	return (
		<View style={styles.view}>
			<View style={StyleSheet.flatten([styles.labelView, scribbleStyle.background, scribbleStyle.border])}>
				<Text style={StyleSheet.flatten([styles.label, scribbleStyle.text])}>{props.name}</Text>
			</View>
			<Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={props.position * 100} onValueChange={props.sliderChanged} />
		</View>
	)
}
const mapDispatchToProps = (dispatch: Dispatch<IActionTypes>, props: IInputState) => ({
	sliderChanged: (position: number) => dispatch(createInternalInputLevel(props.id, position / 100))
})
const Input = connect(null, mapDispatchToProps)(InputBase)
export default Input