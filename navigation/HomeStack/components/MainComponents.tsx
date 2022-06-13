// import { AntDesign, Entypo, Ionicons } from 'react-native-vector-icons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Image, Text, View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';

import { BASE_URL } from '@env';
import { useSelector } from 'react-redux';
import { initialStateProps } from '../../../slice';
import { itemApi } from '../../../api';
import { TextFontAramL } from '../../../Font';

export type MarkProps = {
  declineOpacity: Animated.AnimatedInterpolation | null,
  acceptOpacity: Animated.AnimatedInterpolation | null
}

export const Container = styled.View`
  flex:1;
`;

export const Body = styled.View`
  flex:10;
  background-color:lightgray;
`;

export const NavBar = styled.View`
  flex:2;
`;

export const CircleButton = styled.TouchableOpacity`
  width:70px;
  height:70px;
  border-radius:35px;
  background-color:white;
`;

export const CenterButton = styled.TouchableOpacity`
  width:100px;
  height:100px;
  border-radius:50px;
  background-color:white;
  border:5px;
  top:0px;
`;
export const NavBarButtonsConatainer = styled.View`
  flex-direction:row;
  justify-content:space-around;
  align-items:flex-end;
  padding-top:10px;
  padding-left:20px;
  padding-right:20px;
  top:-30px;
`;

export const ButtonText = styled(TextFontAramL)`
  justify-content:center;
  align-items:center;
`;

export const ButtonTextContainer = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;

export const CardContainer = styled.View`
  flex:1;
  /* background-color:red; */
  justify-content:center;
  align-items:center;
`;

export const AnimatedCard = styled(Animated.createAnimatedComponent(View))`
  background-color:white;
  position:absolute;
  width:100%;
  height:100%;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2); 
  border-radius:12px;
`;

export const CardActivityIndicator = styled(ActivityIndicator).attrs({
  size: 'large',
  color: 'black',
})`
  flex:1;
  justify-content:center;
  align-items: center;
`;

export const AcceptMarkContainer = styled(Animated.createAnimatedComponent(View))`
    position:absolute;
    justify-content:center;
    align-items:center;
    /* background-color:green; */
    width:100%;
    height:100%;
`;

export const DeclineMarkContainer = styled(Animated.createAnimatedComponent(View))`
    position:absolute;
    justify-content:center;
    align-items:center;
    /* padding-right: 40px; */
    width:100%;
    height:100%;
`;

export const TestCard = styled(Animated.createAnimatedComponent(View))`
  position:absolute;
  justify-content:center;
  background-color:red;
  opacity:0.5;
  width:100%;
  height:100%;
`;

export const MarkContainer = styled.View`
  position:absolute;
  justify-content:center;
  width:100%;
  height:100%;
`;

export function Mark({
  declineOpacity,
  acceptOpacity,
}: MarkProps) {
  return (
    <MarkContainer>
      <AcceptMarkContainer
        style={{
          opacity: acceptOpacity,
        }}
      >
        <AntDesign
          name="checkcircle"
          style={{
            color: 'lightgreen',
            fontSize: 200,
          }}
        />
        {/* <Text
          style={{
            color: 'green',
            fontSize: 50,
          }}
        >
          교환요청
        </Text>
        checkcircle
         */
        }
      </AcceptMarkContainer>
      <DeclineMarkContainer
        style={{
          opacity: declineOpacity,
        }}
      >
        <Entypo
          name="circle-with-cross"
          style={{
            color: 'red',
            fontSize: 200,
          }}
        />
      </DeclineMarkContainer>
    </MarkContainer>
  );
}

export function TestCardWithVar({ declineOpacity }) {
  return (
    <TestCard
      style={{
        opacity: declineOpacity,
      }}
    />
  );
}
export function ConfigureButton() {
  const navigation = useNavigation();

  return (
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
            <Ionicons color="black" name="ios-settings-outline" size={45} />
          </ButtonText>
        </ButtonTextContainer>
      </CircleButton>
    </DropShadow>
  );
}

export function ItemBoxButton() {
  const navigation = useNavigation();

  return (
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
  );
}

export function DealsButton() {
  const navigation = useNavigation();
  const [chosenItemIamgeName, setChosenItemIamgeName] = useState('');

  const { accessToken, chosenItemId }:
    {
      accessToken: string,
      chosenItemId: number
    } = useSelector((state: initialStateProps) => ({
      accessToken: state.userState.accessToken,
      chosenItemId: state.chosenItemId,
    }));

  useEffect(() => {
    itemApi.getItemInfo(chosenItemId).then((itemInfo) => {
      setChosenItemIamgeName(itemInfo.data.images[0].name);
      console.log('itemInfo');
      console.log(itemInfo.data.images[0].name);
    });
    // console.log('chosenItemInfo', data);
  }, [chosenItemId]);

  return (
    <DropShadow
      style={{
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
    >
      <CenterButton onPress={() => {
        // navigation.navigate('Requested');
        navigation.navigate('ItemDeals');
      }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 50,
          }}
          source={{
            uri: chosenItemId === 0 ? '#'
              : `${BASE_URL}/api/v2/items/images/${chosenItemIamgeName}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }}
        />
      </CenterButton>
    </DropShadow>
  );
}
