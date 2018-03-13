import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Button, Switch } from 'react-native';
import { createAction, NavigationActions } from "../../utils";

class Save extends Component {
	static navigationOptions = {
		title: "Save"
	}

	saveGotoEnd = () => {
		this.props.dispatch(createAction("save/save")());
	};

	switchRunValueChange = (value) => {
		this.props.dispatch(createAction("save/updateState")({runEnabled:value}))
	};
	switchPullupValueChange = (value) => {
		this.props.dispatch(createAction("save/updateState")({pullupEnabled:value}))
	};
	switchPushupValueChange = (value) => {
		this.props.dispatch(createAction("save/updateState")({pushupEnabled:value}))
	};
	switchSitupValueChange = (value) => {
		this.props.dispatch(createAction("save/updateState")({situpEnabled:value}))
	};
	switchSquatValueChange = (value) => {
		this.props.dispatch(createAction("save/updateState")({squatEnabled:value}))
	};



	render() {
		return (
			<View style={styles.container}>
				<Text style={{fontSize:40,color:'#037aff'}}>Save Record</Text>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.text}>Run</Text>
					<Switch onValueChange={this.switchRunValueChange} value={this.props.runEnabled} />
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.text}>Pull-up</Text>
					<Switch onValueChange={this.switchPullupValueChange} value={this.props.pullupEnabled} />
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.text}>Push-up</Text>
					<Switch onValueChange={this.switchPushupValueChange} value={this.props.pushupEnabled} />
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.text}>Sit-up</Text>
					<Switch onValueChange={this.switchSitupValueChange} value={this.props.situpEnabled} />
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.text}>Squat</Text>
					<Switch onValueChange={this.switchSquatValueChange} value={this.props.squatEnabled} />
				</View>
				<Button title="Save" onPress={this.saveGotoEnd} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
		fontSize: 25,
		fontWeight: 'bold'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
	}
});

export default connect(({ save }) => ({ ...save }))(Save);