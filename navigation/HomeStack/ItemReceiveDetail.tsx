import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';

import {
  TouchableOpacity, Text, View, ActivityIndicator, Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Slide from './components/Slide';

import {
  Inputs, Button, InputColumn, CommonText, InputValue,
} from '../ItemStack/utils';

import { dealApi } from '../../api';
import { resetRandomItems, setItemToDeal } from '../../slice';

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

function ItemReceiveDetail({ route, navigation: { navigate } }:
  { route: { params }, navigation: { navigate: Function } }) {
  // console.log(route.params);
  const { item, dealIdx } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    idx: itemIdx,
    name,
    description,
    deposit,
    images,
    state,
    itemCategory: { name: categoryName },
  } = item;
  console.log(item);
  console.log('ItemReceiveDetail dealIdx', dealIdx);
  console.log('ItemReceiveDetail itemIdx', itemIdx);

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
          {state === 1
            ? (
              <ButtonsContainer>
                <SmallButton
                  disabled={loading}
                  onPress={async () => {
                    setLoading(true);
                    console.log('요청승인');
                    dealApi.acceptDealRequested(dealIdx).then(
                      (result) => {
                        console.log('요청성공', result);
                        navigate('Main');
                        dispatch(setItemToDeal(itemIdx));
                        dispatch(resetRandomItems());
                      },
                    ).catch((error) => {
                      console.log('요청실패');
                      console.log(error);
                      if (error.response.status === 400) {
                        Alert.alert('1분만 기다려 주세요');
                      }
                      // if (error.data.errorCode === "B0001") {
                      // }
                    }).finally(() => {
                      setLoading(false);
                    });
                  }}
                >
                  {
                    loading
                      ? <ActivityIndicator size="small" />
                      : (
                        <WhiteText>
                          요청 승인
                        </WhiteText>
                      )
                  }

                </SmallButton>
                <SmallButton
                  onPress={async () => {
                    setLoading(true);
                    console.log('요청취소');
                    try {
                      const { data } = await dealApi.declineDealRequested(dealIdx);
                      navigate('ItemDeals', { screen: '받은 요청', params: { getNewData: true } });
                    } catch (e) {
                      console.log('요청실패');
                      console.log({ ...e });
                      if (e.response.status === 400) {
                        Alert.alert('1분만 기다려 주세요');
                      }

                      console.log(e.response);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {
                    loading
                      ? <ActivityIndicator size="small" />
                      : (
                        <WhiteText>
                          요청 취소
                        </WhiteText>
                      )
                  }
                </SmallButton>
              </ButtonsContainer>
            ) : null}

        </Container>

      </KeyboardAwareScrollView>
    )
      : <View><Text>Loading</Text></View>
  );
}

export default ItemReceiveDetail;
