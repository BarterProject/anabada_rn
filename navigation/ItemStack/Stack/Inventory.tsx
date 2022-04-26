import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { itemApi } from '../../../api';
import { initialStateProps } from '../../../slice';
import ItemInventory from '../components/ItemInventory';

function Inventory() {
  const [items, setItems] = useState(null);

  const {
    accessToken,
  } = useSelector(
    (state:initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );

  const getMyInventory = useCallback(async () => {
    const { data } = await itemApi.getMyInvetory(accessToken);
    setItems(data);
    // console.log(data);
    // console.log('렌더가 다시되싸!');
  }, []);

  useEffect(() => {
    getMyInventory();
  }, []);

  // return <View><Text>Inventory</Text></View>;
  return items ? <ItemInventory items={items} /> : null;
}

export default Inventory;
