/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Text, Platform, TouchableOpacity, ActivityIndicator,
} from 'react-native';

import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { BASE_URL } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { initialStateProps, setItemToDeal } from '../../../slice';
import { itemApi } from '../../../api';

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
  passport,
  connectedUser,
  idx,
  status,
  clickable,
  width,
}: {
  connectedUser: number,
  passport: boolean,
  status: string,
  clickable:boolean,
  width: number
  idx:number;
}) {
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);

  const { accessToken } = useSelector((state : initialStateProps) => ({
    accessToken: state.userState.accessToken,
  }));

  useEffect(() => {
    itemApi.getItemInfo(accessToken, idx).then(({ data }) => {
      // console.log(data);
      setItem(data);
    });
  }, []);

  return (
    <Container width={width}>
      {item ? (
        <TouchableOpacity
          onPress={() => {
            // clickable && goBack();
            // dispatch(setItemToDeal(idx));
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
                uri: `${BASE_URL}/api/items/images/${item.images[0].name}`,
              }}
              resizeMode="cover"
              imageStyle={{ borderRadius: 25 }}
            >
              {passport ? (
                <Badge style={{ position: 'absolute', top: -5, left: -5 }}>
                  <Ionicons
                    size={13}
                    name="rocket-outline"
                    style={{ color: 'white' }}
                  />
                </Badge>
              ) : connectedUser === 0 ? null : (
                <Badge style={{ position: 'absolute', top: -5, left: -5 }}>
                  <Text style={{ fontSize: 13, color: 'white' }}>
                    {connectedUser}
                  </Text>
                </Badge>
              )}
              {status === 'normal' ? null : Platform.OS === 'ios' ? (
                <BlurView
                  intensity={50}
                  style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Status>{status}</Status>
                </BlurView>
              ) : (
                <AndroidStatus>
                  <Status>{status}</Status>
                </AndroidStatus>
              )}
            </Item>
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

export default ItemInventoryInstance;
