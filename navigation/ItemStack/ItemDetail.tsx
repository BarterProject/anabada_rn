import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { TouchableOpacity, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';

import Slide from './components/Slide';
import Popup from './components/Popup';

import {
  InputContent, Inputs, InputTitle, Button, ButtonText, InputColumn, CommonText, InputValue,
} from './utils';

import { itemApi } from '../../api';
import { setItemToDeal } from '../../slice';
import { itemType } from '../../types';

const Container = styled.ScrollView`
    position: relative;
`;

const StatusContainer = styled.View`
  justify-content: space-evenly;
  flex-direction: row;
  height: 60px;
`;

const Status = styled.View<{ color: string }>`
  width: 120px;
  height: 30px;
  border-color: ${(props) => props.color};
  border-radius: 20px;
  border-width: 2px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const HistoryBtn = styled.TouchableOpacity`
  width:32px;
  height:32px;
  border-radius: 32px;
  background-color: rgba(236, 101, 120, 0.19);
  align-items: center;
  justify-content: center;
`;

function ItemDetail({
  route: {
    params: {
      readOnly, itemIdx, enrollMode, inventoryMode, deliveryMode,
    },
  },
  navigation: { setOptions, goBack, navigate },
}: {
  route: { params: {
    readOnly:boolean,
    itemIdx:number,
    enrollMode:boolean,
    deliveryMode:boolean,
    inventoryMode:boolean} };
  navigation: { setOptions: Function; goBack: Function, navigate:Function };
}) {
  const [itemInfo, setItemInfo] = useState<itemType>(null);
  const dispatch = useDispatch();

  // const {
  //   userInfo,
  // } = useSelector(
  //   (state:initialStateProps) => ({
  //     userInfo: state.userState,
  //   }),
  // );

  const go = (enroll:boolean, delivery:boolean) => {
    if (enroll) {
      navigate('Main', { screen: '아이템', params: { getNewData: true } });
    } else if (delivery) {
      navigate('Main', { screen: '인벤토리', params: { getNewData: true } });
    } else { goBack(); }
  };

  const getItemInfo = useCallback(async () => {
    try {
      const { data }:{data:itemType} = await itemApi.getItemInfo(itemIdx);
      setItemInfo(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, [itemInfo]);

  useEffect(() => {
    setOptions({
      headerRight: () => (!readOnly
        ? (
          <HistoryBtn
            onPress={() => {
              navigate('Item', { screen: 'History' });
            }}
          >
            <Text>
              <Ionicons
                size={20}
                name="layers-outline"
                color="#E94057"
              />
            </Text>
          </HistoryBtn>
        ) : null
      ),
    });
    getItemInfo();
  }, []);
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            go(enrollMode, deliveryMode);
          }}
        >
          <Text>
            <Ionicons size={30} name="chevron-back-outline" />
          </Text>
        </TouchableOpacity>
      ),
    });
    console.log(enrollMode);
  }, [enrollMode, deliveryMode]);

  return (
    itemInfo ? (
      <>
        <KeyboardAwareScrollView extraScrollHeight={30}>

          <Container>

            <Slide imgList={itemInfo.images} edit={false} setImgList={() => {}} />

            {/* <View style={{ height: 150, marginVertical: 20 }}>
          <Carousel
            layout="default"
            data={images}
            // eslint-disable-next-line react/jsx-no-bind
            renderItem={renderItem}
            sliderWidth={393}
            itemWidth={123}
            firstItem={4}
          />
        </View> */}
            {!readOnly ? (
              <StatusContainer>
                {/* <Status color="green">
                <Text style={{ color: 'green' }}>거래 완료</Text>
              </Status>
              <Status color="red">
                <Text style={{ color: 'red' }}>배송기간 만료</Text>
              </Status> */}
                <Status color="blue">
                  <Text style={{ color: 'blue' }}>거래중</Text>
                </Status>
              </StatusContainer>
            ) : null}

            <Inputs>
              <InputTitle placeholder="제품명" editable={false} value={itemInfo.name} />
              <InputContent
                placeholder="설명"
                multiline
                numberOfLines={15}
                style={{ textAlignVertical: 'top' }}
                editable={false}
                value={itemInfo.description}
              />

              <InputColumn style={{ marginTop: 30 }}>
                <CommonText>카테고리</CommonText>
                <InputValue textAlign="center" value={itemInfo.itemCategory ? itemInfo.itemCategory.name : 'null'} editable={false} />
              </InputColumn>
              <InputColumn style={{ marginTop: 15 }}>
                <CommonText>보증금</CommonText>
                <InputValue textAlign="center" value={String(itemInfo.deposit)} editable={false} />
              </InputColumn>
              {!readOnly ? (
                <>
                  <Button style={{ marginTop: 15 }}>
                    <ButtonText>배송 신청</ButtonText>
                  </Button>
                  <Button style={{ marginTop: 15 }}>
                    <ButtonText>배송 상태 보기</ButtonText>
                  </Button>
                </>
              ) : null}
              {
                inventoryMode ? (
                  <Button
                    style={{ marginTop: 15 }}
                    onPress={() => {
                      dispatch(setItemToDeal(itemIdx));
                      console.log(`${itemIdx}선택완료`);
                      navigate('Home', { screen: 'Main' });
                    }}
                  >
                    <ButtonText>선택하기</ButtonText>
                  </Button>
                ) : null
              }
              {deliveryMode ? null : (
                <Button
                  style={{ marginVertical: 15 }}
                  onPress={async () => {
                    navigate('Item', {
                      screen: 'ItemDelivery',
                      params: {
                        itemUrl: itemInfo.images[0].name,
                        itemName: itemInfo.name,
                        itemDescription: itemInfo.description,
                        itemIdx,
                      },
                    });
                  }}
                >
                  <ButtonText>배송신청</ButtonText>
                </Button>
              )}

            </Inputs>

          </Container>

        </KeyboardAwareScrollView>
        { enrollMode
          ? <Popup header="Congratulations 🎉" message="등록이 완료되었습니다." />
          : null}
        { deliveryMode
          ? <Popup header="Delivery request 🚚" message="배송신청이 완료되었습니다." />
          : null}

      </>
    )
      : <View><Text>Loading</Text></View>
  );
}

export default ItemDetail;
