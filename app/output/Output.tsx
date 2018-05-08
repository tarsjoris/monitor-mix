import { Title } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { IOutputState, IState } from '../IState';

interface IProps extends IOutputState {
}

const OutputBase = ({ channels, choice }: IProps) => {
	const name = channels.filter(ch => ch.id === choice)[0].name
	return <Title>{name}</Title>
}
const mapStateToProps = (state: IState): IProps => state.output
const Output = connect(mapStateToProps)(OutputBase)
export default Output