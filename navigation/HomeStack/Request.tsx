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

export default function Request({ route: { params } }:
  {route:{params:{getNewData:boolean}}}) {
  const [requestDeals, setRequestDeals] = useState([]);

  const { chosenItemId } = useSelector((state: initialStateProps) => ({
    chosenItemId: state.chosenItemId,
  }));

  const getMyInventory = useCallback(async () => {
    // const
    dealApi.getRequestDeals({
      requestId: chosenItemId,
    }).then(({ data }) => {
      // console.log('getRequestDeals', data);
      const reqeustAndDealIdx = data.map((deal) => ({
        requestItem: deal.responseItem,
        dealIdx: deal.idx,
      }));
      setRequestDeals(reqeustAndDealIdx);
      console.log(setRequestDeals);
    });
    console.log('request Data 가져오기');
  }, []);

  useEffect(() => {
    if (params) {
      if (params.getNewData) {
        getMyInventory();
      }
    }
  }, [params]);

  useEffect(() => {
    getMyInventory();
  }, []);
  return requestDeals.length > 0 ? <ItemRequests requestDeals={requestDeals} />
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
