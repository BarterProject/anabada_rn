import React from 'react';
import styled from 'styled-components/native';

export type MyInfoProps = {
    activated: boolean
    address: string
    auth: string
    bankAccount: string
    bankKind: string
    createdAt: string
    email: string
    phone: string
}

export type InfoProps = {
    title:string,
    description :string
}

export const Container = styled.View`
    flex: 1;
    padding-top: 100px;
    justify-content:flex-start;
    align-items:center;
    background-color: white;
`;

export const Inputs = styled.View`
  width: 100%;
  padding: 0 25px;
  /* background-color: blue; */
  /* justify-content:flex-start;
  align-items:flex-start;
  flex-direction:column; */
`;

export const InputRow = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  margin-bottom:15px;
  /* justify-content:center; */
`;

export const Text = styled.Text`
    flex: 2;
    justify-content:center;
    align-items:center;
`;

export const InputTitle = styled.TextInput.attrs({
  editable: false,
  placeholderTextColor: '#626262',
})`
  flex: 8;
  background-color: #f2f2f2;
  height: 50px;
  width: 50%;
  color: black;
  /* width: 100%; */
  border-radius: 10px;
  /* margin-bottom: 15px; */
  padding: 10px 15px;

`;

export function Info({ title, description }:InfoProps) {
  return (
    <InputRow>
      <Text>
        {title}
      </Text>
      <InputTitle
        value={description}
      />
    </InputRow>
  );
}
