import { AppLoading, Constants, Font } from 'expo';
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
import { createLoadingDone, createRefreshParameters } from './MainActions';

interface IProps {
	isReady: boolean,
	xr18API: XR18API,
	outputColor: number,
	loadingDone: () => any,
	refreshParameters: () => any
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight
	},
	header: {
		backgroundColor: '#777777'
	},
	body: {
		padding: 5
	}
})

class MainBase extends React.Component<IProps> {
	async loadAssetsAsync(xr18API: XR18API) {
		await Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		})
		xr18API.makeConnection()
	}

	render() {
		if (this.props.isReady) {
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
		else {
			return <AppLoading
				startAsync={() => this.loadAssetsAsync(this.props.xr18API)}
				onFinish={() => this.props.loadingDone()}
				onError={console.warn}
			/>

		}
	}
}
const mapStateToProps = (state: IState) => {
	const channel = state.output.channels.filter(ch => ch.id === state.output.choice)[0]
	return {
		isReady: state.main.isReady,
		outputColor: channel.color
	}
}
const mapDispatchToProps = (dispatch: Dispatch<IActionTypes>) => ({
	loadingDone: () => dispatch(createLoadingDone()),
	refreshParameters: () => dispatch(createRefreshParameters())
})
const Main = connect(mapStateToProps, mapDispatchToProps)(MainBase)
export default Main