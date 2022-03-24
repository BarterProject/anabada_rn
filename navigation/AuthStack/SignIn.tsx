import { CommonActions } from '@react-navigation/native';
import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex:1;
  color: white;
`;

const Button = styled.TouchableOpacity`
  background-color:#E94057;
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
  margin-bottom:10px;
`;

const TitleContainer = styled.View`
  top:80px;
`;

const Title = styled.Text`
  font-size:80px;
  color:#E94057;
`;

const Header = styled.View`
  flex:1;
  align-items:center;
  justify-content:flex-end;
`;

const Body = styled.View`
  justify-content:center;
  align-items:center;
  flex:2;
  bottom:30px;
`;
interface SignInProps {
  navigation: any;
}

export default function SignIn({ navigation }: SignInProps) {
  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>CLIP</Title>
        </TitleContainer>
      </Header>
      <Body>
        <TextInput placeholder="아이디" />
        <TextInput placeholder="비밀번호" />
        <Button
          onPress={() => {
            // navigation.navigate('Home');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }),
            );
          }}
        >
          <ButtonText>
            로그인
          </ButtonText>
        </Button>
      </Body>
    </Container>
  );
}
