import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity, Text, Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native';

import { Card, InputContent } from './utils';

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

function ItemHistory({
  // route: { params },
  navigation: { setOptions, goBack },
}: {
    // route: { params: any };
    navigation: { setOptions: Function; goBack: Function, }
  }) {
  const position = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const [leftMode, setLeftMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [images, setImages] = useState([
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202203/77244408576a24ade40688210613046231e9ace75c37f8edde88fb2e4b8c6450.webp?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202202/775D42B631730AE1E209F484BD53CAC86C00AFFA4E0A8F349A96E257812DBDB3.jpg?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202108/35CE4BACED9F6EE24B0B4F8CE48A1920FE444DA578FEDD5AEBB310A994FC3A6B.jpg?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202203/AE33A8E09508FEFBAF957FA1EB33D022CB04A3219085AB886B0BD2C4B04A2EC5.jpg?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202110/d14f2570915c4b59948afe675fd7c894a23034020fa82a32f4691153bf252a53.webp?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
  ]);

  

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

    setNowImage(images.length);
  }, []);

  return (

    nowImage
      ? (
        <Container>
          <CardContainer>
            {nowImage >= 4 ? (
              <Card
                source={{
                  uri: images[nowImage - 4].uri,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
                style={{ transform: [{ rotateZ: finalBackRotation }, { scale: finalScale }] }}
              />
            ) : null}
            {nowImage >= 3 ? (
              <Card
                style={{
                  transform: leftMode ? [{ rotateZ: thirdBackRotation }, { scale: thirdScale }]
                    : [{ rotateZ: thirdForwardRotation }],

                }}
                source={{
                  uri: images[nowImage - 3].uri,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
              />
            ) : null}

            {
        nowImage >= 2 ? (
          <Card
            style={{
              transform: leftMode ? [{ rotateZ: secondBackRotation }]
                : [{ rotateZ: secondForwardRotation }],
            }}
            source={{
              uri: images[nowImage - 2].uri,
            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 25 }}
          />
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
                uri: images[nowImage - 1].uri,
              }}
              resizeMode="cover"
              imageStyle={{ borderRadius: 25 }}
            />

            {nowImage < images.length ? (
              <Card
                source={{
                  uri: images[nowImage].uri,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
                style={{
                  transform: [{ translateX: lastMove }, { rotateZ: lastRotaion }],
                }}
              />
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
        </Container>
      ) : null
  );
}

export default ItemHistory;
