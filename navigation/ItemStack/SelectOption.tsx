import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

import { categoryType, deliveryType, paymentOptionType } from '../../types';

const Btn = styled.TouchableOpacity``;

const Container = styled.ScrollView`
`;
const CategoryContainer = styled.Pressable`
    padding:0 20px;
    flex-direction: row;
    width:100%;
    justify-content:space-between;
    align-items: center;
    height:45px;
`;

const CategoryTitle = styled.Text<{ check: boolean }>`
    color:${(props) => (props.check ? '#e94057' : 'black')};
    font-weight: ${(props) => (props.check ? 700 : 300)};
`;

const CategoryCheck = styled.View``;

function Category({
  navigation: { setOptions, goBack, navigate },
  route: { params },
}: {
  navigation: { setOptions: Function, goBack: Function, navigate: Function },
  route: {
    params: {
      itemList: categoryType[] | paymentOptionType[],
      check: number,
      type: string,
      delivery: deliveryType,
      itemUrl: string,
      itemName: string,
      itemDescription: string,
    }
  }
}) {
  const setTitle = () => {
    if (params.type === 'category') {
      return '카테고리 선택';
    }
    if (params.type === 'payment') {
      return '결제수단 선택';
    }
    return '택배사 선택';
  };
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: true,
      title: setTitle(),
      headerLeft: () => (
        <Btn
          onPress={() => {
            goBack();
          }}
        >
          <Text>
            <Ionicons size={30} name="chevron-back-outline" />
          </Text>
        </Btn>
      ),
    });
  }, []);
  return (
    <Container>
      {params ? params.itemList.map((item: categoryType | paymentOptionType, idx: number) => (
        <CategoryContainer
          style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}
          onPress={() => {
            navigate('Item', {
              screen: params.type === 'category' || params.type === 'payment' ? 'Enroll' : 'ItemRefund',
              params: {
                idx,
                type: params.type,
                delivery: params.delivery,
                itemUrl: params.itemUrl,
                itemName: params.itemName,
                itemDescription: params.itemDescription,
              },
            });
          }}
          key={item.idx}
        >
          <CategoryTitle check={params.check === idx}>{item.name}</CategoryTitle>
          {params.check === idx ? (
            <CategoryCheck>
              <Ionicons size={25} name="checkmark-outline" color="#e94057" />
            </CategoryCheck>
          ) : null}
        </CategoryContainer>
      )) : null}

    </Container>
  );
}

export default Category;
