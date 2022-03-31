import React, { useEffect, useState } from 'react';

import { Alert } from 'react-native';

import styled from 'styled-components/native';

import { useDispatch } from 'react-redux';

import { CommonActions } from '@react-navigation/native';

import InputFormRow from './components/InputFormRow';
import InputFormRowSecrue from './components/InputFormRowSecrue';
import { setIdForSigningUp, setPasswordForSigingUp } from '../../slice';

const Container = styled.View`
    flex: 1;
    padding-top:100px;
    align-items:center;
`;

const Form = styled.View`
  flex:1;
  width:300px;
`;

const TouchableButton = styled.TouchableOpacity`
background-color:#E94057;
height: 43px;
width: 100%;
border-radius: 15px;
justify-content:center;
align-items:center;
color: white;
margin:5px;
margin-top:30px;
`;

const ButtonText = styled.Text`
font-size: 18px;
font-weight: 800;
line-height: 27px;
letter-spacing: 0px;
color: #FFFFFF;
`;

interface IDPWProps {
  navigation : any;
}

export default function IDPW({ navigation }:IDPWProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isCompleted, setCompleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIdForSigningUp(id));
    dispatch(setPasswordForSigingUp(password));
    if (id.length > 5 && password.length > 5 && password === password2) {
      setCompleted(true);
    }
  }, [id, password === password2]);

  return (
    <Container>
      <Form>
        <InputFormRow title="아이디" placeholder="6자리 이상" setText={setId} />
        <InputFormRowSecrue title="비밀번호" placeholder="6자리 이상" setText={setPassword} />
        <InputFormRowSecrue title="" placeholder="비밀번호 확인" setText={setPassword2} />
        <TouchableButton
          style={{
            opacity: isCompleted ? 1 : 0.5,
            // opacity: 0.5,
          }}
          disabled={!isCompleted}
          onPress={() => {
            // 중복되면 안넘어감
            // 비밀번호 다르면 안넘어감
            if (password === password2) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'PhoneNumber' }],
                }),
              );
            } else {
              Alert.alert('비밀번호를 확인해주세요');
            }
          }}
        >
          <ButtonText>
            Next
          </ButtonText>
        </TouchableButton>
      </Form>
    </Container>
  );
}
