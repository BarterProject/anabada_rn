import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import Slide from './components/Slide';

import {
  InputTitle, InputContent, InputColumn, CommonText, InputValue,
} from './utils';

import { itemApi } from '../../api';
import { initialStateProps } from '../../slice';

const Container = styled.ScrollView`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const Btn = styled.TouchableOpacity``;

const Inputs = styled.View`
  padding: 0 25px;
`;

const StatusText = styled.Text`
  color: black;
  font-size: 20px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
`;

const CategoryBtn = styled.Pressable`
  
`;
function Enroll({
  navigation: { setOptions },
  route: { params },
}: {
  navigation: { setOptions: Function },
  route:{params:{idx:number, type:string}}
}) {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [category, setCategory] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [imgList, setImgList] = useState([]);
  const [categoryCheck, setCategoryCheck] = useState(null);
  const [paymentCheck, setPaymentCheck] = useState(null);

  const {
    accessToken,
  } = useSelector(
    (state:initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );
  const getCategories = async () => {
    const { data } = await itemApi.getCategories(accessToken);
    // const newData = data.map((e:categoryType) => ({ ...e, check: false }));
    setCategory(data);
  };

  const getPaymentOptions = async () => {
    const { data } = await itemApi.getPaymentOptions(accessToken);
    setPaymentOption(data);
  };

  const saveItem = async () => {
    const item = {
      name: 'test!!!', description: '배성연화이팅22', clause_agree: true, payment: { amount: 30000, paymentOption: { idx: 3 } }, itemCategory: { idx: 3 },
    };
    try {
      const { data } = await itemApi.saveItem(accessToken, item, imgList);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title: '아이템 등록하기',
      headerLeft: () => (
        <Btn
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>
            <Ionicons size={30} name="chevron-back-outline" />
          </Text>
        </Btn>
      ),
    });
    getCategories();
    getPaymentOptions();
  }, []);
  useEffect(() => {
    if (params) {
      // eslint-disable-next-line no-unused-expressions
      params.type === 'category' ? setCategoryCheck(params.idx)
        : setPaymentCheck(params.idx);
    }
  }, [params]);

  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>
      <Container>
        <Slide imgList={imgList} setImgList={setImgList} edit />
        <Inputs>
          <InputTitle placeholder="제품명" />
          <InputContent
            placeholder="설명"
            multiline
            numberOfLines={10}
            style={{ textAlignVertical: 'top' }}
          />
          <CategoryBtn onPress={() => {
            navigation.navigate('Item', {
              screen: 'SelectOption',
              params: { itemList: category, check: categoryCheck, type: 'category' },
            });
          }}
          >
            <InputColumn style={{ marginTop: 20 }}>
              <CommonText>{categoryCheck ? category[categoryCheck - 1].name : '카테고리 선택'}</CommonText>

              <Ionicons size={20} name="chevron-forward-outline" color="black" />
            </InputColumn>
          </CategoryBtn>
          <CategoryBtn onPress={() => {
            navigation.navigate('Item', {
              screen: 'SelectOption',
              params: { itemList: paymentOption, check: paymentCheck, type: 'payment' },
            });
          }}
          >
            <InputColumn style={{ marginTop: 20 }}>
              <CommonText>{paymentCheck ? paymentOption[paymentCheck - 1].name : '결제수단 선택'}</CommonText>

              <Ionicons size={20} name="chevron-forward-outline" color="black" />
            </InputColumn>
          </CategoryBtn>
          <InputColumn>
            <CommonText>보증금</CommonText>
            <InputValue />
          </InputColumn>
          <StatusText>
            <Ionicons size={20} name="warning" color="#ffe222" />
            계좌번호 0000-000-00000에 계좌이체 하셔야 등록이 완료됩니다.
          </StatusText>
          <InputColumn>
            <CommonText>계약명세서 (더보기)</CommonText>
            <View style={{ flexDirection: 'row' }}>
              <CommonText>동의</CommonText>
              <Checkbox
                style={{ marginLeft: 10 }}
                value={isChecked}
                onValueChange={setChecked}
              />
            </View>
          </InputColumn>
          <Button style={{ marginBottom: 20 }} onPress={() => { saveItem(); }}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>
              등록완료
            </Text>
          </Button>
        </Inputs>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default Enroll;
