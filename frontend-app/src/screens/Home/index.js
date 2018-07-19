import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { createAction, NavigationActions } from "../../utils";
import { KeepAwake,ScreenOrientation } from 'expo';
import { Button } from 'react-native';

var TVEventHandler = require('TVEventHandler');

class Home extends Component {

	static navigationOptions = {
		title: "Home"
	}

	gotoGym = () => {
		ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
		this.props.dispatch(
			NavigationActions.navigate({ routeName: "Gym" })
		);
		this.props.dispatch(createAction("gym/start")());
	};

	_enableTVEventHandler() {
	    this._tvEventHandler = new TVEventHandler();
	    this._tvEventHandler.enable(this, function(cmp, evt) {
	    	console.log(evt.eventType);
			if(evt && evt.eventType === 'playPause') {
	        	cmp.gotoGym();
	    	}
	    });
  	}

	_disableTVEventHandler() {
	    if (this._tvEventHandler) {
		    this._tvEventHandler.disable();
		    delete this._tvEventHandler;
	    }
  	}

  	componentDidMount() {
		this._enableTVEventHandler();
  	}

  	componentWillUnmount() {
    	this._disableTVEventHandler();
  	}

	render() {
		const {countdown} = this.props

		return (
			<View style={styles.container}>
				<KeepAwake />
				<Text style={styles.labelCountdown}>{countdown}</Text>
				<Button title="Start Now!" onPress={this.gotoGym} style={styles.btn} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
	},
	btn: {
	    
	},
    labelCountdown: {
	    fontSize: 80,
	    color: '#037aff',
        alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'transparent',
    },
});

export default connect(({ home }) => ({ ...home }))(Home);