import { AppLoading, Constants, Font } from 'expo';
import { Body, Button, Container, Header, Icon, Right, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { ACTION_LOADING_DONE, ILoadingAction } from './ChooseMixReducer';
import { IState } from './IState';
import Output from './output/Output';
import { makeConnection } from './xr18api/XR18API';

interface IProps {
	isReady: boolean,
	loadingDone: () => any
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight
	}
})

class ChooseMixBase extends React.Component<IProps> {
	async loadAssetsAsync() {
		makeConnection()
		await Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		})
	}

	render() {
		if (this.props.isReady) {
			return <Container style={styles.container}>
				<Header>
					<Body>
						<Output />
					</Body>
					<Right>
						<Button transparent>
							<Icon name="settings" />
						</Button>
					</Right>
				</Header>
				<Text>hello</Text>
			</Container>
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
const mapStateToProps = (state: IState) => ({ isReady: state.chooseMix.isReady })
const mapDispatchToProps = (dispatch: Dispatch<ILoadingAction>) => ({
	loadingDone: () => dispatch({ type: ACTION_LOADING_DONE })
})
const ChooseMix = connect(mapStateToProps, mapDispatchToProps)(ChooseMixBase)
export default ChooseMix