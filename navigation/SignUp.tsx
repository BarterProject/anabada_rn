import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IDPW from './SignUpStack/IDPW';
import PhoneNumber from './SignUpStack/PhoneNumber';
import Address from './SignUpStack/Address';
import AccountNumber from './SignUpStack/AccountNumber';
import Success from './SignUpStack/Success';
import PhoneAuth from './SignUpStack/PhoneAuth';
import SearchAddress from './SignUpStack/SearchAddress';

export default function SignUp() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="IDPW"
      screenOptions={{
        // headerShown:false,
        // headerTitle:'회원가입',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="IDPW"
        component={IDPW}
        options={{
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={{
          headerTitle: '휴대폰 번호 인증',
        }}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerTitle: '주소',
        }}
      />
      <Stack.Screen
        name="SearchAddress"
        component={SearchAddress}
      />
      <Stack.Screen
        name="AccountNumber"
        component={AccountNumber}
        options={{
          headerTitle: '계좌번호',
        }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
      />
    </Stack.Navigator>
  );
}
