import Rx from 'rxjs';
import { IOSCMessage } from './xr18api/osc';


export const demo = (eventsStream: Rx.Observer<IOSCMessage>) => {
	const a = () => {
		console.log("Sending event a")
		eventsStream.next({
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
		eventsStream.next({
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