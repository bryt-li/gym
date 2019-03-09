import React, { PureComponent } from 'react'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { ScreenOrientation, AppLoading, Asset, Font, Icon } from 'expo'

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

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image)
        } else {
            return Asset.fromModule(image).downloadAsync()
        }
    })
}

class Router extends PureComponent {
    state = {
        isReady: false,
    }

    componentWillMount() {
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE)
    }

    componentWillUnmount() {}

    render() {
        const { dispatch, app } = this.props
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            )
        }

        if (app.loading) return <Loading />
        return (
            <AppNavigator
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            />
        )
    }

    async _loadAssetsAsync() {
        console.log('loading resources')

        const imageAssets = cacheImages([
            require('../assets/blank.png'),
            require('../assets/core/1.gif'),
            require('../assets/core/2.gif'),
            require('../assets/core/3.gif'),
            require('../assets/core/4.gif'),
            require('../assets/core/5.gif'),
            require('../assets/core/6.gif'),
            require('../assets/core/7.gif'),
            require('../assets/core/8.gif'),
            require('../assets/core/9.gif'),
            require('../assets/music/1.mp3'),
            require('../assets/music/2.mp3'),
            require('../assets/music/3.mp3'),
            require('../assets/music/4.mp3'),
            require('../assets/music/5.mp3'),
            require('../assets/music/6.mp3'),
            require('../assets/music/7.mp3'),
            require('../assets/music/8.mp3'),
            require('../assets/music/9.mp3'),
            require('../assets/music/10.mp3'),
            require('../assets/music/11.mp3'),
            require('../assets/music/12.mp3'),
            require('../assets/music/13.mp3'),
            require('../assets/music/14.mp3'),
            require('../assets/music/15.mp3'),
            require('../assets/music/16.mp3'),
            require('../assets/music/17.mp3'),
            require('../assets/music/18.mp3'),
            require('../assets/music/19.mp3'),
            require('../assets/music/20.mp3'),
            require('../assets/music/21.mp3'),
            require('../assets/music/22.mp3'),
            require('../assets/music/23.mp3'),
            require('../assets/music/24.mp3'),
            require('../assets/music/25.mp3'),
            require('../assets/music/26.mp3'),
            require('../assets/music/27.mp3'),
            require('../assets/music/28.mp3'),
            require('../assets/music/29.mp3'),
            require('../assets/music/30.mp3'),
            require('../assets/music/31.mp3'),
            require('../assets/music/32.mp3'),
            require('../assets/music/33.mp3'),
            require('../assets/music/34.mp3'),
            require('../assets/music/35.mp3'),
            require('../assets/music/36.mp3'),
            require('../assets/music/37.mp3'),
            require('../assets/music/38.mp3'),
            require('../assets/music/39.mp3'),
            require('../assets/music/40.mp3'),
            require('../assets/music/41.mp3'),
            require('../assets/music/42.mp3'),
            require('../assets/music/43.mp3'),
            require('../assets/music/44.mp3'),
            require('../assets/music/45.mp3'),
            require('../assets/music/46.mp3'),
            require('../assets/music/47.mp3'),
            require('../assets/music/48.mp3'),
            require('../assets/music/49.mp3'),
            require('../assets/music/50.mp3'),
            require('../assets/music/51.mp3'),
            require('../assets/music/52.mp3'),
            require('../assets/music/53.mp3'),
            require('../assets/music/54.mp3'),
        ])
        await Promise.all([...imageAssets])
    }
}

const mapStateToProps = ({ app, router }) => ({ app, router })

export default connect(mapStateToProps)(Router)
