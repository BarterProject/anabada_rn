import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';

import { CommonActions } from '@react-navigation/native';
import { initialStateProps, setPhoneAuthChecked, setPhoneNumberForSigingUp } from '../../slice';
import { TextFontAramL } from '../../Font';

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

const ButtonText = styled(TextFontAramL)`
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

const TextInput = styled.TextInput`
  background-color:#E6E6E6;
  /* width:200px; */
  width:100%;
  height:50px;
  border-radius:25px;
  padding-left:20px;
  font-family: '210AramGothicL';
`;

const TouchableNextButton = styled.TouchableOpacity`
  background-color:#E94057;
  height: 43px;
  width: 100%;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
  /* margin:5px; */
  margin-top:30px;
`;

// const ButtonText = styled(TextFontAramL)`
//   font-size: 18px;
//   font-weight: 800;
//   line-height: 27px;
//   letter-spacing: 0px;
//   color: #FFFFFF;
// `;

interface PhoneNumberProps {
  navigation: any;
}

export default function PhoneNumber({ navigation }: PhoneNumberProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [isPhoneChecked, setPhoneChecked] = useState(false);
  const dispatch = useDispatch();

  const { isPhoneAuthChecked } = useSelector((state: initialStateProps) => ({
    isPhoneAuthChecked: state.signUpField.isPhoneAuthChecked,
  }));
  console.log(isPhoneAuthChecked);
  // useEffect(() => {
  //   setPhoneChecked(isPhoneAuthChecked);
  // }, [isPhoneAuthChecked]);
  return (
    <Container>
      <Form>
        {/* ????????? ???????????? ?????? ???????????? ???????????? disabled ?????? */}
        {/* <InputFormRow title="?????????" placeholder="" setText={setPhoneNumber} /> */}
        <TextInput
          editable={!isPhoneAuthChecked}
          style={{
            color: !isPhoneAuthChecked ? 'black' : 'gray',
            backgroundColor: !isPhoneAuthChecked ? '#E6E6E6' : 'lightgray',
          }}
          keyboardType="number-pad"
          placeholder="-?????? ???????????????"
          onChangeText={(text) => { setPhoneNumber(text); }}
          autoCapitalize="none"
          value={phoneNumber}
        />
        <PhoneAuthContainer>
          <TouchableButton
            style={{
              opacity: isPhoneAuthChecked ? 0.5 : 1,
              // opacity: 0.5,
            }}
            // disabled={isPhoneAuthChecked}
            // disabled={false}
            onPress={() => {
              navigation.navigate('PhoneAuth', {
                phoneNumber,
              });
            }}
          >
            <ButtonText>
              ????????? ??????
            </ButtonText>
          </TouchableButton>
        </PhoneAuthContainer>
        {/* <ButtonFit
          // disabled={!isPhoneChecked}
          disabled={false}
          to="Address"
          text="next"
        /> */}
        <TouchableNextButton
          disabled={!isPhoneAuthChecked}
          // disabled={false}
          style={{
            // opacity: 1,
            opacity: !isPhoneAuthChecked ? 0.5 : 1,
          }}
          onPress={() => {
            dispatch(setPhoneNumberForSigingUp(phoneNumber));
            dispatch(setPhoneAuthChecked(false));
            // navigation.navigate('Address');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Address' }],
              }),
            );
          }}
        >
          <ButtonText>
            ?????? ??????
          </ButtonText>
        </TouchableNextButton>
      </Form>
    </Container>
  );
}
