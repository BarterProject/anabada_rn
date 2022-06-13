import React from 'react';
import styled from 'styled-components/native';
import { TextFontAramL } from '../../Font';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
    margin-top: 100px;
`;

const Text = styled(TextFontAramL)`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function AppInfo() {
  return (
    <Container>
      <Text>
        clip 1.0.0
      </Text>
    </Container>
  );
}
