import React, { useEffect } from 'react';

import styled from 'styled-components/native';

import { Button, ButtonText } from './utils/index';

// import { imageToSendType } from '../../types';

const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
 align-items: center;
 padding:35px 25px 0 25px;
`;

const StatusText = styled.Text`
  color: black;
  font-size: 17px;
  font-weight: 300;
`;

function TrackingConfirm({
  navigation: { setOptions, navigate },
  route: { params },
}: {
  navigation: { setOptions: Function, navigate:Function },
  route:{params:{title:string, type:string}}
}) {
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title: '운송장번호 등록완료',
    });
  }, []);

  return (
    <Container>
      <StatusText>
        아이템
        {params.title}
        의 운송장번호가 등록되었습니다.
      </StatusText>
      <StatusText>
        보증금 입금은 잠시 기다려주십시오.
      </StatusText>

      <Button
        style={{ marginTop: 50 }}
        onPress={() => {
          navigate('Main', { screen: '아이템', params: { getNewData: true } });
        }}
      >
        <ButtonText>돌아가기</ButtonText>
      </Button>

    </Container>
  );
}

export default TrackingConfirm;
