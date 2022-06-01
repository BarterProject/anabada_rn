import React from 'react';

import { Text, View } from 'react-native';

import styled from 'styled-components/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import Main from './ItemStack/Main';
import ItemDetail from './ItemStack/ItemDetail';
import ItemDelivery from './ItemStack/ItemDelivery';
import ItemTracking from './ItemStack/ItemTracking';
import Enroll from './ItemStack/Enroll';
import Confirm from './ItemStack/Confirm';
import ItemHistory from './ItemStack/ItemHistory';
import SelectOption from './ItemStack/SelectOption';
import ItemRefund from './ItemStack/ItemRefund';
import ChatRoom from './ItemStack/ChatRoom';

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
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Detail" component={ItemDetail} />
      <Stack.Screen name="ChatRoom" component={ChatRoom}
        options={{
          headerShown: false,
          headerLeft: () => null
        }}
      />
      <Stack.Screen name="History" component={ItemHistory} />
      <Stack.Screen name="SelectOption" component={SelectOption} />
      <Stack.Screen name="ItemDelivery" component={ItemDelivery} />
      <Stack.Screen name="ItemTracking" component={ItemTracking} />
      <Stack.Screen name="ItemRefund" component={ItemRefund} />

    </Stack.Navigator>
  );
}
