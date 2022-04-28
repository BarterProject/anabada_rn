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

const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function Receives() {
  const [idxs, setIdxs] = useState([]);

  const { chosenItemId } = useSelector((state : initialStateProps) => ({
    chosenItemId: state.chosenItemId,
  }));

  const getRequestedDeals = useCallback(async () => {
    // const
    dealApi.getRequestedDeals({
      resqustedId: chosenItemId,
    }).then(({ data }) => {
      console.log('getRequestedDeals', data.idx);

      const receiveAndDealIdx = data.map((deal) => ({
        receiveIdxs: deal.requestItem.idx,
        dealIdx: deal.idx,
      }));
      // const reqeustAndDealIdx = data.map((deal) => ({
      //   reqeustIdxs: deal.responseItem.idx,
      // }));
      setIdxs(receiveAndDealIdx);
    });
    console.log('렌더가 다시되싸!');
  }, []);

  useEffect(() => {
    getRequestedDeals();
  }, []);

  return idxs.length > 0 ? <ItemReceives itemIdxs={idxs} />
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
