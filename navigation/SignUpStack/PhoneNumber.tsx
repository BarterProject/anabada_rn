import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components/native';

import { initialStateProps } from '../../slice';

import InputFormRow from './components/InputFormRow';
import ButtonFit from './components/ButtonFit';

const Container = styled.View`
    flex: 1;
    padding-top:100px;
    align-items:center;
`;

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

const PhoneAuthContainer = styled.View`
  align-items:flex-end;
`;

const Form = styled.View`
  flex:1;
  width:300px;
`;

interface PhoneNumberProps{
  navigation:any;
}

export default function PhoneNumber({ navigation }:PhoneNumberProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneChecked, setPhoneChecked] = useState(false);

  const { isPhoneAuthChecked } = useSelector((state:initialStateProps) => ({
    isPhoneAuthChecked: state.signUpField.isPhoneAuthChecked,
  }));
  console.log(isPhoneAuthChecked);
  useEffect(() => {
    setPhoneChecked(isPhoneAuthChecked);
  }, [isPhoneAuthChecked]);
  return (
    <Container>
      <Form>
        {/* 인증이 되었다면 번호 입력칸은 자동으로 disabled 한다 */}
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
        <ButtonFit
          // disabled={!isPhoneChecked}
          disabled={false}
          to="Address"
          text="next"
        />
      </Form>
    </Container>
  );
}
