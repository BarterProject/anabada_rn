import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { TouchableOpacity, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Slide from './components/Slide';

import {
  InputContent, Inputs, InputTitle, Button, ButtonText, InputColumn, CommonText, InputValue,
} from '../ItemStack/utils';

import { itemApi } from '../../api';
import { itemType } from '../../types';

const Container = styled.ScrollView``;

const ItemName = styled.Text`
  font-size: 36;
  font-weight:600;

`;
const ItemNameContainer = styled.View`
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;
  padding-bottom: 20px;
  /* padding-left:10px; */
`;

const Deposit = styled.Text`
  font-size: 20;
  font-weight:600;
`;

const Description = styled.Text`
  
`;

const DescriptionContainer = styled.View`
  background-color: #eae9e9;
  padding: 10px;
  border-radius: 15px;

`;

function ItemRequestDetail({ route }) {
  console.log(route.params);
  const { item, dealIdx }: { item: itemType, dealIdx: number } = route.params;
  const {
    name,
    description,
    deposit,
    images,
    itemCategory: { name: categoryName },
  } = item;

  console.log('ItemRequestDetail', dealIdx);
  return (
    item ? (
      <KeyboardAwareScrollView extraScrollHeight={30}>
        <Container>
          <Slide imgList={images} />
          <Inputs>
            <ItemNameContainer>
              <ItemName>
                {name}
              </ItemName>
              <Deposit>
                {deposit}
                원
              </Deposit>
            </ItemNameContainer>
            <DescriptionContainer>
              <Description>
                {description}
              </Description>
            </DescriptionContainer>
            <InputColumn style={{ marginTop: 30 }}>
              <CommonText>카테고리</CommonText>
              <InputValue
                textAlign="center"
                value={categoryName}
                editable={false}
                style={{
                  color: 'black',
                }}
              />
            </InputColumn>
          </Inputs>
        </Container>
      </KeyboardAwareScrollView>
    )
      : <View><Text>Loading</Text></View>
  );
}

export default ItemRequestDetail;
