import React, { useEffect, useState } from 'react';
import { itemApi } from '../../../api';
import ItemInventory from '../components/ItemInventory';

function Inventory() {
  const [items, setItems] = useState(null);

  const getMyInventory = async () => {
    const { data } = await itemApi.getMyInvetory();
    setItems(data);
  };

  useEffect(() => {
    getMyInventory();
  }, []);

  return items ? <ItemInventory items={items} /> : null;
}

export default Inventory;
