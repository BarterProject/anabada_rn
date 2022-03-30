import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function ItemDetail() {
  return (
    <Container>
      <Text>
        ItemDetail
      </Text>
    </Container>
  );
}
