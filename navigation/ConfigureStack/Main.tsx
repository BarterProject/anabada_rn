import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { deleteAccessToken } from '../../slice';
import { ConfigureStackParamList } from '../Configure';

const Container = styled.View`
  /* background-color:red; */
    flex: 1;
    /* justify-content:center;
    align-items:center; */
`;

const Header = styled.View`
/* background-color:blue; */
  flex:2;
`;
const ButtonContainer = styled.View`
  /* background-color:red; */
  flex:14;
  margin-left:20px;
  margin-right:20px;
  flex-direction: column;
  align-items:flex-start;
`;

const Text = styled.Text`
  font-size:40px;
`;

const Button = styled.TouchableOpacity`
    /* background-color:yellow; */
    width:100%;
    margin-bottom: 15px;
    margin-top: 15px;
`;

const Line = styled.View`
  background-color:lightgray;
  height:2px;
  width:100%;
`;

type MainInProps = NativeStackScreenProps<ConfigureStackParamList, 'Main'>

export default function Main({ navigation }:MainInProps) {
  const dispatch = useDispatch();

  return (
    <Container>
      <Header />
      <ButtonContainer>
        <Line />
        <Button
          onPress={() => {
            navigation.navigate('MyInfo');
          }}
        >
          <Text>
            내 정보
          </Text>
        </Button>
        <Line />
        <Button
          onPress={() => {
            navigation.navigate('Appinfo');
          }}
        >
          <Text>
            앱 정보
          </Text>
        </Button>
        <Line />
        <Button
          onPress={() => {
            navigation.navigate('Report');
          }}
        >
          <Text>
            문의사항
          </Text>
        </Button>
        <Line />
        <Button
          onPress={() => {
            dispatch(deleteAccessToken());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              }),
            );
          }}
        >
          <Text>
            로그아웃
          </Text>
        </Button>
        <Line />
      </ButtonContainer>
    </Container>
  );
}
