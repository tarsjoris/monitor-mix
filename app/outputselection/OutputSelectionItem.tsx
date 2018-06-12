import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scribbleStyles } from "../Color";
import { IOutputChannel } from "../output/OutputState";

const styles = StyleSheet.create({
	labelView: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40
	},
	label: {
		fontSize: 8
	}
})

interface IProps {
	channel: IOutputChannel,
	select: () => any
}

export class OutputSelectionItem extends React.Component<IProps> {
	render() {
		const scribbleStyle = scribbleStyles[this.props.channel.color]
		return <View style={StyleSheet.flatten([styles.labelView, scribbleStyle.background, scribbleStyle.border])}>
			<Text style={StyleSheet.flatten([styles.label, scribbleStyle.text])}>{this.props.channel.name}</Text>
		</View>
	}
}
