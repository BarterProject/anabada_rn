import { AntDesign, Ionicons } from '@expo/vector-icons';

import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Animated, PanResponder, View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import { getRandomItems, getTESTItems } from '../../api';
import { initialStateProps, requestRandomItems } from '../../slice';
import { Item, testItem } from '../../types';
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

const ActivityIndicatorContainer = styled.View`
  flex:1;
  justify-content:center;
  align-items: center;
`;

const ChangeImageContainer = styled.View`
  position:absolute;
  width:50%;
  height:100%;
  opacity:0.1;
  background-color:blue;
`;

function Main({ navigation }) {
  // const navigation = useNavigation();

  const scale = useRef(new Animated.Value(1)).current;
  const POSITION = useRef(new Animated.Value(0)).current;
  // const checkButtonPosition = useRef(new Animated.Value(0)).current;
  // const [testItems, setTestItems] = useState([]);
  // const testItems : testItem[] = await getTESTItems();
  const testItems : testItem[] = [
    {
      id: 1,
      name: 'hi5',
      description: 'hey5',
      clause_agree: false,
      deposit: '900',
      imgName: '254af30f-5ba9-4aa5-85c7-8185fc7594ae.png',
    },
    {
      id: 2,
      name: 'dancingbug',
      description: 'a dancing bug',
      clause_agree: false,
      deposit: '2500',
      imgName: 'b117f147-9288-42d4-8aa3-e6ff58b62079.jpg',
    },
    {
      id: 3,
      name: 'Marceline',
      description: 'the vampire queen',
      clause_agree: false,
      deposit: '2500',
      imgName: '3274b189-1435-405f-944d-27fb71c561e8.png',
    },
    {
      id: 4,
      name: 'the vampire dad',
      description: 'the vampire dad',
      clause_agree: false,
      deposit: '1241242',
      imgName: 'b796942e-006c-49ce-aba2-d9edf73ac76d.png',
    },
  ];
  // const [testItems, setTestItems] = useState<testItem[]>([]);
  const dispatch = useDispatch();
  const { accessToken, randomItems } = useSelector((state:initialStateProps) => ({
    accessToken: state.userState.accessToken,
    randomItems: state.randomItems,
  }));
  const [itemList, setItemList] = useState<Item[]>([]);
  const [test, setTest] = useState(0);
  useEffect(() => {
    console.log(`accessToken : ${accessToken}`);
    dispatch(requestRandomItems());
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
      console.log('버리기', testItems.length);
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
        {testItems.length > 0
          ? (
            <CardContainer>
              <AnimatedCard
                style={{
                  transform: [{ scale: secondScale }],
                }}
              >
                <Card
                  index={index + 1}
                  img={testItems[index + 1].imgName}
                  // img=""
                  text={testItems[index + 1].name}
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
                  img={testItems[index].imgName}
                  // img=""
                  text={testItems[index].name}
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
                navigation.navigate('Item', { screen: 'Main' });
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
