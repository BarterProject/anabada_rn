import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppInfo from './ConfigureStack/AppInfo';
import Main from './ConfigureStack/Main';
import MyInfo from './ConfigureStack/Myinfo';
import QnAs from './ConfigureStack/QnAs';
import QnAForm from './ConfigureStack/QnAForm';
import QnADetail from './ConfigureStack/QnADetail';

export type ConfigureStackParamList = {
  Main: undefined;
  MyInfo: undefined;
  Appinfo: undefined;
  QnAs: undefined
  QnAForm: undefined
  Report: undefined;
};

const Stack = createNativeStackNavigator<ConfigureStackParamList>();

const HomeButtton = styled.TouchableOpacity``;

export default function Configure({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: '210AramGothicL'
        },
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        headerTintColor: '#E94057',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerLeft: () => (
            <HomeButtton
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon size={30} name="chevron-back-outline" />
            </HomeButtton>
          ),
          //   headerShown: false,
          headerTitle: '설정',
        }}
      />
      <Stack.Screen
        name="MyInfo"
        options={{
          //   headerShown: false,
          headerTitle: '내 정보',

        }}
        component={MyInfo}
      />
      <Stack.Screen
        name="QnAs"
        options={{
          // headerShown: false,
          headerTitle: 'QnA',

        }}
        component={QnAs}
      />
      <Stack.Screen
        name="QnAForm"
        options={{
          // headerShown: false,
          headerTitle: 'QnA',

        }}
        component={QnAForm}
      />
      <Stack.Screen
        name="QnADetail"
        options={{
          // headerShown: false,
          headerTitle: 'QnA',

        }}
        component={QnADetail}
      />
      <Stack.Screen
        name="Appinfo"
        component={AppInfo}
        options={{
          //   headerShown: false,
          headerTitle: '앱 정보',

        }}
      />
    </Stack.Navigator >
  );
}
