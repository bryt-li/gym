import React, { PureComponent } from 'react'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { ScreenOrientation } from 'expo'

import NavigationService from './services/NavigationService'

import Loading from './containers/Loading'

import Home from './screens/Home'
import Gym from './screens/Gym'
import Save from './screens/Save'
import End from './screens/End'

const AppNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        Gym: { screen: Gym },
        Save: { screen: Save },
        End: { screen: End },
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
    }
)

class Router extends PureComponent {
    componentWillMount() {
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE)
    }

    componentWillUnmount() {}

    render() {
        const { dispatch, app } = this.props
        if (app.loading) return <Loading />
        return (
            <AppNavigator
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            />
        )
    }
}

const mapStateToProps = ({ app, router }) => ({ app, router })

export default connect(mapStateToProps)(Router)
