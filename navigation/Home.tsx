import React from 'react';

import { Text, View } from 'react-native';

import styled from 'styled-components/native';

import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { NavigatorScreenParams } from '@react-navigation/native';
import Main from './HomeStack/Main';
import Item from './Item';

const Stack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

type AlarmStackParamList={
  Main:undefined,
}

type RootStackParamList = {
  Main: undefined;
  Item: undefined;
  Alarm: NavigatorScreenParams<AlarmStackParamList>
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function Home({ navigation }:HomeScreenProps) {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerBackTitleVisible: false,
        title: '',
        headerRight: () => (
          <Btn
            onPress={() => {
              navigation.navigate('Alarm', { screen: 'Main' });
            }}
          >
            <Text>
              <View>
                <Ionicons size={30} name="notifications" />
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
      <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
  );
}
