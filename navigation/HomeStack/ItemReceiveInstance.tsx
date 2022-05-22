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

const Status = styled.Text`
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

function ItemReceiveInstance({
  item,
  passport,
  connectedUser,
  idx,
  status,
  dealIdx,
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
  dealIdx: number,
}) {
  // const { navigate, goBack } = useNavigation();
  // const dispatch = useDispatch();
  // const [item, setItem] = useState(null);

  const navigation = useNavigation();

  const [text, setText] = useState<string>();

  useEffect(() => {
    console.log(status);
    if (status === 2) {
      setText('교환중');
    } else if (status === 3) {
      setText('종료');
    } else if (status === 4) {
      setText('등록 대기');
    } else if (status === 5) {
      setText('환불요청');
    } else if (status === 6) {
      setText('환불 완료');
    } else if (status === 7) {
      setText('보증금 반환요청');
    }
  }, [status]);
  return (
    <Container width={width}>
      {item ? (
        <TouchableOpacity
          onPress={() => {
            // clickable;
            navigation.navigate('ItemReceiveDetail', {
              item,
              dealIdx,
            }); console.log(`${idx}선택완료`);
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

export default ItemReceiveInstance;
