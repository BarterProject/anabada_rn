import React, { useCallback, useEffect, useState } from 'react';
import { itemApi } from '../../../api';
import ItemInventory from '../components/ItemInventory';

function Inventory({ route: { params } }:{route:{params:{getNewData:boolean}}}) {
  const [items, setItems] = useState(null);
  const getMyInventory = useCallback(async () => {
    try {
      const { data } = await itemApi.getMyInvetory();
      setItems(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMyInventory();
  }, []);

  useEffect(() => {
    if (params) {
      if (params.getNewData) {
        getMyInventory();
      }
    }
  }, [params]);

  return items ? <ItemInventory items={items} /> : null;
}

export default Inventory;
