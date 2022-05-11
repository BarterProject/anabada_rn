import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';

import Postcode from '@actbase/react-daum-postcode';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { BASE_URL } from '@env';

import {
  Dimensions, Pressable, TouchableOpacity, Text, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  InputColumn, InputTitle, CommonText, Button, ButtonText,
} from './utils';

import { deliveryApi } from '../../api';

const Container = styled.View`
    flex:1;
    padding: 0 25px;
    position: relative;
`;

const Popup = styled.View`
    height:100%;
    position: absolute;
    background-color: white;
    z-index: 10;
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

function ItemDelivery({
  navigation: { setOptions, goBack, navigate },
  route: {
    params: {
      itemUrl, itemName, itemDescription, itemIdx,
    },
  },
}: {
    navigation: { setOptions: Function, goBack:Function, navigate: Function},
    route:{params:{itemUrl:string, itemName:string, itemDescription:string, itemIdx:number}}
  }) {
  const [phone, setPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [address, setAddress] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [agree, setAgree] = useState(false);
  const [popup, setPopup] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(disabled);
  }, [disabled]);
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title: '배송신청',
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
  }, []);
  useEffect(() => {
    if (phone.length >= 11
        && receiverName.length
        && address.length
        && addressDetail.length
        && agree) {
      setDisabled(false);
    } else {
      // eslint-disable-next-line no-unused-expressions
      !disabled && setDisabled(true);
    }
  }, [phone, receiverName, address, addressDetail, agree]);

  const saveDelivery = async () => {
    try {
      setLoading(true);
      const { data } = await deliveryApi.saveDelivery(itemIdx, {
        phone,
        receiverName,
        address,
        clauseAgree: agree,
      });
      setLoading(false);
      navigate('Item', {
        screen: 'Detail',
        params: {
          readOnly: false,
          itemIdx,
          deliveryMode: true,
        },
      });
    //   console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>

      <Container>
        <Popup style={{ width: Dimensions.get('window').width, display: popup ? 'flex' : 'none' }}>

          <Postcode
            style={{ flex: 7, height: 500 }}
            jsOptions={{ animation: true }}
        // onComplete={handleComplete}
            onSelected={(data) => {
              // console.log(data.zonecode, data.address)
              const { zonecode, address: ad } = data;
              setAddress(`${zonecode} ${ad}`);
              setPopup(!popup);
            }}
            onError={(error: any): void => {
              console.log(error);
              throw new Error('Function not implemented.');
            }}
          />
        </Popup>

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
                    uri: `${BASE_URL}/api/items/images/${itemUrl}`,
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
          <Column>
            <CommonText>수령자</CommonText>
            <Input
              value={receiverName}
              onChangeText={(text:string) => { setReceiverName(text); }}
            />
          </Column>
          <Pressable style={{ width: '100%' }} onPress={() => { setPopup(!popup); }}>

            <Column>
              <CommonText>주소</CommonText>
              <Input editable={false} value={address} />

            </Column>
          </Pressable>
          <Column>
            <CommonText />
            <Input
              value={addressDetail}
              onChangeText={(text:string) => { setAddressDetail(text); }}
            />
          </Column>
          <Column>
            <CommonText>연락처</CommonText>
            <Input
              value={phone}
              onChangeText={(text:string) => { setPhone(text); }}
            />
          </Column>
          <Column>
            <CommonText>계약명세서 (더보기)</CommonText>
            <Column>
              <CommonText>동의</CommonText>
              <Checkbox
                style={{ marginLeft: 10 }}
                value={agree}
                onValueChange={setAgree}
              />

            </Column>

          </Column>
        </InputWrapper>

        <Button
          style={{
            marginTop: 15,
            opacity: disabled || loading ? 0.3 : 1,
          }}
          disabled={disabled || loading}
          onPress={saveDelivery}
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
  );
}

export default ItemDelivery;
