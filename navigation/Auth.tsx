import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './AuthStack/Main';
import SignIn from './AuthStack/SignIn';
import SignUp from './AuthStack/SignUp';

const Stack = createNativeStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        headerTintColor: '#689633',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
}
