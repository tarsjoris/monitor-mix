import { Epic, combineEpics } from 'redux-observable';
import Rx from 'rxjs';
import { EActionTypes, IActionTypes } from './Actions';
import { IState } from './IState';
import { createExternalFaderLevel } from './faders/fader/FaderActions';
import { createExternalOutputLevel } from './output/OutputActions';
import { CHANNEL_COUNT, XR18API, pad } from "./xr18api/XR18API";
import { IOSCMessage } from "./xr18api/osc";

export type OutputChoiceSupplier = () => number

const processExternalChannelFaderLevelChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => {
			const output = outputChoiceSupplier()
			return new RegExp("\/ch\/[0-9]{2}\/mix\/" + pad(output, 2) + "\/level").test(message.address)
		})
		.map(message => ({
			vars: /\/ch\/([0-9]{2})\/mix\/[0-9]{2}\/level/.exec(message.address),
			message
		}))
		.map(obj => createExternalFaderLevel(
			obj.vars != null ? Number(obj.vars[1]) : 0,
			Number(obj.message.args[0].value)
		))

const processExternalAuxFaderLevelChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => {
			const output = outputChoiceSupplier()
			return new RegExp("\/rtn\/aux\/mix\/" + pad(output, 2) + "\/level").test(message.address)
		})
		.map(message => createExternalFaderLevel(
			CHANNEL_COUNT,
			Number(message.args[0].value)
		))

const processExternalOutputLevelChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => {
			const output = outputChoiceSupplier()
			return new RegExp("\/bus\/" + output + "\/mix/fader").test(message.address)
		})
		.map(message => createExternalOutputLevel(
			Number(message.args[0].value)
		))

const sendExternalFaderLevelEvents = (xr18API: XR18API): Epic<IActionTypes, IState> =>
	action$ => action$
		.filter(action => {
			if (action.type === EActionTypes.INTERNAL_FADER_LEVEL) {
				xr18API.setChannelLevel(action.fader, action.value)
			}
			return false
		})

const sendExternalOutputLevelEvents = (xr18API: XR18API): Epic<IActionTypes, IState> =>
	action$ => action$
		.filter(action => {
			if (action.type === EActionTypes.INTERNAL_OUTPUT_LEVEL) {
				xr18API.setOutputLevel(action.value)
			}
			return false
		})

const processInternalOutputChoiceEvents = (xr18API: XR18API): Epic<IActionTypes, IState> =>
	action$ => action$
		.filter(action => {
			if (action.type === EActionTypes.INTERNAL_OUTPUT_CHOICE) {
				xr18API.changeOutput(action.choice)
			}
			return false
		})

export const wiringEpic = (eventsStream$: Rx.Observable<IOSCMessage>, xr18API: XR18API, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	combineEpics(
		processExternalChannelFaderLevelChangeEvents(eventsStream$, outputChoiceSupplier),
		processExternalAuxFaderLevelChangeEvents(eventsStream$, outputChoiceSupplier),
		processExternalOutputLevelChangeEvents(eventsStream$, outputChoiceSupplier),
		sendExternalFaderLevelEvents(xr18API),
		sendExternalOutputLevelEvents(xr18API),
		processInternalOutputChoiceEvents(xr18API)
	)