import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    ImageBackground,
    ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'

import { createAction, NavigationActions } from '../../utils'
import { KeepAwake } from 'expo'

class Gym extends Component {
    componentWillMount() {}

    static navigationOptions = {
        title: 'Gym',
    }

    gotoPortal = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Portal' }))
    }
    pauseToggle = () => {
        this.props.dispatch(createAction('gym/pauseToggle')())
    }

    render() {
        const { isRunning, image, title, countdown, progress } = this.props

        return (
            <ImageBackground source={image} style={styles.background}>
                <View style={styles.container}>
                    <KeepAwake />
                    <Button
                        onPress={this.pauseToggle}
                        title={isRunning ? 'Pause' : 'Play'}
                    />
                    <Text style={styles.labelTitle}>{title}</Text>
                    <Text style={styles.labelCountdown}>{countdown}</Text>
                    <Text style={styles.labelProgress}>{progress}</Text>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    labelTitle: {
        fontSize: 45,
        color: '#037aff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    labelCountdown: {
        fontSize: 80,
        color: '#037aff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    labelProgress: {
        fontSize: 40,
        color: '#037aff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
})

export default connect(({ gym }) => ({ ...gym }))(Gym)
