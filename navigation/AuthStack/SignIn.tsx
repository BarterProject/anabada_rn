import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import { TextFontAramR, TextFontHalrowItalic } from '../../Font';
import {
  initialStateProps, requestLogin, setAccessToken, setIdForSigningIn, setPasswordForSigingIn,
} from '../../slice';
import { AuthStackParamList } from '../Auth';

const Container = styled.View`
  display:flex;
`;

const Button = styled.TouchableOpacity`
  opacity:${(props) => (props.disabled ? 0.5 : 1)};
  background-color:#E94057;
  height: 43px;
  width: 210px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
`;

const ButtonText = styled(TextFontAramR)`
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
  font-family:'210AramGothicL';
`;

const TitleContainer = styled.View`
  /* top:80px; */
`;

const Title = styled(TextFontHalrowItalic)`
  align-self:center;
  font-size:130px;
  color:#E94057;
`;

const Header = styled.View`
  flex:1;
  align-items:center;
  padding-top:200px;
  padding-bottom:60px;
  /* justify-content:flex-end; */
`;

const Body = styled.View`
  justify-content:center;
  align-items:center;
  flex:2;
  /* bottom:30px; */
`;
type SignInProps = NativeStackScreenProps<AuthStackParamList, 'PhoneAuth'>

// export default function SignIn({ navigation }: SignInProps) {
export default function SignIn() {
  const navigation: SignInProps = useNavigation();
  const [id, setId] = useState('user5@anabada.com');
  const [password, setPassword] = useState('useruser');
  const [loading, setLoading] = useState(false);
  const {
    accessToken,
  } = useSelector(
    (state: initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('????????? ????????? ????????? accessToken', accessToken);
    if (accessToken === null || undefined) {
      console.log('accessToken??? ?????? ????????????.');
      return;
    }
    if (accessToken === 'err') {
      console.log('accessToken??? ?????? ????????? ?????????..');
      dispatch(setAccessToken(''));
      Alert.alert('?????????/??????????????? ?????? ??????????????????');
    } else if (accessToken.length > 30) {
      console.log('accessToken??? ?????? ????????? ?????? ??????????????????.');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
    }
    setLoading(false);
  }, [accessToken]);
  const handleSubmit = () => {
    console.log('???????????? ???????????????.');
    setLoading(true);
    dispatch(setIdForSigningIn(id));
    dispatch(setPasswordForSigingIn(password));
    dispatch(requestLogin());
    // alert(`accessToken${accessToken}`);
  };
  return (
    <KeyboardAwareScrollView>
      <Container>
        <Header>
          <TitleContainer>
            <Title> clip </Title>
          </TitleContainer>
        </Header>
        <Body>
          <TextInput onChangeText={(text) => { setId(text); }} placeholder="?????????" />
          <TextInput secureTextEntry onChangeText={(text) => { setPassword(text); }} placeholder="????????????" />
          <Button
            disabled={loading || !id || !password}
            onPress={handleSubmit}
          >
            {loading
              ? <ActivityIndicator color="white" />
              : (
                <ButtonText>
                  ?????????
                </ButtonText>
              )}
          </Button>
        </Body>
      </Container>
    </KeyboardAwareScrollView>

  );
}
