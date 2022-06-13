import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { dealApi } from '../../api';
import { initialStateProps } from '../../slice';
import ItemReceives from './ItemReceives';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

const Text = styled(TextFontAramL)`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function Receives({ route: { params } }:
  { route: { params: { getNewData: boolean } } }) {
  const [receiveDeals, setReceiveDeals] = useState([]);

  const { chosenItemId } = useSelector((state: initialStateProps) => ({
    chosenItemId: state.chosenItemId,
  }));

  const getRequestedDeals = useCallback(async () => {
    // const
    dealApi.getRequestedDeals({
      resqustedId: chosenItemId,
    }).then(({ data }) => {
      console.log('getRequestedDeals', data);
      const receiveAndDealIdx = data.map((deal) => ({
        receiveItem: deal.requestItem,
        dealIdx: deal.idx,
      }));
      // const reqeustAndDealIdx = data.map((deal) => ({
      //   reqeustIdxs: deal.responseItem.idx,
      // }));
      setReceiveDeals(receiveAndDealIdx);
    });
  }, []);

  useEffect(() => {
    getRequestedDeals();
  }, []);

  useEffect(() => {
    if (params) {
      if (params.getNewData) {
        getRequestedDeals();
      }
    }
  }, [params]);
  return receiveDeals.length > 0 ? <ItemReceives receiveDeals={receiveDeals} />
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
