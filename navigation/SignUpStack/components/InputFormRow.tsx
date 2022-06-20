import React from 'react';

import styled from 'styled-components/native';
import { TextFontAramL } from '../../../Font';

const Container = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  margin-top:10px;
`;

const Title = styled(TextFontAramL)`
  font-size:20px;
`;

const TextInput = styled.TextInput`
  font-family: '210AramGothicL';
  background-color:#E6E6E6;
  width:200px;
  height:50px;
  border-radius:25px;
  padding-left:20px;
`;

interface InputFormRowProps {
  title: string,
  placeholder: string,
  setText: any
}

export default function InputFormRow({ title, placeholder, setText }: InputFormRowProps) {
  function handleChangeText(text: string) {
    setText(text);
  }
  return (
    <Container>
      <Title>{title}</Title>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => { handleChangeText(text); }}
        autoCapitalize="none"
      />
    </Container>
  );
}
