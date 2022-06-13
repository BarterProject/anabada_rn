import React, { useEffect } from 'react';

import styled from 'styled-components/native';
import { TextFontAramL } from '../../Font';

import { Button, ButtonText } from './utils/index';

// import { imageToSendType } from '../../types';

const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
 align-items: center;
 padding:35px 25px 0 25px;
`;

const StatusText = styled(TextFontAramL)`
  color: black;
  font-size: 17px;
  font-weight: 300;
  
`;

function Enroll({
  navigation: { setOptions, navigate },
  route: {
    params: {
      title, bigMsg, smallMsg, screen, getNewData,
    },
  },
}: {
  navigation: { setOptions: Function, navigate: Function },
  route: { params: { title: string, bigMsg: string, smallMsg: string, screen: string, getNewData: boolean } }
}) {
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title,
    });
  }, []);

  return (
    <Container>
      <StatusText>

        {bigMsg}
      </StatusText>
      <StatusText style={{ marginTop: 20 }}>
        {smallMsg}
      </StatusText>

      <Button
        style={{ marginTop: 50 }}
        onPress={() => {
          navigate('Main', { screen, params: { getNewData } });
        }}
      >
        <ButtonText>돌아가기</ButtonText>
      </Button>

    </Container>
  );
}

export default Enroll;
