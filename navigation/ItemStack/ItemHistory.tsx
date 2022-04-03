import React, { useEffect, useRef } from 'react';
import {
  PanResponder, TouchableOpacity, Text, Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

import { Card } from './utils';

const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;`;

const CardContainer = styled.View`
    flex:3.5;
    align-items: center;
    justify-content: center;
`;
const InfoContainer = styled.View`
flex-direction: row;
  flex: 3;
`;

function ItemHistory({
  // route: { params },
  navigation: { setOptions, goBack },
}: {
    // route: { params: any };
    navigation: { setOptions: Function; goBack: Function, }
  }) {
  const position = useRef(new Animated.Value(200)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    extrapolate: 'clamp',
  });
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx }) => {
      position.setValue(dx);
    },
    onPanResponderRelease: (_, { dx }) => {
      console.log(dx);
    },
    onPanResponderGrant: () => {
      console.log('start');
    },
  })).current;
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Text>
            <Ionicons size={30} name="chevron-back-outline" />
          </Text>
        </TouchableOpacity>
      ),

      title: '아이템 히스토리',
    });
  }, []);
  return (
    <Container>
      <CardContainer>
        <Card
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...panResponder.panHandlers}
          style={{
            transform: [
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        />
      </CardContainer>
      <InfoContainer>
        <Text>ㅎㅇ</Text>
      </InfoContainer>
    </Container>
  );
}

export default ItemHistory;
