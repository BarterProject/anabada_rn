import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import { BASE_URL } from '@env';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { initialStateProps } from '../../slice';
import { dealApi, itemApi } from '../../api';
import ItemRequests from './components/ItemRequests';

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

export default function Requested() {
  const [loading, setLoading] = useState(true);
  // const [items, setItems] = useState([]);
  const [idxs, setIdxs] = useState([]);

  const { accessToken, chosenItemId } = useSelector((state : initialStateProps) => ({
    accessToken: state.userState.accessToken,
    chosenItemId: state.chosenItemId,
  }));

  const getMyInventory = useCallback(async () => {
    // const
    dealApi.getRequestedDeals({
      accessToken,
      resqustedId: chosenItemId,
    }).then(({ data }) => {
      const reqeustIdxs = data.map((deal) => (deal.responseItem.idx));
      setIdxs(reqeustIdxs);
      // console.log(reqeustIdxs);
      // return reqeustIdxs;
    });
    // idxs.forEach((idx) => {
    //   itemApi.getItemInfo(accessToken, idx).then(({ data }) => {
    //     // console.log(data);
    //     setItems([
    //       ...items,
    //       data,
    //     ]);
    //     setLoading(idxs.length !== items.length);
    //     console.log(idxs.length !== items.length);
    //     console.log('idxs.length', idxs.length);
    //     console.log('items.length', items.length);
    //   });
    // });

    //   idxs.forEach((idx) => {
    //     itemApi.getItemInfo(accessToken, idx).then(({ data }) => {
    //       console.log(data);
    //       setItems([
    //         ...items,
    //         data,
    //       ]);
    //     });
    //   });
    // })
    // setItems(data);

    console.log('렌더가 다시되싸!');
  }, []);

  useEffect(() => {
    getMyInventory();
  }, []);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

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
  // return (
  //   <Container>
  //     <Text>
  //       {idxs.length}
  //     </Text>
  //   </Container>
  // );
  // ItemRequests;
}
