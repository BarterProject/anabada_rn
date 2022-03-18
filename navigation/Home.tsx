import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './HomeStack/Main';

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        title: '',

        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}
