import { AntDesign, Ionicons } from '@expo/vector-icons';

import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Animated, PanResponder, View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import { initialStateProps, removeARandomItem, requestRandomItems } from '../../slice';
import { Item } from '../../types';
import Card from './components/Card';

const Container = styled.View`
  flex:1;
`;

const Body = styled.View`
  flex:10;
  background-color:lightgray;
`;

const NavBar = styled.View`
  flex:2;
`;

const CircleButton = styled.TouchableOpacity`
  width:70px;
  height:70px;
  border-radius:35px;
  background-color:white;
`;

const CenterButton = styled.TouchableOpacity`
  width:100px;
  height:100px;
  border-radius:50px;
  background-color:white;
  border:5px;
  top:0px;
`;
const NavBarButtonsConatainer = styled.View`
  flex-direction:row;
  justify-content:space-around;
  align-items:flex-end;
  padding-top:10px;
  padding-left:20px;
  padding-right:20px;
  top:-30px;
`;

const ButtonText = styled.Text`
  justify-content:center;
  align-items:center;
`;

const ButtonTextContainer = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;

const CardContainer = styled.View`
  flex:1;
  /* background-color:red; */
  justify-content:center;
  align-items:center;
`;

const AnimatedCard = styled(Animated.createAnimatedComponent(View))`
  background-color:white;
  position:absolute;
  width:100%;
  height:100%;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2); 
  border-radius:12px;
`;

const ActivityIndicatorContainer = styled.View`
  flex:1;
  justify-content:center;
  align-items: center;
`;

function Main({ navigation }) {
  // const navigation = useNavigation();

  const scale = useRef(new Animated.Value(1)).current;
  const POSITION = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { accessToken, randomItems, chosenItem }:
  {accessToken:String, randomItems:Item[]} = useSelector((state:initialStateProps) => ({
    accessToken: state.userState.accessToken,
    randomItems: state.randomItems,
    chosenItem: state.chosenItem,
  }));

  useEffect(() => {
    console.log(`randomItems.length값이 ${randomItems.length}입니다. `);
    // console.log('값이 0입니다. ');
    if (randomItems.length === 0) {
      dispatch(requestRandomItems(10));
    } else if (randomItems.length === 5) {
      dispatch(requestRandomItems(5));
    }
    return () => {};
  }, [randomItems]);

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
    dispatch(removeARandomItem());
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
      if (chosenItem === '') {
        alert('교환요청을 실패했습니다. \n교환할 자신의 아이템을 선택해주세요');
      }
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
                <Card
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
                />
              </AnimatedCard>
            </CardContainer>
          )
          : (
            <ActivityIndicatorContainer>
              <ActivityIndicator
                color="black"
              />
            </ActivityIndicatorContainer>
          )}
      </Body>
      <NavBar>
        <NavBarButtonsConatainer>
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <CircleButton
              onPress={() => {
                navigation.navigate('Configure');
              }}
            >
              <ButtonTextContainer>
                <ButtonText>
                  <Ionicons name="ios-settings-outline" size={45} />
                </ButtonText>
              </ButtonTextContainer>
            </CircleButton>
          </DropShadow>
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <CenterButton onPress={() => {
              navigation.navigate('Requested');
            }}
            />
          </DropShadow>
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
            }}
          >
            <CircleButton
              onPress={() => {
                navigation.navigate('Item', { screen: 'Main', params: { getNewData: false } });
              }}
            >
              <ButtonTextContainer>
                <ButtonText>
                  <AntDesign name="inbox" size={50} />
                </ButtonText>
              </ButtonTextContainer>
            </CircleButton>
          </DropShadow>
        </NavBarButtonsConatainer>
      </NavBar>
    </Container>
  );
}

export default Main;
