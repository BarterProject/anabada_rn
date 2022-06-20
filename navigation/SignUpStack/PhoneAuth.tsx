import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import InputFormColumn from '../AuthStack/components/InputFormColumn';
import { setPhoneAuthChecked } from '../../slice';
import { AuthStackParamList } from '../Auth';
import { TextFontAramL } from '../../Font';

const TouchableButton = styled.TouchableOpacity`
  background-color:#E94057;
  height: 43px;
  width: 210px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
  margin:5px;
`;

const ButtonText = styled(TextFontAramL)`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

const Container = styled.View`
flex:1;
margin-left: 10%;
margin-right:10%;
`;

const Header = styled.View`
  flex:1;
`;

const Body = styled.View`
  flex:7;
`;

const ButtonContainer = styled.View`
  align-items:flex-end;
`;

type PhoneAuthProps = NativeStackScreenProps<AuthStackParamList, 'PhoneAuth'>

export default function PhoneAuth({ route, navigation }: PhoneAuthProps) {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const { phoneNumber } = route.params;

  const dispatch = useDispatch();

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(`+82${phoneNumber}`);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    console.log("인증 시도", phoneNumber);
    try {
      const response = await confirm.confirm(code);
      console.log(response);
      if (response) {
        dispatch(setPhoneAuthChecked(true));
        navigation.goBack();
      }
    } catch (e) {
      // alert(JSON.stringify(e));
      alert("번호가 잘못되었습니다. 다시 시도해주세요");
    }
  }

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  return (
    <Container>
      <Header />
      <Body>
        <InputFormColumn
          placeholder="번호"
          setText={setCode}
          title="인증번호를 입력해주세요"
        />
        <ButtonContainer>
          <TouchableButton
            onPress={
              () => confirmCode()
            }
          >
            <ButtonText>
              인증하기
            </ButtonText>
          </TouchableButton>
        </ButtonContainer>
      </Body>
    </Container>
  );
}
