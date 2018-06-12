import { Epic, combineEpics } from 'redux-observable';
import Rx from 'rxjs';
import { EActionTypes, IActionTypes } from './Actions';
import { IState } from './IState';
import { createExternalInputColor, createExternalInputLevel, createExternalInputName } from './inputs/input/InputActions';
import { createExternalOutputColor, createExternalOutputLevel, createExternalOutputName } from './output/OutputActions';
import { AUX_CHANNEL, XR18API, pad } from "./xr18api/XR18API";
import { IOSCMessage } from "./xr18api/osc";

export type OutputChoiceSupplier = () => number

const processExternalChannelInputLevelChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => {
			const output = outputChoiceSupplier()
			return new RegExp("\/ch\/[0-9]{2}\/mix\/" + pad(output, 2) + "\/level").test(message.address)
		})
		.map(message => ({
			vars: /\/ch\/([0-9]{2})\/mix\/[0-9]{2}\/level/.exec(message.address),
			message
		}))
		.map(obj => createExternalInputLevel(
			obj.vars != null ? Number(obj.vars[1]) : 0,
			Number(obj.message.args[0].value)
		))

const processExternalChannelInputNameChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => /\/ch\/[0-9]{2}\/config\/name/.test(message.address))
		.map(message => ({
			vars: /\/ch\/([0-9]{2})\/config\/name/.exec(message.address),
			message
		}))
		.map(obj => createExternalInputName(
			obj.vars != null ? Number(obj.vars[1]) : 0,
			obj.message.args[0].value
		))

const processExternalChannelInputColorChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => /\/ch\/[0-9]{2}\/config\/color/.test(message.address))
		.map(message => ({
			vars: /\/ch\/([0-9]{2})\/config\/color/.exec(message.address),
			message
		}))
		.map(obj => createExternalInputColor(
			obj.vars != null ? Number(obj.vars[1]) : 0,
			Number(obj.message.args[0].value)
		))

const processExternalAuxInputLevelChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => {
			const output = outputChoiceSupplier()
			return new RegExp("\/rtn\/aux\/mix\/" + pad(output, 2) + "\/level").test(message.address)
		})
		.map(message => createExternalInputLevel(
			AUX_CHANNEL,
			Number(message.args[0].value)
		))

const processExternalAuxInputNameChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => /\/rtn\/aux\/config\/name/.test(message.address))
		.map(message => createExternalInputName(
			AUX_CHANNEL,
			message.args[0].value
		))

const processExternalAuxInputColorChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => /\/rtn\/aux\/config\/color/.test(message.address))
		.map(message => createExternalInputColor(
			AUX_CHANNEL,
			Number(message.args[0].value)
		))


const processExternalOutputLevelChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>, outputChoiceSupplier: OutputChoiceSupplier): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => {
			const output = outputChoiceSupplier()
			return new RegExp("\/bus\/" + output + "\/mix/input").test(message.address)
		})
		.map(message => createExternalOutputLevel(
			Number(message.args[0].value)
		))

const processExternalOutputNameChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => /\/bus\/[0-9]\/config\/name/.test(message.address))
		.map(message => ({
			vars: /\/bus\/([0-9])\/config\/name/.exec(message.address),
			message
		}))
		.map(obj => createExternalOutputName(
			obj.vars != null ? Number(obj.vars[1]) : 0,
			obj.message.args[0].value
		))

const processExternalOutputColorChangeEvents = (eventsStream$: Rx.Observable<IOSCMessage>): Epic<IActionTypes, IState> =>
	action$ => eventsStream$
		.filter(message => /\/bus\/[0-9]\/config\/color/.test(message.address))
		.map(message => ({
			vars: /\/bus\/([0-9])\/config\/color/.exec(message.address),
			message
		}))
		.map(obj => createExternalOutputColor(
			obj.vars != null ? Number(obj.vars[1]) : 0,
			Number(obj.message.args[0].value)
		))

const processInternalRefreshParametersEvents = (xr18API: XR18API): Epic<IActionTypes, IState> =>
	action$ => action$
		.filter(action => {
			if (action.type === EActionTypes.INTERNAL_REFRESH_PARAMETERS) {
				xr18API.refreshParameters()
			}
			return false
		})

const sendExternalInputLevelEvents = (xr18API: XR18API): Epic<IActionTypes, IState> =>
	action$ => action$
		.filter(action => {
			if (action.type === EActionTypes.INTERNAL_INPUT_LEVEL) {
				xr18API.setChannelLevel(action.input, action.value)
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
		processExternalChannelInputLevelChangeEvents(eventsStream$, outputChoiceSupplier),
		processExternalChannelInputNameChangeEvents(eventsStream$),
		processExternalChannelInputColorChangeEvents(eventsStream$),
		processExternalAuxInputLevelChangeEvents(eventsStream$, outputChoiceSupplier),
		processExternalAuxInputNameChangeEvents(eventsStream$),
		processExternalAuxInputColorChangeEvents(eventsStream$),
		processExternalOutputLevelChangeEvents(eventsStream$, outputChoiceSupplier),
		processExternalOutputNameChangeEvents(eventsStream$),
		processExternalOutputColorChangeEvents(eventsStream$),
		processInternalRefreshParametersEvents(xr18API),
		sendExternalInputLevelEvents(xr18API),
		sendExternalOutputLevelEvents(xr18API),
		processInternalOutputChoiceEvents(xr18API)
	)