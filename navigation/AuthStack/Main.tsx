import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
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

export default function Main({ navigation }) {
  return (
    <Container>
      <Button
        onPress={() => {
          navigation.navigate('Auth', {
            screen: 'SignIn',
          });
        }}
      >
        <ButtonText>
          로그인
        </ButtonText>
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('Auth', {
            screen: 'SignUp',
          });
        }}
      >
        <ButtonText>
          회원가입
        </ButtonText>
      </Button>
    </Container>
  );
}
