import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import ChooseMix from './app/ChooseMix';
import { outputReducer } from './app/output/OutputReducer';
import  Expo  from 'expo';

const reducers = combineReducers({
	output: outputReducer
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

	async componentWillMount() {
		await Expo.Font.loadAsync({
		  'Roboto': require('native-base/Fonts/Roboto.ttf'),
		  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});
	}
}