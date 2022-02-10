import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import Authentication from './Authentication';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../containers/HomeContainer';
import Signup from '../containers/SignupContainer';
import Areas from '../containers/AreasContainer';
import Settings from '../containers/SettingsContainer';

const store = createStore(rootReducer);
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="/signin">
            <Stack.Screen
              name="/signin"
              component={Authentication}
              options={{title: "Sign in", headerTitleAlign: "center"}}
            />
            <Stack.Screen
              name="/home"
              component={Home}
              options={{title: "Home", headerTitleAlign: "center"}}
            />
            <Stack.Screen
              name="/signup"
              component={Signup}
              options={{title: "Signup", headerTitleAlign: "center"}}
            />
            <Stack.Screen
              name="/services"
              component={Areas}
              options={{title: "Services", headerTitleAlign: "center"}}

            />
            <Stack.Screen
              name="/settings"
              component={Settings}
              options={{title: "Settings", headerTitleAlign: "center"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}