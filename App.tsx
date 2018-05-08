import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ChooseMix from './app/ChooseMix';
import { chooseMixReducer } from './app/ChooseMixReducer';
import { outputReducer } from './app/output/OutputReducer';

const reducers = combineReducers({
	chooseMix: chooseMixReducer,
	output: outputReducer
})

const store = createStore(reducers)

class App extends React.Component {
	render() {
		return <Provider store={store}>
			<ChooseMix />
		</Provider>
	}
}
export default App