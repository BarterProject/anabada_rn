import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigatorScreenParams } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Auth, { AuthStackParamList } from './Auth';
import Home from './Home';
import Alarm from './Alarm';
import Item from './Item';

import useSocket from '../hooks/useSocket';
import { initialStateProps } from '../slice';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: undefined;
  Alarm: undefined;
  Item:undefined;
};

const Nav = createNativeStackNavigator<RootStackParamList>();

function Root() {
  const [socket, disconnect] = useSocket();
  const {
    accessToken: isLoggedIn,
  } = useSelector(
    (state:initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );

  useEffect(() => {
    if (socket && isLoggedIn) {
      socket.on('connect', () => {
        console.log('socket connected');
      });
      socket.on('notice', (what) => { console.log(what); });
      socket.on('message', (what) => { console.log(what); });
    }
    return () => {
      socket?.off('order', (what) => { console.log(what); });
      socket?.off('connect', () => {
        console.log('socket connected');
      });
      socket?.off('message', (what) => { console.log(what); });
      // 특정 이벤트에 대한 리스너 제거
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
    }
  }, [isLoggedIn, disconnect]);
  return (
    <Nav.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Auth" component={Auth} />
      <Nav.Screen name="Home" component={Home} />
      <Nav.Screen name="Alarm" component={Alarm} />
      <Nav.Screen name="Item" component={Item} />
    </Nav.Navigator>
  );
}

export default Root;
