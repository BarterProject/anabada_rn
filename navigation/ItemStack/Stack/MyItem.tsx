import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

import { itemApi } from '../../../api';

import ItemList from '../components/ItemList';

import { Fresh } from '../utils';

function MyItem({ route: { params } }: { route: { params: { getNewData: boolean } } }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMyItem = useCallback(async () => {
    try {
      const { data } = await itemApi.getMyItem();
      setItems(data);
      console.log(data);
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

  const getRefreshment = async () => {
    setLoading(true);
    getMyItem();
    setLoading(false);
  };

  return items ? (
    <View style={{ flex: 1 }}>
      <ItemList items={items} />
      <Fresh disabled={loading} onPress={getRefreshment}>
        {loading ? <ActivityIndicator size="small" color="#e94057" /> : (
          <Text>
            <Ionicons
              size={35}
              color="#e94057"
              name="refresh-outline"
            />
          </Text>
        )}

      </Fresh>
    </View>
  ) : null;
}

export default MyItem;
