import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

import { categoryType, paymentOptionType } from '../../types';

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

const CategoryTitle = styled.Text<{check:boolean}>`
    color:${(props) => (props.check ? '#e94057' : 'black')};
    font-weight: ${(props) => (props.check ? 700 : 300)};
`;

const CategoryCheck = styled.View``;

function Category({
  navigation: { setOptions, goBack, navigate },
  route: { params },
}: {
    navigation: { setOptions: Function, goBack:Function, navigate:Function},
    route:{params:{itemList:categoryType[] | paymentOptionType[], check:number, type:string}}
  }) {
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: true,
      title: params.type === 'category' ? '카테고리 선택' : '결제수단 선택',
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
      {params ? params.itemList.map((item:categoryType | paymentOptionType, idx:number) => (
        <CategoryContainer
          style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}
          onPress={() => {
            navigate('Item', {
              screen: 'Enroll',
              params: { idx, type: params.type },
            });
          }}
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
