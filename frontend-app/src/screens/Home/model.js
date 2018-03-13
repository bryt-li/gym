import { createAction, NavigationActions, Storage } from "../../utils";
import { Speech, ScreenOrientation } from 'expo';

const config = require('../../config');
const { WARMUP_COUNTDOWN } = config


function say(tts){
	Speech.speak(tts,{language: "en"})
}


let timer = null;

export default {
	namespace: "home",
	state: {
		countdown:WARMUP_COUNTDOWN,
	},
	effects: {
		*tick(action, { call, put, select }){
		    const { countdown } = yield select(state => state.home)		    

		    let update = countdown-1;
		    if(update>=1 && update<=10){
		    	say(update.toString());
		    }

			yield put(createAction("updateState")({ countdown: update }))

		    //console.log(`tick: ${current}`)
		    if(update<=0){
				clearInterval(timer);

				ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
				yield put(
					NavigationActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: "Save" })
						]
					})
				)
				yield put(createAction("gym/start")());
		    } 
		}
	},
	subscriptions: {
		setup({ dispatch }) {
			console.log("countdown start.")
			let timerfunc = () => {
				dispatch({ type: "tick" });
			}
			timer = setInterval(timerfunc, 1000);
		}
	},
	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		}
	},
}
