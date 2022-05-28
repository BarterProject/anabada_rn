/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Text, Platform, TouchableOpacity,
} from 'react-native';

import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { BASE_URL } from '@env';
import { useDispatch } from 'react-redux';
import { setItemToDeal } from '../../../slice';
import { deliveryType } from '../../../types';

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

const Badge = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #e94057;
  justify-content: center;
  align-items: center;
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

function ItemInventoryInstance({
  uri,
  connectedUser,
  status,
  clickable,
  width,
  idx,
  delivery,
}: {
  uri: string;
  connectedUser: number;
  status: number;
  clickable: boolean;
  width: number;
  passport: boolean;
  idx: number;
  delivery: deliveryType
}) {
  const { navigate } = useNavigation();

  const [text, setText] = useState<string>();

  useEffect(() => {
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
      <TouchableOpacity
        onPress={() => {
          clickable && navigate('Item', {
            screen: 'Detail',
            params: {
              readOnly: false,
              itemIdx: idx,
              inventoryMode: true,
            },
          });
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
              uri: uri.includes('https://') ? uri : `${BASE_URL}/api/v2/items/images/${uri}`,
            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 25 }}
          >
            {status === 2 ? (
              <Badge style={{ position: 'absolute', top: -5, left: -5 }}>
                <Ionicons
                  size={13}
                  name="rocket-outline"
                  style={{ color: 'white' }}
                />
              </Badge>
            ) : connectedUser === 0 ? null : (
              null
            )}
            {status === 1 ? null : Platform.OS === 'ios' ? (
              <BlurView
                intensity={50}
                style={{
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Status>{text}</Status>
              </BlurView>
            ) : (
              <AndroidStatus>
                <Status>{text}</Status>
              </AndroidStatus>
            )}
          </Item>
        </DropShadow>
      </TouchableOpacity>
    </Container>
  );
}

export default ItemInventoryInstance;
