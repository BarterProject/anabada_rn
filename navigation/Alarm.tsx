import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import Main from './AlarmStack/Main';

const Stack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

function Alarm() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        title: '',
        headerLeft: () => (
          <Btn
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>
              <Icon size={30} name="close-outline" />
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
    </Stack.Navigator>
  );
}

export default Alarm;
