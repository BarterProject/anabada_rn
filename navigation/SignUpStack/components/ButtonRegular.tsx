import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';

import styled from 'styled-components/native';
import { TextFontAramL } from '../../../Font';

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

interface ButtonProps {
  to: string,
  text: string
}

export default function ButtonRegular(
  { to, text }: ButtonProps,
) {
  const navigation = useNavigation();

  return (
    <TouchableButton
      onPress={() => {
        Alert.alert('Clicked!');
        navigation.navigate(to);
      }}
    >
      <ButtonText>
        {text}
      </ButtonText>
    </TouchableButton>
  );
}
