import React from 'react';

import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

import ButtonFit from './components/ButtonFit';

const Container = styled.View`
    flex: 1;
`;

const Text = styled.Text`
  font-size:40px;
  top:50px;
`;

const Header = styled.View`
  flex:1;
`;

const Body = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
  top:-50px;
`;

const Footer = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
  padding-left:5px;
  padding-right:5px;
`;

export default function Success() {
  // 토큰 생성해서 redux에 저장
  return (
    <Container>

      <Header />
      <Body>
        <AntDesign
          name="checkcircleo"
          size={200}
          color="#E94057"
        />
        <Text>
          회원가입 완료
        </Text>
      </Body>
      <Footer>
        <ButtonFit
          text="들어가기"
          to="SignIn"
        />
      </Footer>
    </Container>
  );
}
