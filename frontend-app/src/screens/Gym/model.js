import { createAction, Storage } from '../../utils'
import NavigationService from '../../services/NavigationService'

const config = require('../../config')
const { MUSIC, MUSIC_NUM } = config

import scripts from './core_scripts'
let TOTAL = scripts.length

import { Speech } from 'expo'

function say(tts) {
    Speech.speak(tts, { language: 'en' })
}

const soundObject = new Expo.Audio.Sound()
let timer = null

async function playMusic() {
    try {
        let index = Math.ceil(Math.random() * MUSIC_NUM)
        await soundObject.loadAsync(MUSIC[index])
        await soundObject.playAsync()
    } catch (error) {
        console.log(error)
    }
}

async function stopMusic() {
    try {
        await soundObject.stopAsync()
        await soundObject.unloadAsync()
    } catch (error) {
        console.log(error)
    }
}

async function pauseMusic() {
    try {
        await soundObject.pauseAsync()
    } catch (error) {
        console.log(error)
    }
}
async function resumeMusic() {
    try {
        await soundObject.playAsync()
    } catch (error) {
        console.log(error)
    }
}

export default {
    namespace: 'gym',
    state: {
        isRunning: false,
        current: 0,
        image: null,
        title: null,
        countdown: null,
        progress: null,
    },
    effects: {
        *start(action, { call, put }) {
            let isRunning = true
            let current = 0
            yield put(createAction('updateState')({ isRunning, current }))
        },
        *pauseToggle(action, { call, put, select }) {
            const { isRunning } = yield select(state => state.gym)
            if (isRunning) {
                console.log('pause')
                yield call(pauseMusic)
            } else {
                console.log('resume')
                yield call(resumeMusic)
            }
            yield put(createAction('toggleRunning')(null))
        },
        *tick(action, { call, put, select }) {
            const { isRunning, current } = yield select(state => state.gym)
            if (!isRunning) return

            //console.log(`tick: ${current}`)
            if (current >= scripts.length) {
                let isRunning = false
                clearInterval(timer)

                yield put(createAction('updateState')({ isRunning }))
                NavigationService.navigate('End')
                return
            }

            let script = scripts[current]

            let next = current + 1
            let countdown = script.setCountdown
            let progress = ((current / TOTAL) * 100.0).toFixed(0) + '%'
            yield put(
                createAction('updateState')({
                    current: next,
                    countdown,
                    progress,
                })
            )

            if (script.setTitle) {
                let title = script.setTitle
                yield put(createAction('updateState')({ title }))
            }

            if (script.setImage) {
                let image = script.setImage
                yield put(createAction('updateState')({ image }))
            }

            if (script.say) {
                //console.log('say')
                yield call(say, script.say)
            }
            if (script.playMusic) {
                console.log('play')
                yield call(playMusic)
            }
            if (script.stopMusic) {
                console.log('stop')
                yield call(stopMusic)
            }
        },
    },
    subscriptions: {
        setup({ dispatch }) {
            console.log('gym model setup.')
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
        toggleRunning(state, { payload }) {
            return { ...state, isRunning: !state.isRunning }
        },
    },
}
