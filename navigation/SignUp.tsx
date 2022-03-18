import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IDPW from './SignUpStack/IDPW';
import PhoneNumber from './SignUpStack/PhoneNumber';
import Address from './SignUpStack/Address';
import AccountNumber from './SignUpStack/AccountNumber';
import Success from './SignUpStack/Success';

export default function SignUp() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="IDPW"
    >
      <Stack.Screen
        name="IDPW"
        component={IDPW}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
      />
      <Stack.Screen
        name="Address"
        component={Address}
      />
      <Stack.Screen
        name="AccountNumber"
        component={AccountNumber}
      />
      <Stack.Screen
        name="Success"
        component={Success}
      />
    </Stack.Navigator>
  );
}
