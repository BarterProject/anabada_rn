import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './Auth';
import Home from './Home';

const Nav = createNativeStackNavigator();

function Root() {
  return (
    <Nav.Navigator
      initialRouteName="Auth"
    >
      <Nav.Screen
        name="Auth"
        component={Auth}
      />
      <Nav.Screen
        name="Home"
        component={Home}
      />
    </Nav.Navigator>
  );
}

export default Root;
