/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Text, Platform, TouchableOpacity, ActivityIndicator,
} from 'react-native';

import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';
import DropShadow from 'react-native-drop-shadow';

import { BASE_URL } from '@env';

import { useNavigation } from '@react-navigation/native';
import { itemType } from '../../types';
import { TextFontAramL } from '../../Font';

const Container = styled.View<{ width: number }>`
  width: ${(props) => `${props.width}%`};
  height: 160px;
  flex-shrink: 0;
  padding: 7px;
`;

const Item = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
`;

const Status = styled(TextFontAramL)`
  font-size: 15px;
`;

const AndroidStatus = styled.View`
  width: 100%;
  height: 30px;
  background-color: white;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
`;

function ItemRequestInstance({
  item,
  passport,
  connectedUser,
  idx,
  dealIdx,
  status,
  clickable,
  width,

}: {
  item: itemType,
  connectedUser: number,
  passport: boolean,
  status: number,
  clickable: boolean,
  width: number,
  idx: number,
  dealIdx: number
}) {
  // const { navigate, goBack } = useNavigation();
  // const dispatch = useDispatch();
  // const [item, setItem] = useState(null);
  const navigation = useNavigation();

  return (
    <Container width={width}>
      {item ? (
        <TouchableOpacity
          onPress={() => {
            clickable;
            // dispatch(setItemToDeal(idx));
            navigation.navigate('ItemRequestDetail', { item, dealIdx });
            console.log(`${idx}선택완료`);
          }}
        >
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 2,
            }}
          >
            <Item
              source={{
                uri: `${BASE_URL}/api/v2/items/images/${item.images[0].name}`,
              }}
              resizeMode="cover"
              imageStyle={{ borderRadius: 25 }}
            />
          </DropShadow>
        </TouchableOpacity>
      )
        : (
          <ActivityIndicator
            size="small"
            color="black"
          />
        )}

    </Container>
  );
}

export default ItemRequestInstance;
