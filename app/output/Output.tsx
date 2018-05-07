import React from 'react';
import { Title } from 'native-base';
import { connect } from 'react-redux';
import { IState, IOutputState } from '../IState'

interface IProps extends IOutputState {
}

const ChannelBase = (props: IProps) => {
	const name = props.channels.filter(ch => ch.id === props.choice)[0].name
	return <Title>{name}</Title>
}
const mapStateToProps = (state: IState): IProps => state.output
const Channel = connect(mapStateToProps)(ChannelBase)
export default Channel