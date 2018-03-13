import { createAction, NavigationActions, Storage } from "../../utils";
import { saveRecord } from "../../services/record";
import { ScreenOrientation } from 'expo';

export default {
	namespace: "save",
	state: {
		runEnabled: false,
		pullupEnabled: false,
		pushupEnabled: false,
		situpEnabled: false,
		squatEnabled: false,
	},
	effects: {
		*save(action, { call, put, select }){
		    const record = yield select(state => state.save)
			yield saveRecord(record)
			yield put(
				NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: "End" })
					]
				})
			)
		}
	},
	subscriptions: {
		setup({ dispatch }) {
			console.log("save.")
		}
	},
	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		}
	},
}
