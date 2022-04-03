import React from 'react';

import { Text, View } from 'react-native';

import styled from 'styled-components/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import Main from './ItemStack/Main';
import ItemDetail from './ItemStack/ItemDetail';
import Enroll from './ItemStack/Enroll';
import ItemHistory from './ItemStack/ItemHistory';

const Stack = createNativeStackNavigator();

const Badge = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #e94057;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.TouchableOpacity``;

export default function Item() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
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
                <Badge style={{ position: 'absolute', top: -3, left: 15 }}>
                  <Text style={{ fontSize: 10, color: 'white' }}>5</Text>
                </Badge>
              </View>
            </Text>
          </Btn>
        ),
        headerLeft: () => (
          <Btn
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>
              <Ionicons size={30} name="chevron-back-outline" />
            </Text>
          </Btn>
        ),
        contentStyle: {
          backgroundColor: 'white',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Enroll" component={Enroll} />
      <Stack.Screen name="Detail" component={ItemDetail} />
      <Stack.Screen name="History" component={ItemHistory} />

    </Stack.Navigator>
  );
}
