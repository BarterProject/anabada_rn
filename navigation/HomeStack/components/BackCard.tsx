import { BASE_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { initialStateProps } from '../../../slice';

import {
  CardProps,
  Container,
  DepositInfo,
  Info,
  InfoContainer,
  InfoContainerBackground,
} from './CardComponents';

export default function BackCard({
  item,
  //  declineOpacity, acceptOpacity,
}:CardProps) {
  // console.log(item);
  const {
    name,
    deposit,
    images,
  } = item;

  const { accessToken }:
  {accessToken:String} = useSelector((state:initialStateProps) => ({
    accessToken: state.userState.accessToken,
  }));

  return (
    <Container>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        source={{
          uri: (images.length === 0 || images[0] === undefined
            ? '#'
            : `${BASE_URL}/api/items/images/${images[0].name}`),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}
      />
      <InfoContainerBackground />
      <InfoContainer>
        <Info name={name} />
        <DepositInfo
          deposit={deposit}
        />
      </InfoContainer>
    </Container>
  );
}