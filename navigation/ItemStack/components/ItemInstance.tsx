import React from 'react';

import { Dimensions, TouchableOpacity, Text } from 'react-native';

import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
console.log(SCREEN_WIDTH);
const Container = styled.View`
  width: 33%;
  height: 123px;
  flex-shrink: 0;
  padding: 7px;
`;

const Item = styled.ImageBackground`
  box-shadow: 0 5px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
`;

const Badge = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #e94057;
  justify-content: center;
  align-items: center;
`;

const Status = styled.Text`
  font-size: 15px;
`;

function ItemInstance({
  uri,
  connectedUser,
  status,
}: {
  uri: string;
  connectedUser: number;
  status: string;
}) {
  return (
    <Container>
      <TouchableOpacity>
        <Item
          source={{
            uri,
          }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 25 }}
        >
          {connectedUser === 0 ? null : (
            <Badge style={{ position: 'absolute', top: -10, left: -10 }}>
              <Text style={{ fontSize: 20, color: 'white' }}>2</Text>
            </Badge>
          )}
          {status === 'normal' ? null : (
            <BlurView
              intensity={13}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Status>{status}</Status>
            </BlurView>
          )}
        </Item>
      </TouchableOpacity>
    </Container>
  );
}

export default ItemInstance;
