/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components/native';

import {
  TouchableOpacity, Text, View, ActivityIndicator, Pressable, Linking, Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch, useSelector } from 'react-redux';

import { CommonActions, useNavigation } from '@react-navigation/native';
// import { PushNotificationScheduledLocalObject } from 'react-native-push-notification';
import Slide from './components/Slide';
import Popup from './components/Popup';

import {
  InputContent, Inputs, InputTitle, Button, ButtonText, InputColumn, CommonText, InputValue,
} from './utils';

import { itemApi, deliveryApi } from '../../api';

import { initialStateProps, resetRandomItems, setItemToDeal } from '../../slice';
import { itemType } from '../../types';

const Container = styled.ScrollView`
    position: relative;
    padding-bottom:20px ;
`;

const StatusContainer = styled.View`
  justify-content: space-evenly;
  flex-direction: row;
  height: 60px;
  padding: 0 25px;
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
      readOnly, itemIdx, enrollMode, deliveryMode,
      isItItem, status, idx,
    },
  },
  navigation: {
    setOptions, goBack, navigate, dispatch: dis,
  },
}: {
  route: {
    params: {
      readOnly: boolean,
      itemIdx: number,
      enrollMode: boolean,
      deliveryMode: boolean,
      inventoryMode: boolean,
      isItItem: boolean,
      status: string
      idx: number
    }
  };
  navigation: {
    setOptions: Function, goBack: Function, navigate: Function,
    dispatch: Function
  };

}) {
  const [itemInfo, setItemInfo] = useState<itemType>(null);

  const [trackingError, setTrackingError] = useState<boolean>(false);
  const [trackingErrorMsg, setTrackingErrorMsg] = useState<string>('');

  const [delivery, setDelivery] = useState<boolean>(false);

  const navigation = useNavigation()

  const dispatch = useDispatch();

  const {
    userIdx,
  } = useSelector(
    (state: initialStateProps) => ({
      userIdx: state.userState.idx,
    }),
  );

  // useEffect(() => {
  //   if (idx) {
  //     // eslint-disable-next-line no-unused-expressions
  //     setCompanyCheck(idx);
  //   }
  // }, [idx]);
  const go = (enroll: boolean, delivery: boolean) => {
    if (enroll) {
      navigate('Main', { screen: '아이템', params: { getNewData: true } });
    } else if (delivery) {
      navigate('Main', { screen: '인벤토리', params: { getNewData: true } });
    } else { goBack(); }
  };

  // const saveTracking = async () => {
  //   try {
  //     const body = {
  //       trackingNumber: parseInt(waybill, 10),
  //       deliveryCompanyIdx: parseInt(courier, 10),
  //     };
  //     const { data } = await deliveryApi.saveTracking(itemInfo.delivery.idx, body);
  //     console.log(data);
  //     dis(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{
  //           name: 'Confirm',
  //           params: {
  //             title: '운송장번호 등록완료',
  //             bigMsg: `아이템 ${itemInfo.name}의 운송장번호가 등록되었습니다.`,
  //             smallMsg: '보증금 입금은 잠시 기다려주십시오.',
  //             screen: '아이템',
  //             getNewData: true,
  //           },
  //         }],
  //       }),
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     if (e.response.status === 404) {
  //       setTrackingError(true);
  //       setTrackingErrorMsg('유효하지 않은 운송장 정보입니다.');
  //     } else if (e.response.staus === 401) {
  //       setTrackingError(true);
  //       setTrackingErrorMsg('권한이 없습니다.');
  //     } else if (e.response.status === 400) {
  //       setTrackingError(true);
  //       setTrackingErrorMsg('운송장 번호가 이미 등록되었습니다.');
  //     }
  //   }
  // };

  const refundItem = async () => {
    try {
      await itemApi.refundItem(itemIdx);
      dispatch(setItemToDeal({ chosenItemId: 0 }))
      dis(
        CommonActions.reset({
          index: 0,
          routes: [{
            name: 'Confirm',
            params: {
              title: '등록취소(환불신청) 대기',
              bigMsg: `아이템 ${itemInfo.name}의 환불이 신청되었습니다.`,
              smallMsg: '보증금 입금은 잠시 기다려주십시오.',
              screen: '아이템',
              getNewData: true,
            },
          }],
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getItemInfo = useCallback(async () => {
    console.log("진입", itemIdx)

    try {
      const { data }: { data: itemType } = await itemApi.getItemInfo(itemIdx);
      setItemInfo(data);
    } catch (e) {
      console.log("getItemInfo 에러")
      console.log(e);
    }
  }, [itemInfo]);

  // eslint-disable-next-line consistent-return
  const statusJsx = (state: number) => {
    if (state === 1) {
      return (
        <Status color="green">
          <Text style={{ color: 'green' }}>{status}</Text>
        </Status>
      );
    } if (state === 2) {
      return (
        <Status color="blue">
          <Text style={{ color: 'blue' }}>{status}</Text>
        </Status>
      );
    } if (state === 3) {
      return (
        <Status color="black">
          <Text style={{ color: 'black' }}>{status}</Text>
        </Status>
      );
    } if (state === 4) {
      return (
        <Status color="#ffd300">
          <Text style={{ color: '#ffd300' }}>{status}</Text>
        </Status>
      );
    } if (state === 5) {
      return (
        <Status color="red">
          <Text style={{ color: 'red' }}>{status}</Text>
        </Status>
      );
    } if (state === 6) {
      return (
        <Status color="black">
          <Text style={{ color: 'black' }}>{status}</Text>
        </Status>
      );
    } if (state === 7) {
      return (
        <Status color="black">
          <Text style={{ color: 'black' }}>{status}</Text>
        </Status>
      );
    }
  };

  function OpenURLButton({ url, children }: { url: string, children: string }) {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Button
        style={{ marginVertical: 15 }}
        onPress={handlePress}
      >
        <ButtonText>{children}</ButtonText>
      </Button>
    );
  }

  useEffect(() => {
    getItemInfo();
  }, []);
  useEffect(() => {
    setOptions({
      headerRight: () => (!readOnly
        ? (
          <HistoryBtn
            onPress={async () => {
              navigate('Item', { screen: 'History', params: { itemIdx, itemName: itemInfo.name } });
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
  }, [itemInfo]);

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
      headerRight: () => {
        if (itemInfo === null) {
          return null;
        }
        if (itemInfo.state === 2) {
          return <TouchableOpacity
            onPress={() => {
              console.log('het')
              // navigate('ChatRoom', {
              //   id: itemInfo.idx,
              //   test: "test"
              // });
              navigation.navigate('Item', {
                screen: 'ChatRoom',
                params: {
                  itemIdx,
                  name: itemInfo.name
                }
              });
            }}
          >
            <Entypo name='chat' size={40} />
          </TouchableOpacity >
        }
      }
    });
    console.log(enrollMode);
  }, [enrollMode, deliveryMode, itemInfo]);

  useEffect(() => {
    setDelivery(deliveryMode);
  }, [deliveryMode]);
  return (
    itemInfo ? (
      <>
        <KeyboardAwareScrollView extraScrollHeight={30}>

          <Container>

            <Slide imgList={itemInfo.images} edit={false} setImgList={() => { }} />

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
                {statusJsx(itemInfo.state)}
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
              <InputColumn style={{ marginTop: 15 }}>
                <CommonText>관리자의 계좌번호</CommonText>
              </InputColumn>
              <InputValue style={{ width: '100%' }} textAlign="left" value="3561191555063 농협" editable={false} />

              {/* {!readOnly ? (
                isItItem && itemInfo.delivery
                  ? (
                    <Button style={{ marginTop: 15 }}>
                      <ButtonText>배송 상태 보기</ButtonText>
                    </Button>
                  )
                  : null
              ) : null} */}
              {
                !isItItem && itemInfo.state !== 4 && itemInfo.state !== 2
                  && itemInfo.state !== 5 && itemInfo.state !== 7 && itemInfo.state !== 6 ? (
                  <Button
                    style={{ marginTop: 15 }}
                    onPress={() => {
                      dispatch(setItemToDeal(itemIdx));
                      dispatch(resetRandomItems());
                      console.log(`${itemIdx}선택완료`);
                      navigate('Home', { screen: 'Main' });
                    }}
                  >
                    <ButtonText>선택하기</ButtonText>
                  </Button>
                ) : null
              }
              {
                isItItem || itemInfo.state === 4 || itemInfo.registrant.idx === userIdx
                  ? null : (
                    deliveryMode || itemInfo.delivery || itemInfo.state === 6
                      ? (
                        null
                      )
                      : (
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
                      )
                  )
              }
              {
                itemInfo.state === 7 ? (
                  <OpenURLButton url={`http://www.deliverytracking.kr/?dummy=dummy&deliverytype=doortodoor&keyword=${itemInfo.delivery.trackingNumber}&remark=`}>배송현황</OpenURLButton>
                ) : null
              }

              {
                isItItem && itemInfo.state === 2 ? (
                  <Button
                    style={{
                      marginVertical: 15,
                      // opacity: waybill.length !== 0
                      // && courier.length !== 0 ? 1 : 0.5,
                    }}
                    onPress={() => {
                      navigate('Item', {
                        screen: 'ItemRefund',
                        params: {
                          itemIdx,
                          itemUrl: itemInfo.images[0].name,
                          delivery: itemInfo.delivery,
                          itemName: itemInfo.name,
                          itemDescription: itemInfo.description,
                        },
                      });
                    }}
                  >
                    <ButtonText>배송완료(보증금 반환 신청)</ButtonText>
                  </Button>
                ) : (
                  null
                )
              }
              {
                isItItem
                  && itemInfo.owner.idx === userIdx
                  && itemInfo.registrant.idx === userIdx
                  && itemInfo.state !== 5
                  && itemInfo.state !== 6
                  ? (
                    <Button onPress={refundItem} style={{ marginVertical: 15 }}>
                      <ButtonText>등록 취소(환불 신청)</ButtonText>
                    </Button>
                  ) : null
              }
              {
                itemInfo.state === 5 ? (
                  <CommonText style={{ marginVertical: 15, color: '#e94057' }}>
                    환불신청 되었습니다.
                    잠시만 기다려주세요.
                  </CommonText>
                ) : null
              }
              {
                !isItItem && itemInfo.state === 2 ? (
                  <CommonText style={{ marginVertical: 15, color: '#e94057' }}>
                    실 소유주의 운송장번호가 입력되지 않았습니다.
                    잠시 기다려주세요.
                  </CommonText>
                ) : null
              }
            </Inputs>
          </Container>
        </KeyboardAwareScrollView>
        {/* deliveryMode */}
        <Popup header="Delivery request 🚚" message="배송신청이 완료되었습니다." display={delivery} setDisplay={setDelivery} />
        <Popup header="운송장 등록 오류 🚚" message={trackingErrorMsg} display={trackingError} setDisplay={setTrackingError} />
      </>
    )
      : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="gray" size="large" /></View>
  );
}

export default ItemDetail;
