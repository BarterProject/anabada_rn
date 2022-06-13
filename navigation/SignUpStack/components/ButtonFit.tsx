import React from 'react';

import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';

const ButtonText = styled(TextFontAramL)`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

interface ButtonProps {
  to: string,
  text: string,
  disabled?: boolean,
}

export default function ButtonFit(
  { disabled = false, to, text }: ButtonProps,
) {
  const navigation = useNavigation();

  const TouchableButton = styled.TouchableOpacity`
    background-color:#E94057;
    height: 43px;
    width: 100%;
    border-radius: 15px;
    justify-content:center;
    align-items:center;
    color: white;
    /* margin:5px; */
    margin-top:30px;
    opacity:${disabled ? 0.5 : 1};
  `;

  return (
    <TouchableButton
      disabled={disabled}
      onPress={() => {
        navigation.navigate(to);
      }}
    >
      <ButtonText>
        {text}
      </ButtonText>
    </TouchableButton>
  );
}
