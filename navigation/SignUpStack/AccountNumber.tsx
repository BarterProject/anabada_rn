import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { useDispatch, useSelector } from 'react-redux';
import SelectBank from './components/SelectBank';

import { initialStateProps, setAccountNumber } from '../../slice';
import { TextFontAramL } from '../../Font';

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

const Title = styled(TextFontAramL)`
  font-size:20px;
`;

const TextInput = styled.TextInput`
  margin-top:10px;
  background-color:#E6E6E6;
  height:50px;
  width:100%;
  border-radius:25px;
  padding-left:20px;
  font-family: '210AramGothicL';
`;

const ButtonText = styled(TextFontAramL)`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

const TouchableButton = styled.TouchableOpacity`
  background-color:#E94057;
  height: 43px;
  width: 100%;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
  margin-top:30px;
`;

export default function AccountNumber({ navigation }) {
  const { bankName } = useSelector((state: initialStateProps) => ({
    bankName: state.signUpField.bankName,
  }));
  const [account, setAccount] = useState('');
  const [isCompleted, setCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(bankName, account);
    if (bankName !== null && account.length > 11) {
      console.log('true');
      setCompleted(true);
    } else {
      console.log('false');
      setCompleted(false);
    }
  }, [bankName, account]);

  return (
    <Container>
      <Form>
        <AccountContainer>
          <Title>보증금 반환 계좌</Title>
          <SelectBank />
          <TextInput
            placeholder="-없이 입력해주세요"
            onChangeText={(text) => { setAccount(text); }}
          />
        </AccountContainer>
        {/* <ButtonFit
          to="Success"
          text="next"
        /> */}

        <TouchableButton
          style={{
            opacity: isCompleted ? 1 : 0.5,
            // opacity: 0.5,
          }}
          disabled={!isCompleted}
          onPress={() => {
            dispatch(setAccountNumber(account));
            navigation.navigate('Success');
          }}
        >
          <ButtonText>
            계좌 입력 완료
          </ButtonText>
        </TouchableButton>

      </Form>
    </Container>
  );
}
