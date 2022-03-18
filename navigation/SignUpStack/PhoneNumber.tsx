import React from 'react';
import styled from 'styled-components/native';
import Button from './components/Button';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function PhoneNumber() {
  return (
    <Container>
      <Button
        text="next"
        to="Address"
      />
    </Container>
  );
}
