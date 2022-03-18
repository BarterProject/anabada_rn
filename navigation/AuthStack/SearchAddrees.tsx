import React from 'react';

import styled from 'styled-components/native';

import Postcode from '@actbase/react-daum-postcode';

function YourView() {
  return (
    <Postcode
      style={{ flex: 7 }}
      jsOptions={{ animation: true }}
      onSelected={(data) => alert(JSON.stringify(data))}
      onError={function (error: unknown): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
}

const Container = styled.View`
    flex:1;
`;
const Header = styled.View`
    flex:1;
`;

export default function SearchAddrees() {
  return (
    <Container>
      <Header />
      <YourView />
    </Container>
  );
}
