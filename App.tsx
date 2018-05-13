import React from 'react';
import { Provider } from 'react-redux';
import { Store, applyMiddleware, combineReducers, createStore } from 'redux';
import { Epic, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import { IActionTypes } from './app/Actions';
import { demo } from './app/Demo';
import { IState } from './app/IState';
import { wiringEpic } from './app/Wiring';
import { fadersReducer } from './app/faders/FadersReducer';
import Main from './app/main/Main';
import { mainReducer } from './app/main/MainReducer';
import { outputReducer } from './app/output/OutputReducer';
import { XR18API } from './app/xr18api/XR18API';
import { IOSCMessage } from './app/xr18api/osc';

const rootReducer = combineReducers<IState>({
	main: mainReducer,
	output: outputReducer,
	faders: fadersReducer
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

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		)
	}
}
export default App

demo(eventsStream)