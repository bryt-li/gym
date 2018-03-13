import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { Button } from 'react-native';
import { createAction, NavigationActions } from "../../utils";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const squat = {key:'squat', color: 'red'};
const pullup = {key:'pullup', color: 'yellow'};
const pushup = {key:'pushup', color: 'green'};
const situp = {key:'situp', color: 'cyan'};
const run = {key:'run', color: 'blue'};

class End extends Component {
	static navigationOptions = {
		title: "End"
	}

	gotoHome = () => {
		this.props.dispatch(
			NavigationActions.navigate({ routeName: "Home" })
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<Button title="Home" onPress={this.gotoHome} />
				<Calendar style={{flex: 1}} firstDay={1} 
				markedDates={{
					'2018-02-24': {selected: true},
				    '2018-02-25': {dots: [squat], selected: true},
				    '2018-02-26': {dots: [squat, pullup,pushup,situp,run], selected: true},
				}}
				markingType={'multi-dot'}
  				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
        justifyContent: 'space-between'
	}
});

export default connect()(End);