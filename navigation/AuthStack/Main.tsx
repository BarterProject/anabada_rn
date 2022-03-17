import React from 'react';

import styled from 'styled-components/native';

import Button from './components/Button';
import ServiceInfoPressableText from './components/ServiceInfoPressable';

const Container = styled.View`
  flex:1;
`;

const TitleContainer = styled.View`
  top:80px;
`;

const Title = styled.Text`
  font-size:80px;
  color:#E94057;
`;

const ButtonsContainer = styled.View`
  align-items:center;
`;

const ServiceInfoContainer = styled.View`
  flex-direction:row;
  justify-content:space-around;
  bottom:50px;
`;

const Footer = styled.View`
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
`;

const Header = styled.View`
  flex:1;
  align-items:center;
  justify-content:flex-end;
  
`;

const Body = styled.View`
  flex:1;
  justify-content:flex-end;

`;

export default function Main({ navigation }:any) {
  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>CLIP</Title>
        </TitleContainer>
      </Header>

      <Body>
        <ButtonsContainer>
          <Button
            navigation={navigation}
            to="SignIn"
            text="로그인"
          />
          <Button
            navigation={navigation}
            to="SignUp"
            text="회원가입"
          />
        </ButtonsContainer>
      </Body>

      <Footer>
        <ServiceInfoContainer>
          <ServiceInfoPressableText
            navigation={navigation}
            to="#"
            text="이용안내"
          />
          <ServiceInfoPressableText
            navigation={navigation}
            to="#"
            text="서비스 약관 및 정책"
          />
        </ServiceInfoContainer>
      </Footer>
    </Container>
  );
}
