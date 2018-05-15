import { Title } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { scribbleStyles } from '../Color';
import { IState } from '../IState';
import { IOutputState } from './OutputState';

interface IProps extends IOutputState {
}

const OutputBase = ({ channels, choice }: IProps) => {
	const channel = channels.filter(ch => ch.id === choice)[0]
	const name = channel.name
	return <Title style={scribbleStyles[channel.color].text}>{name}</Title>
}
const mapStateToProps = (state: IState): IProps => state.output
const Output = connect(mapStateToProps)(OutputBase)
export default Output