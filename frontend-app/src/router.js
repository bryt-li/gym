import React, { PureComponent } from "react";
import { BackHandler, Animated, Easing } from "react-native";
import {
	StackNavigator,
	TabNavigator,
	TabBarBottom,
	addNavigationHelpers,
	NavigationActions
} from "react-navigation";
import { connect } from "react-redux";
import { ScreenOrientation } from 'expo';

import Loading from './containers/Loading'

import Home from "./screens/Home"
import Gym from "./screens/Gym"
import Save from "./screens/Save"
import End from "./screens/End"


const AppNavigator = StackNavigator(
	{
		Home: { screen: Home },
		Gym: { screen: Gym },
		Save: { screen: Save },
		End: { screen: End },
	},
	{
		headerMode: "none",
		mode: "modal",
		navigationOptions: {
			gesturesEnabled: false
		}
	}
);

function getCurrentScreen(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	if (route.routes) {
		return getCurrentScreen(route);
	}
	return route.routeName;
}

class Router extends PureComponent {
	componentWillMount() {
		ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
		BackHandler.addEventListener("hardwareBackPress", this.backHandle);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.backHandle);
	}

	backHandle = () => {
		const currentScreen = getCurrentScreen(this.props.router);
		if (currentScreen === "Login") {
			return true;
		}
		if (currentScreen !== "Home") {
			this.props.dispatch(NavigationActions.back());
			return true;
		}
		return false;
	};

	render() {
		const { dispatch, app, router } = this.props;
		if (app.loading)
			return <Loading />
		const navigation = addNavigationHelpers({ dispatch, state: router });
		return <AppNavigator navigation={navigation} />;
	}
}

export function routerReducer(state, action = {}) {
	return AppNavigator.router.getStateForAction(action, state);
}

const mapStateToProps = ({ app, router }) => ({ app, router });

export default connect(mapStateToProps)(Router);