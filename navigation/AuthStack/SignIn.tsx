import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
  color: white;
`;

const Button = styled.TouchableOpacity`
  background-color:#689633;
  height: 43px;
  width: 210px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

const TextInput = styled.TextInput`
  width:210px;
  height:48px;
  background: #F2F2F2;
  border-radius: 20px;
  border: 1px;
  padding-left:20px;
`;

export default function SignIn({ navigation }) {
  return (
    <Container>
      <TextInput placeholder="아이디" />
      <TextInput placeholder="비밀번호" />
      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <ButtonText>
          로그인
        </ButtonText>
      </Button>
    </Container>
  );
}
