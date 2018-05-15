import { AppLoading, Constants, Font } from 'expo';
import { Body, Button, Container, Header, Icon, Right } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { IActionTypes } from '../Actions';
import { scribbleStyles } from '../Color';
import { IState } from './../IState';
import Inputs from './../inputs/Inputs';
import Output from './../output/Output';
import { createLoadingDone } from './MainActions';

interface IProps {
	isReady: boolean,
	outputColor: number,
	loadingDone: () => any
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
	async loadAssetsAsync() {
		//makeConnection("192.168.0.2")
		await Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		})
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
							<Button transparent>
								<Icon name="settings" />
							</Button>
						</Right>
					</Header>
					<Inputs />
				</Container>
			)
		}
		else {
			return <AppLoading
				startAsync={this.loadAssetsAsync}
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
	loadingDone: () => dispatch(createLoadingDone())
})
const Main = connect(mapStateToProps, mapDispatchToProps)(MainBase)
export default Main