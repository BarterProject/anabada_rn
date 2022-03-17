import React, { useState } from 'react';

import styled from 'styled-components/native';

import InputFormRow from './components/InputFormRow';
import InputFormColumn from './components/InputFormColumn';
import ButtonRegular from './components/ButtonRegular';
import ButtonFit from './components/ButtonFit';

const TouchableButton = styled.TouchableOpacity`
  background-color:#E94057;
  height: 43px;
  width: 150px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
  margin:5px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

const Container = styled.View`
  flex:1;
  align-items:center;
  padding-top:100px;
`;

const Form = styled.View`
  flex:1;
  width:300px;
`;

const PhoneAuthContainer = styled.View`
  align-items:flex-end;
`;

const FinshSigningUpContainer = styled.View`
  align-items:center;
`;

interface SignUpProps{
  navigation:any
}

export default function SignUp({ navigation }:SignUpProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState('');

  return (
    <Container>
      <Form>
        <InputFormRow title="아이디" placeholder="" setText={setId} />
        <InputFormRow title="비밀번호" placeholder="" setText={setPassword} />
        <InputFormRow title="" placeholder="비밀번호 확인" setText={setPassword2} />
        <InputFormRow title="연락처" placeholder="" setText={setPhoneNumber} />
        <PhoneAuthContainer>
          <TouchableButton
            onPress={() => {
              navigation.navigate('PhoneAuth', {
                phoneNumber,
              });
            }}
          >
            <ButtonText>
              휴대폰 인증
            </ButtonText>
          </TouchableButton>
        </PhoneAuthContainer>

        <InputFormRow title="주소" placeholder="" setText={setAddress} />
        <PhoneAuthContainer>
          <ButtonRegular
            text="주소찾기"
            navigation={navigation}
            to="#"
          />
        </PhoneAuthContainer>
        <InputFormColumn title="보증금 반환 계좌" placeholder="" setText={setAccount} />
        <FinshSigningUpContainer>
          <ButtonFit
            navigation={navigation}
            to="#"
            text="회원가입 완료"
          />
        </FinshSigningUpContainer>
      </Form>
    </Container>
  );
}
