import React from 'react';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TextFontAramL } from '../../../Font';

const Container = styled.View`
  padding: 0 30px;
  width: 100%;
  height: 50px;
  flex-direction: row;
  /* margin-bottom: 10px; */
`;

const AlarmType = styled.View`
  width: 50px;
  height: 50px;
  background-color: rgba(236, 101, 120, 0.19);
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const AlarmContent = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 30px;
`;

const Content = styled(TextFontAramL)`
  color: #757575;
  font-size: 16px;
`;

function AlarmColumn({ content }: { content: string }) {
  return (
    <Container>
      <AlarmType>
        <Icon size={25} name="cube-outline" color="#E94057" />
      </AlarmType>
      <AlarmContent>
        <Content>{content}</Content>
      </AlarmContent>
    </Container>
  );
}

export default AlarmColumn;
