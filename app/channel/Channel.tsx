import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import IState from '../IState'

interface IProps {
	channel: number
}

const ChannelBase = ({ channel }: IProps) => <Text>{channel}</Text>
const mapStateToProps = (state: IState): IProps => state
const Channel = connect(mapStateToProps)(ChannelBase)
export default Channel