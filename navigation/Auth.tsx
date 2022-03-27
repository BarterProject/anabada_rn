import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './AuthStack/Main';
import SignIn from './AuthStack/SignIn';

import SignUp from './SignUp';

export type AuthStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  PhoneAuth:{
    phoneNumber:string
  };
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
    </Stack.Navigator>
  );
}
