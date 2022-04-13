import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Button,
  Image, Platform, Pressable, TouchableOpacity, View,
} from 'react-native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../Home';

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

interface CardProps {
    index:number;
    img:string;
    text:string;
}

export default function Card({ index, img, text }:CardProps) {
  const navigation = useNavigation();
  // const images = []
  // const number = useState(0);
  console.log(img);
  return (
    <Container>
      <Image
        style={{
          borderColor: 'gray',
          // position: 'absolute',
          flex: 1,
        }}
        source={{
          uri: Platform.OS === 'ios' ? `http://localhost:3000/${img}` : `http://10.0.2.2:3000/${img}`,
          // uri: `http://localhost:3000/${img}`,
        }}
      />
      <ChangeImageContainer>
        {/* <Button
          title="test"
          onPress={() => {
            console.log('123');
          }}
        /> */}
        <View
          style={{
            flex: 1,
          }}
          onTouchEnd={() => {
            console.log('left');
          }}
        />
        <View
          style={{
            flex: 1,
          }}
          onTouchEnd={() => {
            console.log('right');
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
          {text}
        </InfoText>
        <DetailButtonContainer>
          <DetailButton
            onPress={
              () => {
                // alert('test');
                navigation.navigate('ItemDetail');
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
