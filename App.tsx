import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import ChooseMix from './app/ChooseMix';
import { channelReducer } from './app/channel/ChannelReducer';

const reducers = combineReducers({
	channel: channelReducer
})

const store = createStore(reducers)

export default class App extends React.Component {
	render() {
		return (
		<Provider store={store}>
			<ChooseMix />
		</Provider>
		)
	}
}