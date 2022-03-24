import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './AuthStack/Main';
import SignIn from './AuthStack/SignIn';

import PhoneAuth from './AuthStack/PhoneAuth';

import SignUp from './SignUp';

type AuthStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  PhoneAuth:undefined;
  SearchAddress:undefined;
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
        options={{
          headerTitle: '휴대폰 인증',
          title: '휴대폰 인증',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
