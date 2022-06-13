import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';

import Postcode from '@actbase/react-daum-postcode';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { BASE_URL } from '@env';

import moment from 'moment';
import {
  Dimensions, Pressable, TouchableOpacity, Text, ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  InputColumn, InputTitle, CommonText, Button, ButtonText,
} from './utils';

import { deliveryApi } from '../../api';
import { trackingType } from '../../types';

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

const ItemText = styled(TextFontAramL)`
    font-size:20px;
    font-weight:500;
`;
const Column = styled(InputColumn)`
    margin:10px 0px;
`;

function ItemTracking({
  navigation: { setOptions, goBack },
  route: {
    params: {
      itemIdx, itemUrl,
    },
  },
}: {
  navigation: { setOptions: Function, goBack: Function, navigate: Function },
  route: { params: { itemIdx: number, itemUrl: string } }
}) {
  const [trackingInfo, setTrackingInfo] = useState<trackingType>(null);
  const getTrackingInfo = async () => {
    try {
      const { data } = await axios.get('http://www.deliverytracking.kr/?dummy=one&deliverytype=doortodoor&keyword=364183918351');
      console.log(data);
      // setTrackingInfo(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setOptions({
      headerBackTitleVisible: false,
      title: '아이템 배송 현황',
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
    getTrackingInfo();
  }, []);

  return (trackingInfo
    ? (
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
              <ItemText>
                제품명:
                {`${trackingInfo.itemName}`}
              </ItemText>
              <ItemText style={{ marginTop: 5 }}>
                운송장번호:
                {`${trackingInfo.invoiceNo}`}
              </ItemText>
            </RightSide>
          </ItemInfoWrapper>
          <InputWrapper>
            <Column>
              <CommonText>완료여부</CommonText>
              <Input
                value={trackingInfo.complete ? '배송완료' : '배송중'}
                editable={false}
              />
            </Column>

            <Column>
              <CommonText>배송단계</CommonText>
              <Input
                value={`${trackingInfo.level}`}
                editable={false}
              />
            </Column>

            <Column>
              <CommonText>배송정보</CommonText>

            </Column>
          </InputWrapper>
          {trackingInfo.trackingDetails.map((e, idx) => (
            <Input
              value={`${moment(e.time).format('YYYY-MM-DD HH:MM')} - ${e.kind} - ${e.where}`}
              editable={false}
              style={{ width: '100%', marginBottom: 15 }}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
            />
          ))}

          {/* <Button

        >
          {loading
            ? <ActivityIndicator color="white" />
            : (
              <ButtonText>
                배송요청
              </ButtonText>
            )}
        </Button> */}
        </Container>
      </KeyboardAwareScrollView>
    ) : null
  );
}

export default ItemTracking;
