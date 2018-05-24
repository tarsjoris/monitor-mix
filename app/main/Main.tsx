import { Body, Button, Container, Header, Icon, Right } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { IActionTypes } from '../Actions';
import { scribbleStyles } from '../Color';
import OutputSelection from '../outputselection/OutputSelection';
import { XR18API } from '../xr18api/XR18API';
import Inputs from './../inputs/Inputs';
import { IState } from './../IState';
import Output from './../output/Output';
import { createRefreshParameters } from './MainActions';

interface IProps {
	xr18API: XR18API,
	outputColor: number,
	refreshParameters: () => any
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20
	},
	header: {
		backgroundColor: '#777777'
	},
	body: {
		padding: 5
	}
})

class MainBase extends React.Component<IProps> {
	async componentDidMount() {
		this.props.xr18API.makeConnection()
	}

	render() {
		const scribbles = scribbleStyles[this.props.outputColor]
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Body style={StyleSheet.flatten([styles.body, scribbles.background, scribbles.border])}>
						<Output />
					</Body>
					<Right>
						<Button transparent onPress={this.props.refreshParameters}>
							<Icon name="settings" />
						</Button>
					</Right>
				</Header>
				<OutputSelection />
				<Inputs />
			</Container>
		)
	}
}
const mapStateToProps = (state: IState) => {
	const channel = state.output.channels.filter(ch => ch.id === state.output.choice)[0]
	return {
		outputColor: channel.color
	}
}
const mapDispatchToProps = (dispatch: Dispatch<IActionTypes>) => ({
	refreshParameters: () => dispatch(createRefreshParameters())
})
const Main = connect(mapStateToProps, mapDispatchToProps)(MainBase)
export default Main