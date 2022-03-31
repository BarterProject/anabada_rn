import React from 'react';

import styled from 'styled-components/native';

import Postcode from '@actbase/react-daum-postcode';
// import Postcode from 'react-native-daum-postcode';

import { useDispatch } from 'react-redux';

import { setAddressinfo } from '../../slice';

const Container = styled.View`
    flex:1;
`;

const Header = styled.View`
    flex:1;
`;

export default function SearchAddrees({ navigation }) {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  console.log('test');
  function YourView() {
    return (
      <Postcode
        style={{ flex: 7 }}
        jsOptions={{ animation: true }}
        // onComplete={handleComplete}
        onSelected={(data) => {
        // console.log(data.zonecode, data.address)
          const { zonecode, address } = data;
          dispatch(setAddressinfo({ zonecode, address, addressDetail: '' }));
          console.log(zonecode, address);
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
