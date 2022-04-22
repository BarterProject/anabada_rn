import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import {
  initialStateProps, requestLogin, setIdForSigningIn, setPasswordForSigingIn,
} from '../../slice';
import { AuthStackParamList } from '../Auth';

const Container = styled.View`
  flex:1;
  color: white;
`;

const Button = styled.TouchableOpacity`
  background-color:#E94057;
  height: 43px;
  width: 210px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

const TextInput = styled.TextInput`
  width:210px;
  height:48px;
  background: #F2F2F2;
  border-radius: 20px;
  border: 1px;
  padding-left:20px;
  margin-bottom:10px;
`;

const TitleContainer = styled.View`
  top:80px;
`;

const Title = styled.Text`
  font-size:80px;
  color:#E94057;
`;

const Header = styled.View`
  flex:1;
  align-items:center;
  justify-content:flex-end;
`;

const Body = styled.View`
  justify-content:center;
  align-items:center;
  flex:2;
  bottom:30px;
`;

type SignInProps = NativeStackScreenProps<AuthStackParamList, 'PhoneAuth'>

export default function SignIn({ navigation }: SignInProps) {
  const [id, setId] = useState('bsy111');
  const [password, setPassword] = useState('bsy111');

  const {
    accessToken,
  } = useSelector(
    (state:initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('로그인 스크린 리렌더 accessToken', accessToken);
    if (accessToken === '' || accessToken === undefined) {
      console.log('accessToken의 값이 없습니다.');
      return;
    }
    if (accessToken === 'err') {
      console.log('accessToken의 값이 에러가 뜹니다..');
      alert('아이디/비밀번호를 다시 확인해주세요');
    } else {
      console.log('accessToken의 값이 감지가 되어 로그인됩니다.');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
    }
  }, [accessToken]);
  const handleSubmit = () => {
    console.log('로그인을 눌렀습니다.');
    dispatch(setIdForSigningIn(id));
    dispatch(setPasswordForSigingIn(password));
    dispatch(requestLogin());
    // alert(`accessToken${accessToken}`);
  };
  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>CLIP</Title>
        </TitleContainer>
      </Header>
      <Body>
        <TextInput onChangeText={(text) => { setId(text); }} placeholder="아이디" />
        <TextInput onChangeText={(text) => { setPassword(text); }} placeholder="비밀번호" />
        <Button
          onPress={handleSubmit}
        >
          <ButtonText>
            로그인
          </ButtonText>
        </Button>
      </Body>
    </Container>
  );
}
