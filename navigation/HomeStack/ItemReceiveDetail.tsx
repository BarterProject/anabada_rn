import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { TouchableOpacity, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Slide from './components/Slide';

import {
  InputContent, Inputs, InputTitle, Button, ButtonText, InputColumn, CommonText, InputValue,
} from '../ItemStack/utils';

import { dealApi, itemApi } from '../../api';
import { itemType } from '../../types';
import { acceptDeal } from '../../slice';

// const Container = styled.ScrollView`
//     position: relative;
// `;

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

const ButtonsContainer = styled.View`
flex-direction:row;
/* align-items: ; */
justify-content:space-around;
`;
const SmallButton = styled(Button)`
  width:40%;
`;
const WhiteText = styled(Text)`
  color: white;
  font-size: 16;
`;

function ItemReceiveDetail({ route }) {
  // console.log(route.params);
  const { item, dealIdx } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    idx: itemIdx,
    name,
    description,
    deposit,
    images,
    itemCategory: { name: categoryName },
  } = item;

  console.log('ItemReceiveDetail', dealIdx);

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
          <ButtonsContainer>
            <SmallButton
              onPress={async () => {
                console.log('요청승인');
                dispatch(acceptDeal({ dealIdx, itemIdx }));
                navigation.navigate('Main');
              }}
            >
              <WhiteText>
                요청 승인
              </WhiteText>
            </SmallButton>
            <SmallButton
              onPress={() => {
                console.log('요청취소');
                dealApi.declineDealRequested(dealIdx).then((result) => {
                  console.log(result);
                  navigation.goBack();
                }).catch((error) => { console.log(error); });
              }}
            >
              <WhiteText>
                요청 취소
              </WhiteText>
            </SmallButton>
          </ButtonsContainer>
        </Container>

      </KeyboardAwareScrollView>
    )
      : <View><Text>Loading</Text></View>
  );
}

export default ItemReceiveDetail;
