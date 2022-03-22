import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  margin-top:10px;
`;

const Title = styled.Text`
  font-size:20px;
`;

const TextInput = styled.TextInput`
  background-color:#E6E6E6;
  width:200px;
  height:50px;
  border-radius:25px;
  padding-left:20px;
`;

interface InputFormRowProps{
  title:string,
  placeholder :string,
  setText:any
}

export default function InputFormRowSecrue({ title, placeholder, setText }:InputFormRowProps) {
  function handleChangeText(text:string) {
    setText(text);
  }
  return (
    <Container>
      <Title>{title}</Title>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => { handleChangeText(text); }}
        autoCapitalize="none"
        secureTextEntry
      />
    </Container>
  );
}
