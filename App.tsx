import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Root from './navigation/Root';

// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

export default function App() {
  // if (authorizationStatus) {
  //   console.log('이 곳은 승인 상태일 때에만 타게 됩니다.')
  // }
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}