import React, { useEffect } from 'react';

import styled from 'styled-components/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { AuthStackParamList } from '../Auth';
import { initialStateProps, requestSignUp } from '../../slice';

// import { useSelector } from 'react-redux';

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

const TouchableButton = styled.TouchableOpacity`
    background-color:#E94057;
    height: 43px;
    width: 100%;
    border-radius: 15px;
    justify-content:center;
    align-items:center;
    color: white;
    /* margin:5px; */
    margin-top:30px;
  `;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

type SuccessProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>

export default function Success({ navigation }: SuccessProps) {
  const { signUpField } = useSelector((state: initialStateProps) => ({
    signUpField: state.signUpField,
  }));
  const {
    id, password, phoneNumber, addressinfo, accountNumber, bankName
  } = signUpField
  console.log('Success의 signUpField:', signUpField);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestSignUp({
      id, password, phoneNumber, addressinfo, accountNumber, bankName
    }));
  }, []);

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
        {/* <ButtonFit
          text="들어가기"
          to="SignIn"
        /> */}
        <TouchableButton
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              }),
            );
            // navigation.navigate('SignIn');
          }}
        >
          <ButtonText>
            가입완료
          </ButtonText>
        </TouchableButton>

      </Footer>
    </Container>
  );
}
