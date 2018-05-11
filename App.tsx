import React from 'react';
import { Provider } from 'react-redux';
import { Store, combineReducers, createStore } from 'redux';
import Rx from 'rx';
import { demo } from './app/Demo';
import { IState } from './app/IState';
import Main from './app/Main';
import { mainReducer } from './app/MainReducer';
import { generateActions } from './app/Wiring';
import { fadersReducer } from './app/faders/FadersReducer';
import { outputReducer } from './app/output/OutputReducer';
import { IOSCMessage } from './app/xr18api/osc';

const reducers = combineReducers({
	main: mainReducer,
	output: outputReducer,
	faders: fadersReducer
})

const store: Store<IState> = createStore(reducers)

const eventsStream = new Rx.Subject<IOSCMessage>()

generateActions(eventsStream, store)

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