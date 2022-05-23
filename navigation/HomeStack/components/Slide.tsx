/* eslint-disable no-nested-ternary */
import React from 'react';

import styled from 'styled-components/native';

import { BASE_URL } from '@env';
import { useSelector } from 'react-redux';
import { imageType } from '../../../types';
import { initialStateProps } from '../../../slice';

const Container = styled.View`
  width: 100%;
  align-items: center;
  height: 330px;
  margin: 5px 0 20px 0;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const ImageItem = styled.TouchableOpacity`
  width: 250px;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 25px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
`;

const ImageInstance = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

function Slide({ imgList }: { imgList: imageType[] }) {
  const { accessToken }:
    { accessToken: string } = useSelector((state: initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }));

  return (
    <Container>
      {imgList.length === 0
        ? null
        : (
          <Scroll
            contentContainerStyle={{ paddingHorizontal: 15 }}
            horizontal
          >
            {imgList.map(({ name, idx }) => (
              <ImageItem key={name}>
                <ImageInstance
                  source={{
                    uri: `${BASE_URL}/api/v2/items/images/${name}`,
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 25 }}
                />
              </ImageItem>
            ))}
          </Scroll>
        )}
    </Container>
  );
}

export default Slide;
