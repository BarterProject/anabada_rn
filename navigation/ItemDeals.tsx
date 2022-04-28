import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Receives from './HomeStack/Receives';
import Request from './HomeStack/Request';

const Container = styled.View`
  flex: 1;
`;

export default function ItemDeals() {
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
      >
        <Tab.Screen
          name="교환 요청"
          component={Request}
        />
        <Tab.Screen
          name="받은 요청"
          component={Receives}
        />

      </Tab.Navigator>
    </Container>
  );
}
