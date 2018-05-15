import Rx from 'rxjs';
import { pad } from './xr18api/XR18API';
import { IOSCMessage } from './xr18api/osc';


export const demo = (eventsStream: Rx.Observer<IOSCMessage>) => {
	const sendEvent = (event: IOSCMessage) => {
		console.log('Simulate event')
		console.log(event)
		eventsStream.next(event);
	}
	sendEvent({
		address: '/bus/1/config/name',
		args: [{
			type: 's',
			value: 'Monitor Tars'
		}]
	})
	sendEvent({
		address: '/ch/01/config/name',
		args: [{
			type: 's',
			value: 'BD'
		}]
	})
	const generateEvent = () => {
		const eventType = Math.floor(Math.random() * 4)
		switch (eventType) {
			case 0: {
				const channel = Math.floor((Math.random() * 16) + 1)
				sendEvent({
					address: '/ch/' + pad(channel, 2) + '/mix/01/level',
					args: [{
						type: 'f',
						value: Math.random()
					}]
				})
				break
			}
			case 1: {
				const channel = Math.floor((Math.random() * 16) + 1)
				sendEvent({
					address: '/ch/' + pad(channel, 2) + '/config/color',
					args: [{
						type: 'i',
						value: Math.floor(Math.random() * 16)
					}]
				})
				break
			}
			case 2: {
				sendEvent({
					address: '/bus/1/mix/input',
					args: [{
						type: 'f',
						value: Math.random()
					}]
				})
				break
			}
			case 3: {
				sendEvent({
					address: '/bus/1/config/color',
					args: [{
						type: 'i',
						value: Math.floor(Math.random() * 16)
					}]
				})
				break
			}
		}
		setTimeout(generateEvent, 500);
	}
	setTimeout(generateEvent, 500);
}