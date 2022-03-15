import React from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;

export default function Home() {
  return (
    <Container>
      <Text>
        Home
      </Text>
    </Container>
  );
}
