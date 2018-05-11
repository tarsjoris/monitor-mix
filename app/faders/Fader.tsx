import React from 'react';
import { Slider, Text, View } from 'react-native';
import { IFader } from "../IState";

interface IProps extends IFader {
}

const Fader = (props: IProps) => (
	<View
		style={{
			flexDirection: 'row',
			padding: 10,
		}}>
		<Text>{props.name}</Text>
		<Slider style={{ width: '100%', marginLeft: 10 }} minimumValue={0} maximumValue={100} step={1} value={props.position} />
	</View>
)
export default Fader