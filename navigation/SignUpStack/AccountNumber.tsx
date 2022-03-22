import React, { useEffect, useState } from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

import SelectBank from './components/SelectBank';
import ButtonFit from './components/ButtonFit';
import { setAccountNumber } from '../../slice';

const Container = styled.View`
    flex: 1;
    padding-top:100px;
    align-items:center;
`;

const Form = styled.View`
  flex:1;
  width:300px;
`;

const AccountContainer = styled.View`
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

export default function AccountNumber() {
  const [account, setAccount] = useState('');
  useEffect(() => {
    setAccountNumber(account);
  }, [account]);

  return (
    <Container>
      <Form>
        <Text>
          AccountNumber
        </Text>
        <AccountContainer>
          <Title>보증금 반환 계좌</Title>
          <SelectBank />
          <TextInput
            placeholder="-없이 입력해주세요"
            onChangeText={(text) => { setAccount(text); }}
          />
        </AccountContainer>
        <ButtonFit
          to="Success"
          text="next"
        />
      </Form>
    </Container>
  );
}
