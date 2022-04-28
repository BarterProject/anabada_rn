import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { initialStateProps } from '../../slice';
import { dealApi } from '../../api';
import ItemRequests from './ItemRequests';

const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function Request() {
  const [idxs, setIdxs] = useState([]);

  const { chosenItemId } = useSelector((state : initialStateProps) => ({
    chosenItemId: state.chosenItemId,
  }));

  const getMyInventory = useCallback(async () => {
    // const
    dealApi.getRequestDeals({
      requestId: chosenItemId,
    }).then(({ data }) => {
      // console.log('getRequestDeals', data);
      const reqeustAndDealIdx = data.map((deal) => ({
        reqeustIdxs: deal.responseItem.idx,
        dealIdx: deal.idx,
      }));
      setIdxs(reqeustAndDealIdx);
    });
    console.log('렌더가 다시되싸!');
  }, []);

  useEffect(() => {
    getMyInventory();
  }, []);
  return idxs.length > 0 ? <ItemRequests itemIdxs={idxs} />
    : (
      <Text
        style={{
          alignSelf: 'center',
        }}
      >
        교환 요청한 아이템이 없습니다.
      </Text>
    );
}
