import React from 'react';

import styled from 'styled-components/native';

import {
  Dimensions, Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import DropShadow from 'react-native-drop-shadow';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyItem from './Stack/MyItem';
import Inventory from './Stack/Inventory';

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

function Main() {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Container>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16 },
          tabBarIndicatorStyle: {
            height: 5, borderRadius: 20, width: Dimensions.get('window').width / 4, left: Dimensions.get('window').width / 8, backgroundColor: '#e94057',
          },
        }}
      // initialRouteName="아이템"
      >
        <Tab.Screen
          name="인벤토리"
          component={Inventory}
          initialParams={{
            getNewData: false,
          }}
        // options={{ headerShown: false }}
        />
        <Tab.Screen
          name="아이템"
          component={MyItem}
        // options={{ title: '오더 목록' }}
        />

      </Tab.Navigator>

      <Btn
        onPress={() => {
          navigation.navigate('Item', { screen: 'Enroll' });
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
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              등록하기
            </Text>
          </BtnInstance>
        </DropShadow>
      </Btn>
    </Container>
  );
}

export default Main;
