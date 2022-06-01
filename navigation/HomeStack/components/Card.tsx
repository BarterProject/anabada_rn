import { BASE_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image, Text, View,
} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { initialStateProps } from '../../../slice';
import { itemType } from '../../../types';
import { Mark, MarkProps } from './MainComponents';

const Container = styled.View`
  position:absolute;
  justify-content:flex-end;
  width:100%;
  height:100%;
`;

const InfoContainer = styled.View`
  z-index:1;
  position:absolute;
  /* flex-direction:row; */
  width:100%;
  height:30%;
`;

const InfoText = styled.Text`
  padding: 8px;
  color: white;
  font-size:40px;
  font-weight:900;
`;

const InfoContainerBackground = styled.View`
  position:absolute;
  /* z-index:0; */
  /* flex:1; */
  width:100%;
  height:30%;
  opacity:0.2;
  background-color:black;
  
`;

const DetailButtonContainer = styled.View`
  
`;

const DetailButton = styled.Pressable`
  
`;

const DetailButtonText = styled.Text`
  left:0;
  padding-top: 15px;
`;
const ChangeImageContainer = styled.View`
  position:absolute;
  flex-direction:row;
  width:100%;
  height:100%;
  opacity:0.5;
`;

const InfoTitle = styled.View`
  flex-direction:row;
`;

const DepositContainer = styled.View`
  display:flex;
  flex-direction:row;
  padding: 10px;
  top:-10px;
`;

const Deposit = styled.Text`
  background-color:gray;
  font-size: 20px;
`;
type CardProps = MarkProps & {
  item: itemType
}

export default function Card({
  item,
  declineOpacity, acceptOpacity,
}: CardProps) {
  // console.log(item);
  const {
    name,
    deposit,
    images,
  } = item;

  const { accessToken }:
    { accessToken: String } = useSelector((state: initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }));

  const [index, setIndex] = useState(0);
  const [isShortTouch, setShortTouch] = useState(false);

  console.log('images.length', images.length);

  const navigation = useNavigation();

  const nextImg = () => {
    if (index + 1 < images.length) {
      setIndex(index + 1);
    }
  };

  const prevImg = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    setIndex(0);
    return () => setShortTouch(false);
  }, [images]);

  return (
    <Container>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        source={{
          uri: (images.length === 0 || images[index] === undefined
            ? '#'
            : `${BASE_URL}/api/v2/items/images/${images[index].name}`),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}
      />
      <Mark
        declineOpacity={declineOpacity}
        acceptOpacity={acceptOpacity}
      />
      <ChangeImageContainer>
        <View
          style={{
            // backgroundColor: 'yellow',
            opacity: 1,
            flex: 1,
          }}
          onTouchStart={() => { // 0.5초 넘게 누르거나 움직이면 이미지 넘기기 취소
            setShortTouch(true);
            setTimeout(
              () => {
                setShortTouch(false);
              },
              500,
            );
          }}
          onTouchMove={() => {
            // setShortTouch(false);
          }}
          onTouchEnd={() => {
            if (isShortTouch) {
              prevImg();
            }
            console.log('left and index : ', index);
          }}
        />
        <View
          style={{
            // backgroundColor: 'blue',
            opacity: 1,
            flex: 1,
          }}
          onTouchStart={() => {
            setShortTouch(true);
            setTimeout(
              () => {
                setShortTouch(false);
              },
              500,
            );
          }}
          onTouchMove={() => {
            // setShortTouch(false);
          }}
          onTouchEnd={() => {
            if (isShortTouch) {
              nextImg();
            }
            console.log(index);
            console.log('right and index : ', index);
          }}
        />
      </ChangeImageContainer>
      <InfoContainerBackground />
      <InfoContainer>
        <InfoTitle>
          <InfoText>
            {name}
          </InfoText>
          <DetailButtonContainer>
            <DetailButton
              onPress={
                () => {
                  navigation.navigate('ItemDetail', {
                    item,
                  });
                }
              }
            >
              <DetailButtonText>
                <AntDesign name="infocirlceo" color="white" size={20} />
              </DetailButtonText>
            </DetailButton>
          </DetailButtonContainer>
        </InfoTitle>
        <DepositContainer>
          <Deposit>
            {deposit}
            원
          </Deposit>
        </DepositContainer>
      </InfoContainer>
    </Container>
  );
}
