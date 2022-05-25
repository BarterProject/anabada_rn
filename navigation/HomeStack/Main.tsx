import React, { useEffect, useRef } from 'react';

import {
  Animated, PanResponder,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import messaging from '@react-native-firebase/messaging';

import axios from 'axios';
import { BASE_URL } from '@env';
import { itemApi, userApi } from '../../api';

import {
  initialStateProps, removeARandomItem, requestDeal, requestRandomItems, setNotice, setPhoneToken,
} from '../../slice';
import { itemType } from '../../types';
import BackCard from './components/BackCard';
import Card from './components/Card';

import {
  AnimatedCard,
  Body,
  CardActivityIndicator,
  CardContainer,
  ConfigureButton,
  Container,
  DealsButton,
  ItemBoxButton,
  NavBar,
  NavBarButtonsConatainer,
} from './components/MainComponents';

function Main() {
  const scale = useRef(new Animated.Value(1)).current;
  const POSITION = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { randomItems, chosenItemId }:
    {
      randomItems: itemType[],
      chosenItemId: number
    } = useSelector((state: initialStateProps) => ({
      randomItems: state.randomItems,
      chosenItemId: state.chosenItemId,
    }));

  const getNotice = async () => {
    try {
      const { data } = await userApi.getNotice();
      console.log(data);
      dispatch(setNotice(data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotice();
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        console.log('phone token', token);
        dispatch(setPhoneToken(token));
        return axios.post(`${BASE_URL}/phonetoken`, { token });
      } catch (error) {
        return console.error(error);
      }
    }

    getToken();
  }, []);

  useEffect(() => {
    console.log(`randomItems.length값이 ${randomItems.length}입니다. `);
    // console.log('값이 0입니다. ');
    if (randomItems.length === 0) {
      dispatch(requestRandomItems(10));
    } else if (randomItems.length <= 5) {
      dispatch(requestRandomItems(5));
    }
    // return () => {};
  }, [randomItems]);

  const declineOpacity = POSITION.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const acceptOpacity = POSITION.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const secondScale = POSITION.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 0.5, 1],
    extrapolate: 'clamp',
  });

  const rotation = POSITION.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-30deg', '30deg'],
    extrapolate: 'clamp',
  });

  const next = () => {
    dispatch(removeARandomItem()); // 카드 한장 넘기기
    console.log('next');
  };

  const bounceTotheLeftOut = () => {
    Animated.spring(POSITION, {
      toValue: -400,
      useNativeDriver: true,
      restDisplacementThreshold: 100,
      restSpeedThreshold: 100,
    }).start(() => {
      next();
      POSITION.setValue(0);
    });
  };

  const bounceTotheRightOut = () => {
    Animated.spring(POSITION, {
      toValue: 400,
      useNativeDriver: true,
      restDisplacementThreshold: 100,
      restSpeedThreshold: 100,
    }).start(() => {
      console.log('bounceTotheRightOut chosenItemId:', chosenItemId);
      dispatch(requestDeal()); // 교환 신청하기
      next();
      POSITION.setValue(0);
    });
  };

  const bounceBack = () => {
    Animated.spring(POSITION, {
      toValue: 0,
      bounciness: 10,
      useNativeDriver: true,
    }).start(() => {
      POSITION.setValue(0);
      POSITION.flattenOffset();
    });
  };

  const onPressIn = () => {
    Animated.spring(
      scale,
      {
        toValue: 0.95,
        useNativeDriver: true,
      },
    ).start();
  };

  const onPressOut = () => {
    Animated.spring(
      scale,
      {
        toValue: 1,
        useNativeDriver: true,
      },
    ).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, test) => {
        onPressIn();
      },
      onPanResponderMove: (_, { dx }) => {
        POSITION.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        POSITION.flattenOffset();
        if (POSITION._value > 150) {
          bounceTotheRightOut();
        } else if (POSITION._value < -150) {
          bounceTotheLeftOut();
        } else {
          bounceBack();
        }
        onPressOut();
      },
    }),
  ).current;

  return (
    <Container>
      <Body>
        {randomItems.length > 0
          ? (
            <CardContainer>
              <AnimatedCard
                style={{
                  transform: [{ scale: secondScale }],
                }}
              >
                <BackCard
                  item={randomItems[1]}
                />
              </AnimatedCard>
              <AnimatedCard
                {...panResponder.panHandlers}
                style={{
                  transform: [{ scale }, { translateX: POSITION }, { rotateZ: rotation }],
                }}
              >
                <Card
                  item={randomItems[0]}
                  declineOpacity={declineOpacity}
                  acceptOpacity={acceptOpacity}
                />
              </AnimatedCard>
            </CardContainer>
          )
          : (
            <CardActivityIndicator />
          )}
      </Body>
      <NavBar>
        <NavBarButtonsConatainer>
          <ConfigureButton />
          <DealsButton />
          <ItemBoxButton />
        </NavBarButtonsConatainer>
      </NavBar>
    </Container>
  );
}

export default Main;
