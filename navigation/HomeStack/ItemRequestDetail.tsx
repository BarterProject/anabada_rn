import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { TouchableOpacity, Text, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Slide from './components/Slide';

import {
  InputContent, Inputs, InputTitle, Button, ButtonText, InputColumn, CommonText, InputValue,
} from '../ItemStack/utils';

import { dealApi, itemApi } from '../../api';
import { itemType } from '../../types';
import { TextFontAramL } from '../../Font';

const Container = styled.ScrollView``;

const ItemName = styled(TextFontAramL)`
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

const Deposit = styled(TextFontAramL)`
  font-size: 20;
  font-weight:600;
`;

const Description = styled(TextFontAramL)`
  
`;

const DescriptionContainer = styled.View`
  background-color: #eae9e9;
  padding: 10px;
  border-radius: 15px;

`;

function ItemRequestDetail({ route, navigation: { navigate } }:
  { route: { params }, navigation: { navigate: Function } }) {
  const { item, dealIdx }: { item: itemType, dealIdx: number } = route.params;

  const deleteRequest = async () => {
    try {
      const { data } = await dealApi.deleteRequest(dealIdx);
      navigate('ItemDeals', { screen: '교환 요청', params: { getNewData: true } });
    } catch (e) {
      console.log(e);
    }
  };

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
            <Button
              style={{ marginTop: 10 }}
              onPress={deleteRequest}
            >
              <ButtonText>요청 취소</ButtonText>

            </Button>
          </Inputs>
        </Container>
      </KeyboardAwareScrollView>
    )
      : <View><Text>Loading</Text></View>
  );
}

export default ItemRequestDetail;
