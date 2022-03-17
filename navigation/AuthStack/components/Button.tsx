import React from 'react';

import styled from 'styled-components/native';

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

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

interface ButtonProps{
  navigation:any,
  to:string,
  text:string
}

export default function Button(
  { navigation, to, text }:ButtonProps,
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
