import { Container } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { Store, applyMiddleware, combineReducers, createStore } from 'redux';
import { Epic, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import { IActionTypes } from './app/Actions';
import { demo } from './app/Demo';
import { IState } from './app/IState';
import { wiringEpic } from './app/Wiring';
import { inputsReducer } from './app/inputs/InputsReducer';
import Main from './app/main/Main';
import { mainReducer } from './app/main/MainReducer';
import { outputReducer } from './app/output/OutputReducer';
import { XR18API } from './app/xr18api/XR18API';
import { IOSCMessage } from './app/xr18api/osc';

const rootReducer = combineReducers<IState>({
	main: mainReducer,
	output: outputReducer,
	inputs: inputsReducer
})

const eventsStream = new Rx.Subject<IOSCMessage>()

const xr18API = new XR18API(eventsStream, '192.168.0.2', 1)

const rootEpic: Epic<IActionTypes, IState> = wiringEpic(
	eventsStream,
	xr18API,
	() => store.getState().output.choice
)
const epicMiddleware = createEpicMiddleware(rootEpic)
const store: Store<IState> = createStore(
	rootReducer,
	applyMiddleware(epicMiddleware)
)

const styles = StyleSheet.create({
	main: {
		backgroundColor: "#444444"
	}
})

class App extends React.Component {
	render() {
		return (
			<Container style={styles.main}>
				<Provider store={store}>
					<Main xr18API={xr18API} />
				</Provider>
			</Container>
		)
	}
}
export default App

demo(eventsStream)