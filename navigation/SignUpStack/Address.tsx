import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { useDispatch, useSelector } from 'react-redux';

import { initialStateProps, setAddressinfo } from '../../slice';

import InputFormRow from './components/InputFormRow';
import InputFormRowForValue from './components/InputFormRowForValue';

const Container = styled.View`
    flex: 1;
    padding-top:100px;
    align-items:center;
`;

const TouchableButton = styled.TouchableOpacity`
  background-color:#E94057;
  height: 43px;
  width: 150px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
  color: white;
  margin:5px;
`;

const TouchableNextButton = styled.TouchableOpacity`
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
const PhoneAuthContainer = styled.View`
  align-items:flex-end;
`;

const Form = styled.View`
  flex:1;
  width:300px;
`;

interface AddressProps {
  navigation : any;
}

export default function Address({ navigation }:AddressProps) {
  // const [zoneCode, setZoneCode] = useState('');
  // const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [isCompleted, setCompleted] = useState(false);

  const dispatch = useDispatch();

  const { zonecode, address } = useSelector((state:initialStateProps) => ({
    zonecode: state.signUpField.addressinfo.zonecode,
    address: state.signUpField.addressinfo.address,
  }));

  useEffect(() => {
    console.log(zonecode, address);
    if (zonecode.length > 0 && address.length > 0 && addressDetail.length > 0) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [zonecode, address, addressDetail]);

  return (
    <Container>
      <Form>
        <InputFormRowForValue title="우편번호" placeholder="주소찾기를 이용해주세요" value={zonecode} />
        <InputFormRowForValue title="주소" placeholder="주소찾기를 이용해주세요" value={address} />
        <InputFormRow title="상세 주소" placeholder="" setText={setAddressDetail} />
        <PhoneAuthContainer>
          <TouchableButton
            onPress={() => {
              navigation.navigate('SearchAddress');
            }}
          >
            <ButtonText>
              주소찾기
            </ButtonText>
          </TouchableButton>
        </PhoneAuthContainer>
        {/* <ButtonFit
          to="AccountNumber"
          text="next"
        /> */}

        <TouchableNextButton
          style={{
            opacity: isCompleted ? 1 : 0.5,
            // opacity: 0.5,
          }}
          disabled={!isCompleted}
          onPress={() => {
            dispatch(setAddressinfo({ zonecode, address, addressDetail }));
            navigation.navigate('AccountNumber');
          }}
        >
          <ButtonText>
            주소 입력 완료
          </ButtonText>
        </TouchableNextButton>

      </Form>
    </Container>
  );
}
