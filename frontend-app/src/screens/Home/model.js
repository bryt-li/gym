import { createAction, Storage } from '../../utils'
import { Speech, ScreenOrientation } from 'expo'
import NavigationService from '../../services/NavigationService'

const config = require('../../config')
const { WARMUP_COUNTDOWN } = config

function say(tts) {
    Speech.speak(tts, { language: 'en' })
}

let timer = null

export default {
    namespace: 'home',
    state: {
        countdown: WARMUP_COUNTDOWN,
    },
    effects: {
        *start(action, { call, put, select }) {
            yield put(createAction('updateState')({ countdown: 0 }))
        },

        *tick(action, { call, put, select }) {
            const { countdown } = yield select(state => state.home)

            let update = countdown - 1
            if (update >= 1 && update <= 10) {
                say(update.toString())
            }

            yield put(createAction('updateState')({ countdown: update }))

            //console.log(`tick: ${current}`)
            if (update <= 0) {
                clearInterval(timer)

                ScreenOrientation.allowAsync(
                    ScreenOrientation.Orientation.LANDSCAPE
                )

                NavigationService.navigate('Gym')

                yield put(createAction('gym/start')())
            }
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            console.log('countdown start.')
            let timerfunc = () => {
                dispatch({ type: 'tick' })
            }
            timer = setInterval(timerfunc, 1000)
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
    },
}
