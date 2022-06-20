import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import {
  Dimensions, Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import DropShadow from 'react-native-drop-shadow';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import messaging from '@react-native-firebase/messaging';
import MyItem from './Stack/MyItem';
import Inventory from './Stack/Inventory';
import { TextFontAramL } from '../../Font';

const Container = styled.View`
  flex: 1;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  width: 85px;
  height: 85px;
  right: 30px;
  bottom: 50px;
  border-radius: 80px;
`;

const BtnInstance = styled.View`
  width: 100%;
  height: 100%;
  background-color: #e94057;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
`;

const ButtonText = styled(TextFontAramL)`
  color: white;
  font-size: 18;
  font-weight: 600;

`

function Main() {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [initialRoute, setInitialRoute] = useState<'인벤토리' |
    '아이템'>('인벤토리');
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage): any => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log('HI guys안뇽 여긴 아이템스택 메인이야1');
      // console.log('remoteMessage.data.route', remoteMessage.data.route)
      // navigation.navigate(remoteMessage.data.route);
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // if (remoteMessage.notification.android.channelId === "ItemActivated") {
          console.log('HI guys안뇽 여긴 아이템스택 메인이야2', remoteMessage.data.route);
          // console.log('remoteMessage.data.route', remoteMessage.data.route)
          setInitialRoute('아이템'); // e.g. "Settings"
          // }
        }
        // setLoading(false);
      });
  });

  return (
    <Container>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: '210AramGothicL',
          },
          tabBarIndicatorStyle: {
            height: 5, borderRadius: 20, width: Dimensions.get('window').width / 4, left: Dimensions.get('window').width / 8, backgroundColor: '#e94057',
          },
        }}
        initialRouteName={'인벤토리'}
      >
        <Tab.Screen
          name="인벤토리"
          component={Inventory}
          initialParams={{
            getNewData: false,
          }}
        // options={{ headerShown: true }}
        />
        <Tab.Screen
          name="아이템"
          component={MyItem}
        // options={{ title: '오더 목록' }}
        />

      </Tab.Navigator>

      <Btn
        onPress={() => {
          navigation.navigate('Enroll');
        }}
      >
        <DropShadow
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <BtnInstance>
            <ButtonText>
              등록하기
            </ButtonText>
          </BtnInstance>
        </DropShadow>
      </Btn>
    </Container>
  );
}

export default Main;
