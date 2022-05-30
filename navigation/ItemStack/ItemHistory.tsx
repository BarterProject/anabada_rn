import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity, Text, Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

import { BASE_URL } from '@env';
import { Card, InputContent } from './utils';
import { dealApi } from '../../api';

import { historyDetail } from '../../types';

const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    `;

const CardContainer = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const BtnColumn = styled.View`
  flex-direction: row;
  position: absolute;
  width:100%;
  justify-content: space-between;

  /* background-color: black; */
`;

const InfoContainer = styled.View`
  flex:1;
  width:100%;
`;

const Btn = styled.TouchableOpacity<{dis:boolean}>`
  opacity:${(props) => (props.dis ? 0.5 : 1)};
  margin: 0px 10px;
`;

const CardInfo = styled.View`
  width:200px;
  background-color: #ffffffaf;
  height:50%;
  padding: 10px 8px;
  position: absolute;
  
`;

function ItemHistory({
  route: { params: { itemIdx } },
  navigation: { setOptions, goBack },
}: {
    route: { params: {itemIdx:number}},
    navigation: { setOptions: Function; goBack: Function, }
  }) {
  const position = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const [leftMode, setLeftMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [images, setImages] = useState<historyDetail[]>();

  const [nowImage, setNowImage] = useState(null);

  // 마지막 카드 scale -> 0이면 0.7 / 250이상가면 1
  const finalScale = position.interpolate({
    inputRange: [0, 250],
    outputRange: [0.7, 1],
    extrapolate: 'clamp',
  });

  // 세번째 카드 scale -> backMode 일때 사라지고 생기는 애니메이션
  const thirdScale = rotation.interpolate({
    inputRange: [-0.35, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // forward 모드 , rotaion interpolate
  const ownForwardRotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    extrapolate: 'clamp',
  });
  const secondForwardRotation = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: ['0deg', '-20deg', '0deg'],
    extrapolate: 'clamp',
  });
  const thirdForwardRotation = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: ['-20deg', '-40deg', '-20deg'],
    extrapolate: 'clamp',
  });

  // back모드, rotaion interpolate
  const secondBackRotation = rotation.interpolate({
    inputRange: [-0.35, 0],
    outputRange: [-0.7, -0.35],
    extrapolate: 'clamp',
  });
  const thirdBackRotation = rotation.interpolate({
    inputRange: [-0.35, 0],
    outputRange: [-1.05, -0.7],
    extrapolate: 'clamp',
  });
  const finalBackRotation = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: ['-40deg', '-20deg', '-40deg'],
    extrapolate: 'clamp',
  });

  // 과거 카드 가져오는 transition,rotaion
  const lastRotaion = rotation.interpolate({
    inputRange: [-0.35, 0],
    outputRange: ['0deg', '-20deg'],
    extrapolate: 'clamp',
  });
  const lastMove = rotation.interpolate({
    inputRange: [-0.35, 0],
    outputRange: [0, 500],
    extrapolate: 'clamp',
  });

  const onDismissPosition = () => {
    position.setValue(0);
    setNowImage((prevState:number) => prevState - 1);
  };

  const onDismissRotation = () => {
    rotation.setValue(0);
    setNowImage((prevState:number) => prevState + 1);
  };

  const setLoadingBtn = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
    }, 800);
  };
  const setForward = () => {
    setLoadingBtn();
    if (leftMode) {
      setLeftMode(false);
    }
    Animated.spring(position, {
      toValue: 400,
      tension: 5,
      useNativeDriver: true,
      restDisplacementThreshold: 100,
      restSpeedThreshold: 100,
    }).start(onDismissPosition);
  };

  const setBack = () => {
    setLoadingBtn();
    if (!leftMode) {
      setLeftMode(true);
    }
    Animated.spring(rotation, {
      toValue: -0.35,
      tension: 20,
      useNativeDriver: true,
      restDisplacementThreshold: 0.2,

    }).start(onDismissRotation);
  };

  const getHistory = async () => {
    try {
      const { data } = await dealApi.getDealHistory(itemIdx);
      console.log(data);
      setImages(data);
      setNowImage(data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setOptions({
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

      title: '아이템 히스토리',
    });
    getHistory();
    console.log('렌더헤헷');
  }, []);

  return (
    <Container>
      {
    nowImage
      ? (
        <>
          <CardContainer>
            {nowImage >= 4 ? (
              <Card
                source={{
                  uri: `${BASE_URL}/api/v2/items/images/${images[nowImage - 4].itemImages[0].name}`,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
                style={{ transform: [{ rotateZ: finalBackRotation }, { scale: finalScale }] }}
              >
                <CardInfo style={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                  <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 7 }}>{images[nowImage - 4].name}</Text>
                  <Text>
                    보증금
                    :
                    {images[nowImage - 4].deposit}
                    원
                  </Text>
                </CardInfo>
              </Card>
            ) : null}
            {nowImage >= 3 ? (
              <Card
                style={{
                  transform: leftMode ? [{ rotateZ: thirdBackRotation }, { scale: thirdScale }]
                    : [{ rotateZ: thirdForwardRotation }],

                }}
                source={{
                  uri: `${BASE_URL}/api/v2/items/images/${images[nowImage - 3].itemImages[0].name}`,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
              >
                <CardInfo style={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                  <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 7 }}>{images[nowImage - 3].name}</Text>
                  <Text>
                    보증금
                    :
                    {images[nowImage - 3].deposit}
                    원
                  </Text>
                </CardInfo>
              </Card>
            ) : null}

            {
        nowImage >= 2 ? (
          <Card
            style={{
              transform: leftMode ? [{ rotateZ: secondBackRotation }]
                : [{ rotateZ: secondForwardRotation }],
            }}
            source={{
              uri: `${BASE_URL}/api/v2/items/images/${images[nowImage - 2].itemImages[0].name}`,

            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 25 }}
          >
            <CardInfo style={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
              <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 7 }}>{images[nowImage - 2].name}</Text>
              <Text>
                보증금
                :
                {images[nowImage - 2].deposit}
                원
              </Text>
            </CardInfo>
          </Card>
        )
          : null
            }

            <Card
              style={{
                transform: leftMode ? [{ rotateZ: rotation }] : [
                  { translateX: position },
                  { rotateZ: ownForwardRotation },

                ],
              }}
              source={{
                uri: `${BASE_URL}/api/v2/items/images/${images[nowImage - 1].itemImages[0].name}`,
              }}
              resizeMode="cover"
              imageStyle={{ borderRadius: 25 }}
            >
              <CardInfo style={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 7 }}>{images[nowImage - 1].name}</Text>
                <Text>
                  보증금
                  :
                  {images[nowImage - 1].deposit}
                  원
                </Text>
              </CardInfo>

            </Card>

            {nowImage < images.length ? (
              <Card
                source={{
                  uri: `${BASE_URL}/api/v2/items/images/${images[nowImage].itemImages[0].name}`,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
                style={{
                  transform: [{ translateX: lastMove }, { rotateZ: lastRotaion }],
                }}
              >
                <CardInfo style={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                  <Text style={{ fontSize: 25, fontWeight: '600', marginBottom: 7 }}>{images[nowImage].name}</Text>
                  <Text>
                    보증금
                    :
                    {images[nowImage].deposit}
                    원
                  </Text>
                </CardInfo>
              </Card>
            ) : null}

            <BtnColumn>
              <Btn
                onPress={setBack}
                disabled={btnLoading || nowImage === images.length}
                dis={btnLoading || nowImage === images.length}
              >
                <Ionicons name="caret-back-circle-outline" color="black" size={40} />
              </Btn>
              <Btn
                onPress={setForward}
                disabled={btnLoading || nowImage === 1}
                dis={btnLoading || nowImage === 1}
              >
                <Ionicons name="caret-forward-circle-outline" color="black" size={40} />
              </Btn>
            </BtnColumn>
          </CardContainer>

          <InfoContainer>
            <InputContent
              placeholder="설명"
              multiline
              numberOfLines={15}
              editable={false}
              style={{ textAlignVertical: 'top', height: 80 }}
              value="아이템 ‘거의 거저 아이폰’의 거래
          히스토리 목록입니다."
            />
          </InfoContainer>
        </>
      ) : <Text>해당 아이템의 거래내역이 없습니다.</Text>
              }
    </Container>

  );
}
export default ItemHistory;
