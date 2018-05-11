import { Store } from "redux";
import { IState } from "./IState";
import { ACTION_FADER_CHANGED } from "./faders/FadersReducer";
import { pad } from "./xr18api/XR18API";
import { IOSCMessage } from "./xr18api/osc";

export const generateActions = (eventsStream: Rx.Observable<IOSCMessage>, store: Store<IState>) => {
	eventsStream
		.filter(message => {
			const output = store.getState().output.choice;
			return new RegExp("\/ch\/[0-9]{2}\/mix\/" + pad(output, 2) + "\/level").test(message.address)
		})
		.subscribe(message => {
			const vars = /\/ch\/([0-9]{2})\/mix\/[0-9]{2}\/level/.exec(message.address)
			if (vars !== null) {
				store.dispatch({
					type: ACTION_FADER_CHANGED,
					fader: Number(vars[1]),
					value: Number(message.args[0].value)
				})
			}
		})
}