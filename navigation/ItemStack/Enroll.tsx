import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { Text, View, Platform } from 'react-native';
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
import { itemType } from '../../types';
// import { imageToSendType } from '../../types';

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

const Button = styled.TouchableOpacity<{ dis: boolean }>`
  width: 100%;
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
  opacity:${(props) => (props.dis ? 0.3 : 1)};
`;

const CategoryBtn = styled.Pressable`
  
`;
function Enroll({
  navigation: { setOptions, navigate },
  route: { params },
}: {
  navigation: { setOptions: Function, navigate: Function },
  route: { params: { idx: number, type: string } }
}) {
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [imgList, setImgList] = useState([]);
  const [categoryCheck, setCategoryCheck] = useState(null);
  const [paymentCheck, setPaymentCheck] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agree, setAgree] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    console.log(imgList.length);
  }, [imgList]);

  useEffect(() => {
    console.log(categoryCheck, 'category');
    console.log(paymentCheck, 'payment');
  }, [categoryCheck, paymentCheck]);

  const [send, setSend] = useState(false);
  const {
    accessToken,
  } = useSelector(
    (state: initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );

  useEffect(() => {
    console.log(
      categoryCheck,
      paymentCheck,
      imgList.length,
      name.length,
      description.length,
      amount.length,
      agree,
    );
    if (categoryCheck !== null && paymentCheck !== null && imgList.length && name.length && description.length
      && amount.length && agree) {
      if (!send) {
        setSend(true);
      }
    } else if (send) {
      setSend(false);
      console.log('send-false 리렌더!');
    }
  }, [categoryCheck, paymentCheck, imgList, name, description, amount, agree]);

  const getCategories = useCallback(async () => {
    const { data } = await itemApi.getCategories();
    setCategory(data);
    console.log(data);
  }, []);

  const getPaymentOptions = useCallback(async () => {
    const { data } = await itemApi.getPaymentOptions();
    setPaymentOption(data);
  }, []);

  // eslint-disable-next-line no-shadow
  const saveItem = useCallback(async () => {
    const item = {
      name,
      description,
      clause_agree: agree,
      payment: {
        amount: parseInt(amount, 10),
        optionIdx: paymentOption[paymentCheck].idx,
      },
      categoryIdx: category[categoryCheck].idx,
    };
    try {
      const data: itemType = await itemApi.saveItem(accessToken, item, imgList, Platform.OS);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{
            name: 'EnrollConfirm',
            params: {
              title: data.name,
            },
          }],
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }, [name, description, agree, imgList, amount, paymentCheck, categoryCheck]);
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
          <InputTitle
            placeholder="제품명"
            onChangeText={(text: string) => { setName(text); }}
            value={name}
          />
          <InputContent
            placeholder="설명"
            multiline
            numberOfLines={10}
            onChangeText={(text: string) => { setDescription(text); }}
            value={description}
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
              <CommonText>{categoryCheck !== null ? category[categoryCheck].name : '카테고리 선택'}</CommonText>

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
              <CommonText>{paymentCheck !== null ? paymentOption[paymentCheck].name : '결제수단 선택'}</CommonText>
              <Ionicons size={20} name="chevron-forward-outline" color="black" />
            </InputColumn>
          </CategoryBtn>
          <InputColumn>
            <CommonText>보증금</CommonText>
            <InputValue
              textAlign="center"
              onChangeText={(text: string) => { setAmount(text); }}
              value={amount}
              keyboardType="number-pad"
            />
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
                value={agree}
                onValueChange={setAgree}
              />
            </View>
          </InputColumn>
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => { saveItem(imgList); }}
            disabled={!send}
            dis={!send}
          >
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>
              등록완료
            </Text>
          </Button>
        </Inputs>
      </Container>
      {/* <CategoryBtn onPress={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{
              name: 'EnrollConfirm',
              params: {
                title: 'hello jaeyoung',
              },
            }],
          }),
        );
      }}
      >
        <Text>goconfirm</Text>
      </CategoryBtn> */}
    </KeyboardAwareScrollView>
  );
}

export default Enroll;
