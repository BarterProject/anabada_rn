import React from 'react';

import { Text, View } from 'react-native';

import styled from 'styled-components/native';

import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Main from './HomeStack/Main';
import Item from './Item';
import Configure from './Configure';
import ItemDetail from './HomeStack/ItemDetail';
import Request from './HomeStack/Request';
import ItemDeals from './ItemDeals';
import Report from './HomeStack/Report';
import ItemRequestDetail from './HomeStack/ItemRequestDetail';
import ItemReceiveDetail from './HomeStack/ItemReceiveDetail';

import { initialStateProps, setNoticeAlarm } from '../slice';

const Stack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

const Badge = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #e94057;
  justify-content: center;
  align-items: center;
`;
type AlarmStackParamList = {
  Main: undefined,
}

export type RootStackParamList = {
  Main: undefined;
  Item: undefined;
  Alarm: NavigatorScreenParams<AlarmStackParamList>
  ItemDetail: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function Home({ navigation }: HomeScreenProps) {
  const {
    noticeAlarm,
  } = useSelector(
    (state: initialStateProps) => ({
      noticeAlarm: state.noticeAlarm,
    }),
  );
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerBackTitleVisible: false,
        title: ' clip ',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#E94057',
          fontFamily: 'HarlowSolidItalic',
          fontSize: 30,
        },
        headerRight: () => (
          <Btn
            onPress={() => {
              navigation.navigate('Alarm', { screen: 'Main' });
              if (noticeAlarm) {
                dispatch(setNoticeAlarm(false));
              }
            }}
          >
            <Text>
              <View>
                <Icon size={30} name="notifications" />
                {noticeAlarm ? (
                  <Badge style={{ position: 'absolute', top: -3, left: 15 }} />
                ) : null}
              </View>
            </Text>
          </Btn>
        ),
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Configure"
        component={Configure}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="ItemDeals"
        component={ItemDeals}
      />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Item"
        component={Item}
      />
      <Stack.Screen name="ItemRequestDetail" component={ItemRequestDetail} />
      <Stack.Screen name="ItemReceiveDetail" component={ItemReceiveDetail} />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          //   headerShown: false,
          headerTitle: '문의하기',
        }}
      />

    </Stack.Navigator >
  );
}
