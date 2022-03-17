import React from 'react';

import { Text, View } from 'react-native';

import styled from 'styled-components/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { Badge } from 'react-native-elements';
import Main from './HomeStack/Main';

const Stack = createNativeStackNavigator();

const Btn = styled.TouchableOpacity``;

export default function Home() {
  const navigation = useNavigation();

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

                <Badge
                  status="error"
                  value={10}
                  containerStyle={{ position: 'absolute', top: -5, left: 15 }}
                />
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
    </Stack.Navigator>
  );
}
