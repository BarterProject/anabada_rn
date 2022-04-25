import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { itemApi } from '../../../api';
import { initialStateProps } from '../../../slice';

import ItemList from '../components/ItemList';

function MyItem({ route: { params } }:{route:{params:{getNewData:boolean}}}) {
  const [items, setItems] = useState(null);

  const {
    accessToken,
  } = useSelector(
    (state:initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );
  const getMyItem = useCallback(async () => {
    try {
      const { data } = await itemApi.getMyItem();
      setItems(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('렌더가 다시되싸!');
    }
  }, []);
  useEffect(() => {
    getMyItem();
  }, []);

  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    if (params) {
      if (params.getNewData) {
        getMyItem();
      }
    }
  }, [params]);

  return items ? <ItemList items={items} /> : null;
}

export default MyItem;
