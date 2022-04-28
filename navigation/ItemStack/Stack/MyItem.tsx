import React, { useCallback, useEffect, useState } from 'react';

import { itemApi } from '../../../api';

import ItemList from '../components/ItemList';

function MyItem({ route: { params } }:{route:{params:{getNewData:boolean}}}) {
  const [items, setItems] = useState(null);

  const getMyItem = useCallback(async () => {
    try {
      const { data } = await itemApi.getMyItem();
      setItems(data);
    } catch (e) {
      console.log(e);
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
