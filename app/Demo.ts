import Rx from 'rx';
import { IOSCMessage } from './xr18api/osc';


export const demo = (eventsStream: Rx.IObserver<IOSCMessage>) => {
	const a = () => {
		console.log("Sending event a")
		eventsStream.onNext({
			address: '/ch/03/mix/01/level',
			args: [{
				type: 'f',
				value: 0.3
			}]
		})
		setTimeout(b, 5000)
	}
	const b = () => {
		console.log("Sending event b")
		eventsStream.onNext({
			address: '/ch/03/mix/01/level',
			args: [{
				type: 'f',
				value: 0.9
			}]
		})
		setTimeout(a, 5000)
	}
	setTimeout(a, 1000)
}