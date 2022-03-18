import React from 'react';


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
