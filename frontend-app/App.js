import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import dva from './src/utils/dva'

import Router from './src/router'

import appModel from './src/models/app'

import homeModel from './src/screens/Home/model'
import gymModel from './src/screens/Gym/model'
import saveModel from './src/screens/Save/model'
import endModel from './src/screens/End/model'

const app = dva({
    initialState: {},
    models: [appModel, homeModel, gymModel, saveModel, endModel],
    onError(e) {
        console.log('onError', e)
    },
})

const App = app.start(<Router />)
console.log('app started.')

export default App
