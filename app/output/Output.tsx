import { Title } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { IState } from '../IState';
import { IOutputState } from './OutputState';

interface IProps extends IOutputState {
}

const styles = StyleSheet.create({
	title: {
		color: "#FFFFFF"
	}
})

const OutputBase = ({ channels, choice }: IProps) => {
	const name = channels.filter(ch => ch.id === choice)[0].name
	return <Title style={styles.title}>{name}</Title>
}
const mapStateToProps = (state: IState): IProps => state.output
const Output = connect(mapStateToProps)(OutputBase)
export default Output