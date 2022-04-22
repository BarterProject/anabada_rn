import { AntDesign, Ionicons } from '@expo/vector-icons';

import React, { useRef, useState } from 'react';

import {
  Animated, PanResponder, View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import styled from 'styled-components/native';
import Card from './components/Card';

const Container = styled.View`
  flex:1;
`;

const Body = styled.View`
  flex:10;
  background-color:skyblue;
`;

const NavBar = styled.View`
  flex:2;
  background-color:pink;
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
  top:10px;
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

function Main({ navigation }) {
  // const navigation = useNavigation();

  const scale = useRef(new Animated.Value(1)).current;
  const POSITION = useRef(new Animated.Value(0)).current;
  // const checkButtonPosition = useRef(new Animated.Value(0)).current;

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
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    setIndex((prev) => 1 + prev);
    POSITION.setValue(0);
  };
  const bounceTotheLeftOut = () => {
    Animated.spring(POSITION, {
      toValue: -400,
      useNativeDriver: true,
      restDisplacementThreshold: 100,
      restSpeedThreshold: 100,
    }).start(() => {
      // POSITION.setValue(-400)
      // POSITION.flattenOffset()
      onDismiss();
      // POSITION.flattenOffset()
    });
  };

  const bounceTotheRightOut = () => {
    // console.log('bounceTotheRightOut start POSITION', POSITION)
    Animated.spring(POSITION, {
      toValue: 400,
      useNativeDriver: true,
      restDisplacementThreshold: 100,
      restSpeedThreshold: 100,
    }).start(() => {
      // console.log('bounceTotheRightOut end POSITION', POSITION)
      // console.log('bounceTotheRightOut POSITION', POSITION)
      // POSITION.setValue(400)
      // POSITION.flattenOffset()
      onDismiss();
    });
  };

  const bounceBack = () => {
    // console.log('bounceBack start POSITION', POSITION)

    Animated.spring(POSITION, {
      toValue: 0,
      bounciness: 10,
      useNativeDriver: true,
    }).start(() => {
      console.log('bounceBack end POSITION', POSITION);
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
        console.log('POSITION', POSITION);
        console.log('POSITION.setOffset(POSITION._value)', POSITION._value);
        // POSITION.setOffset(POSITION._value);
        // POSITION.setValue(0)
        console.log('POSITION', POSITION);
        console.log('POSITION.setOffset(POSITION._value)', POSITION._value);
        onPressIn();
        // console.log("grant\tPOSITION\t", POSITION)
        // console.log("grant\tPOSITION._value\t", POSITION._value)
      },
      onPanResponderMove: (_, { dx }) => {
        POSITION.setValue(dx);
        // console.log('setValue(dx)\t\t', dx)
        // console.log('Move\tPOSITION\t', POSITION)
        // console.log('Move\tPOSITION.value\t', POSITION._value)
      },
      onPanResponderRelease: (_, { dx }) => {
        console.log('Release POSITION', typeof POSITION);
        console.log('Release POSITION._value', POSITION._value);
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
        <CardContainer>
          <AnimatedCard
            style={{
              transform: [{ scale: secondScale }],
            }}
          >
            <Card
              index={index + 1}
              text="이름"
            />
          </AnimatedCard>
          <AnimatedCard
            {...panResponder.panHandlers}
            style={{
              transform: [{ scale }, { translateX: POSITION }, { rotateZ: rotation }],
            }}
          >
            <Card
              index={index}
              text="이름"
            />
          </AnimatedCard>
        </CardContainer>
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
            <CenterButton />
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
