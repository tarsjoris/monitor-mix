import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IState } from '../IState';
import { IInputsState } from './InputsState';
import Input from './input/Input';

interface IProps extends IInputsState {
}

const InputsBase = (props: IProps) => (
	<ScrollView>
		{props.inputs.map((input) => <Input key={input.id} {...input} />)}
	</ScrollView>
)
const mapStateToProps = (state: IState): IProps => state.inputs
const Inputs = connect(mapStateToProps)(InputsBase)
export default Inputs