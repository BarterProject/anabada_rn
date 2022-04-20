import { BASE_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image, View,
} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { initialStateProps } from '../../../slice';
import { Item } from '../../../types';

const Container = styled.View`
  position:absolute;
  justify-content:flex-end;
  width:100%;
  height:100%;
`;

const NumberContainer = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
  /* background-color:red; */
`;

const NumberText = styled.Text`
  font-size:80px;
  font-weight:900;
`;
const InfoContainer = styled.View`
  z-index:1;
  position:absolute;
  flex-direction:row;
  width:100%;
  height:30%;
`;

const InfoText = styled.Text`
  color:white;
  font-size:80px;
  font-weight:900;
`;

const InfoContainerBackground = styled.View`
  position:absolute;
  /* z-index:0; */
  /* flex:1; */
  width:100%;
  height:30%;
  opacity:0.5;
  background-color:black;
  
`;

const DetailButtonContainer = styled.View`
  
`;

const DetailButton = styled.Pressable`
  
`;

const DetailButtonText = styled.Text`
  
`;
const ChangeImageContainer = styled.View`
  position:absolute;
  flex-direction:row;
  width:100%;
  height:100%;
  opacity:0.5;
`;

export default function Card({ item }:{item:Item}) {
  // console.log(item);
  const {
    name,
    description,
    deposit,
    images,
  } = item;

  const { accessToken }:
  {accessToken:String} = useSelector((state:initialStateProps) => ({
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
            : `${BASE_URL}/api/items/images/${images[index].name}`),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}
      />
      <ChangeImageContainer>
        <View
          style={{

            backgroundColor: 'yellow',
            opacity: 0,
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
            setShortTouch(false);
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
            backgroundColor: 'blue',
            opacity: 0,
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
            setShortTouch(false);
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
      {/* <NumberContainer>
        <NumberText>
          {index}
        </NumberText>
      </NumberContainer> */}
      <InfoContainerBackground />
      <InfoContainer>
        <InfoText>
          {name}
        </InfoText>
        <DetailButtonContainer>
          <DetailButton
            onPress={
              () => {
                // alert('test');
                navigation.navigate('Item', {
                  screen: 'Detail',
                  params: {
                    readOnly: true,
                  },
                });
              }
          }
          >
            <DetailButtonText>
              <AntDesign name="infocirlceo" size={50} />
            </DetailButtonText>
          </DetailButton>
        </DetailButtonContainer>
      </InfoContainer>
    </Container>
  );
}
