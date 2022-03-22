import React from 'react';

import styled from 'styled-components/native';

import Postcode from '@actbase/react-daum-postcode';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setAddressinfo } from '../../slice';

const Container = styled.View`
    flex:1;
`;

const Header = styled.View`
    flex:1;
`;

export default function SearchAddrees() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log('test');
  function YourView() {
    return (
      <Postcode
        style={{ flex: 7 }}
        jsOptions={{ animation: true }}
        onSelected={(data) => {
        // console.log(data.zonecode, data.address)
          const { zonecode, address } = data;
          dispatch(setAddressinfo({ zonecode, address }));
          navigation.goBack();
        }}
        onError={(error: unknown): void => {
          throw new Error('Function not implemented.');
        }}
      />
    );
  }

  return (
    <Container>
      <Header />
      <YourView />
    </Container>
  );
}
