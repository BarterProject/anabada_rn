import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './AuthStack/Main';
import SignIn from './AuthStack/SignIn';
import SignUp from './AuthStack/SignUp';

type AuthStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        headerTintColor: '#E94057',
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
        options={{
          headerTitle: '회원가입',
          title: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
