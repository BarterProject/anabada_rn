import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { getMyInfo } from '../../api';
import {
  Container, Info, Inputs, MyInfoProps,
} from './components/MyInfoComponents';

export default function MyInfo() {
  const [myInfo, setMyInfo] = useState<MyInfoProps>();

  useEffect(() => {
    getMyInfo().then((info) => {
      console.log(info.data);
      setMyInfo(info.data);
    });
  }, []);

  return (
    <Container>
      {
        myInfo
          ? (
            <Inputs>
              <Info title="이메일" description={myInfo.email} />
              <Info title="연락처" description={myInfo.phone} />
              <Info title="우편번호" description={myInfo.address.split('/')[0]} />
              <Info title="주소" description={myInfo.address.split('/')[1]} />
              <Info title="상세 주소" description={myInfo.address.split('/')[2]} />
              <Info title="계좌은행" description={myInfo.bankKind} />
              <Info title="계좌번호" description={myInfo.bankAccount} />

            </Inputs>
          )
          : <ActivityIndicator size="large" />
      }
    </Container>
  );
}
