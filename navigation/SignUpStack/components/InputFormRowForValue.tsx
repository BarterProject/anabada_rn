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
  background-color:#E6E6E6;
  width:200px;
  height:50px;
  border-radius:25px;
  padding-left:20px;
  font-family: '210AramGothicL';
`;

interface InputFormRowForValueProps {
  title: string,
  placeholder: string,
  value: string
}

export default function InputFormRowForValue(
  { title, placeholder, value }
    : InputFormRowForValueProps,
) {
  return (
    <Container>
      <Title>{title}</Title>
      <TextInput
        editable
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
      />
    </Container>
  );
}
