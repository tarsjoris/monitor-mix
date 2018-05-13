import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { IState } from '../IState';
import { IFadersState } from './FadersState';
import Fader from './fader/Fader';

interface IProps extends IFadersState {
}

const FadersBase = (props: IProps) => (
	<ScrollView>
		{props.faders.map((fader) => <Fader key={fader.id} {...fader} />)}
	</ScrollView>
)
const mapStateToProps = (state: IState): IProps => state.faders
const Faders = connect(mapStateToProps)(FadersBase)
export default Faders