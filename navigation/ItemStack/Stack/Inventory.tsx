import Icon from 'react-native-vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Text, View, ActivityIndicator,
} from 'react-native';
import { itemApi } from '../../../api';
import { itemType } from '../../../types';
import ItemInventory from '../components/ItemInventory';

import { Fresh } from '../utils';

function Inventory({ route: { params }, navigation: { setOptions } }: {
  route: { params: { getNewData: boolean } },
  navigation: { setOptions: Function }
}) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const getMyInventory = useCallback(async () => {
    try {
      const { data } = await itemApi.getMyInvetory();
      setItems(data.filter((item:itemType) => item.state !== 0));
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

  const getRefreshment = async () => {
    setLoading(true);
    getMyInventory();
    setLoading(false);
  };

  return items ? (
    <View style={{ flex: 1 }}>
      <ItemInventory items={items} />
      <Fresh disabled={loading} onPress={getRefreshment}>
        {loading ? <ActivityIndicator size="small" color="#e94057" /> : (
          <Text>
            <Icon
              size={35}
              color="#e94057"
              name="refresh-outline"
            />
          </Text>
        )}

      </Fresh>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color="white" size={30} />
    </View>
  );
}

export default Inventory;
