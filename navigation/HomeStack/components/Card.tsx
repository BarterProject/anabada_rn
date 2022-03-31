import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
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
  background-color:red;
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
  z-index:0;
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

interface CardProps {
    index:number;
    text:string;
}

export default function Card({ index, text }:CardProps) {
  const navigation = useNavigation();
  return (
    <Container>
      <NumberContainer>
        <NumberText>
          {index}
        </NumberText>
      </NumberContainer>
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
      <InfoContainerBackground />
    </Container>
  );
}
