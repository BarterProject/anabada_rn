import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import styled from 'styled-components/native';
import { TextFontAramL, TextFontAramR } from '../../../Font';

import { RootStackParamList } from '../../Root';

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

const ButtonText = styled(TextFontAramR)`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

type Props = NativeStackScreenProps<RootStackParamList>

interface ButtonProps extends Props {
  to: 'Main' | 'SignIn' | 'SignUp' | 'PhoneAuth' | 'SearchAddress',
  text: string,
  // route?:any,
}

export default function Button(
  { navigation, to, text }: ButtonProps,
) {
  return (
    <TouchableButton
      onPress={() => {
        navigation.navigate('Auth', {
          screen: to,
        });
      }}
    >
      <ButtonText>
        {text}
      </ButtonText>
    </TouchableButton>
  );
}
