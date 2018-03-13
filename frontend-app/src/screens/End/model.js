import { createAction, NavigationActions, Storage } from "../../utils";

import { ScreenOrientation } from 'expo';

const config = require('../../config');

/*
	dots = []
	if(record.runEnabled)
		dots.push('run');
	if(record.pullupEnabled)
		dots.push('pullup');
	if(record.pushupEnabled)
		dots.push('pushup');
	if(record.situpEnabled)
		dots.push('situp');
	if(record.squatEnabled)
		dots.push('squat');
*/

export default {
	namespace: "end",
	state: {
	},
	effects: {
		
	},
	subscriptions: {
		setup({ dispatch }) {
			console.log("end.")
		}
	},
	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		}
	},
}
