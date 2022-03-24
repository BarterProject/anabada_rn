import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  margin-top:20px;
`;

const Title = styled.Text`
  font-size:20px;
`;

const TextInput = styled.TextInput`
  margin-top:10px;
  background-color:#E6E6E6;
  height:50px;
  width:100%;
  border-radius:25px;
  padding-left:20px;
`;

interface InputFormColumnProps{
  title:string,
  placeholder:string,
  setText:any

}
export default function InputFormColumn(
  { title, placeholder, setText }:InputFormColumnProps,
) {
  function handleChangeText(text:string) {
    setText(text);
  }
  return (
    <Container>
      <Title>{title}</Title>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => { handleChangeText(text); }}
      />
    </Container>
  );
}
