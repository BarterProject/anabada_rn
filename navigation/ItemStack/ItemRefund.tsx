import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { BASE_URL } from '@env';

import {
  Dimensions, Pressable, TouchableOpacity, Text, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import {
  InputColumn, InputTitle, CommonText, Button, ButtonText,
} from './utils';

import { dealApi, deliveryApi } from '../../api';
import Popup from './components/Popup';
import { deliveryType } from '../../types';

const Container = styled.View`
    flex:1;
    padding: 0 25px;
    position: relative;
`;

const ItemInfoWrapper = styled.View`
    display: flex;
    flex-direction: row;
    height:140px;
`;

const InputWrapper = styled.View`
    margin-top:30px;
`;

const Input = styled(InputTitle)`
    width:70%;
    margin:0;
`;

const LeftSide = styled.View`
    flex:1;
    display:flex;
`;
const RightSide = styled.View`
    flex:2.3;
`;

const ImageWrapper = styled.View`
    width:90%;
    height:100%;
`;

const Item = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
`;

const ItemText = styled.Text`
    font-size:20px;
    font-weight:500;
`;
const Column = styled(InputColumn)`
    margin:10px 0px;
`;

function ItemRefund({
  navigation: {
    setOptions, goBack, navigate, dispatch,
  },
  route: {
    params: {
      itemUrl, itemName, itemDescription, delivery, idx,
    },
  },
}: {
  navigation: { setOptions: Function, goBack: Function, navigate: Function, dispatch:Function },
  route: { params: { itemUrl: string, itemName: string, itemDescription: string, idx: number,
    delivery:deliveryType } }
}) {
  const [phone, setPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [agree, setAgree] = useState(false);
  const [popup, setPopup] = useState(false);

  const [waybill, setWaybill] = useState<string>('');
  const [courier, setCourier] = useState<string>('');

  const [companyCheck, setCompanyCheck] = useState<number>(null);
  const [companyOption, setCompanyOption] = useState(null);

  const [trackingError, setTrackingError] = useState<boolean>(false);
  const [trackingErrorMsg, setTrackingErrorMsg] = useState<string>('');

  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const getCompanies = async () => {
    try {
      const { data } = await dealApi.getCompanies();
      setCompanyOption(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (idx) {
      setCompanyCheck(idx);
    }
  }, [idx]);
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title: '보증금 반환 신청',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Text>
            <Ionicons size={30} name="chevron-back-outline" />
          </Text>
        </TouchableOpacity>
      ),
    });
    getCompanies();
  }, []);

  const saveTracking = async () => {
    try {
      const body = {
        trackingNumber: parseInt(waybill, 10),
        deliveryCompanyIdx: companyOption[companyCheck].idx,
      };
      console.log(body);
      const { data } = await deliveryApi.saveTracking(delivery.idx, body);
      console.log(data);
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{
            name: 'Confirm',
            params: {
              title: '보증금 반환 신청 완료',
              bigMsg: `아이템 ${itemName}의 보증금 반환 신청이 완료되었습니다.`,
              smallMsg: '보증금 입금은 잠시 기다려주십시오.',
              screen: '아이템',
              getNewData: true,

            },
          }],
        }),
      );
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        setTrackingError(true);
        setTrackingErrorMsg('유효하지 않은 운송장 정보입니다.');
      } else if (e.response.staus === 401) {
        setTrackingError(true);
        setTrackingErrorMsg('권한이 없습니다.');
      } else if (e.response.status === 400) {
        setTrackingError(true);
        setTrackingErrorMsg('운송장 번호가 이미 등록되었습니다.');
      }
    }
  };

  return (
    <>
      <KeyboardAwareScrollView extraScrollHeight={30}>

        <Container>
          <ItemInfoWrapper>
            <LeftSide>
              <ImageWrapper>
                <DropShadow
                  style={{
                    shadowColor: '#171717',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                  }}
                >
                  <Item
                    source={{
                      uri: `${BASE_URL}/api/v2/items/images/${itemUrl}`,
                    }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 25 }}
                  />
                </DropShadow>
              </ImageWrapper>
            </LeftSide>

            <RightSide>
              <ItemText>{`제품명 : ${itemName}`}</ItemText>
              <ItemText>{`설명 : ${itemDescription}`}</ItemText>
            </RightSide>
          </ItemInfoWrapper>
          <InputWrapper>
            <InputColumn style={{ marginTop: 15 }}>
              <CommonText>요청 주소지</CommonText>
            </InputColumn>
            <InputTitle editable={false} value={delivery.address} />
            <InputColumn style={{ marginTop: 15 }}>
              <CommonText>연락처</CommonText>
            </InputColumn>
            <InputTitle placeholder="제품명" editable={false} value={delivery.phone} />
            <Pressable onPress={() => {
              navigate('Item', {
                screen: 'SelectOption',
                params: {
                  itemList: companyOption, check: companyCheck, type: 'company', delivery, itemUrl, itemName, itemDescription,
                },
              });
            }}
            >
              <InputColumn style={{ marginTop: 20 }}>
                <CommonText>{companyCheck !== null ? companyOption[companyCheck].name : '택배사 선택'}</CommonText>
                <Ionicons size={20} name="chevron-forward-outline" color="black" />
              </InputColumn>
            </Pressable>
            <InputColumn style={{ marginTop: 15 }}>
              <CommonText>운송장 번호</CommonText>
            </InputColumn>
            <InputTitle placeholder="운송장 번호를 입력해주세요." value={waybill} editable onChangeText={(text:string) => { setWaybill(text); }} />
          </InputWrapper>

          <Button
            style={{
              marginBottom: 20,
              opacity: (companyCheck === null || waybill.length === 0) || loading ? 0.3 : 1,
            }}
            disabled={(companyCheck === null || waybill.length === 0) || loading}
            onPress={saveTracking}
          >
            {loading
              ? <ActivityIndicator color="white" />
              : (
                <ButtonText>
                  배송요청
                </ButtonText>
              )}
          </Button>
        </Container>
      </KeyboardAwareScrollView>
      <Popup
        header="운송장 등록 오류 🚚"
        message={trackingErrorMsg}
        display={trackingError}
        setDisplay={setTrackingError}
      />
    </>
  );
}

export default ItemRefund;
