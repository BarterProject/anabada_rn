import React from 'react';
import {
  Dimensions, TouchableOpacity, Text, Platform,
} from 'react-native';

import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Container = styled.View<{ width: number }>`
  width: ${(props) => `${props.width}%`};
  height: 123px;
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

function ItemInstance({
  uri,
  connectedUser,
  status,
  clickable,
  width,
  passport,
}: {
  uri: string;
  connectedUser: number;
  status: string;
  clickable: boolean;
  width: number;
  passport: boolean;
}) {
  const { navigate } = useNavigation();

  return (
    <Container width={width}>
      <TouchableOpacity
        onPress={() => {
          clickable
            && navigate('Item', {
              screen: 'Detail',
              params: {
                uri,
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
              uri,
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
                intensity={20}
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
    </Container>
  );
}

export default ItemInstance;
