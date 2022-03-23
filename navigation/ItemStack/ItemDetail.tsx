import React, { useEffect } from "react";

import styled from "styled-components/native";

import { TouchableOpacity, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Carousel from "react-native-snap-carousel";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ItemInstance from "./components/ItemInstance";

import { InputContent, Inputs, InputTitle, Button, ButtonText } from "./utils";

const Container = styled.ScrollView``;

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

const ItemDetail = ({
  route: { params },
  navigation: { setOptions, goBack },
}: {
  route: { params: any };
  navigation: { setOptions: Function; goBack: Function };
}) => {
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
      title: "물건 디테일",
    });
  }, []);

  const images = [
    {
      uri: "https://t1.daumcdn.net/cfile/tistory/995BB63A5BDF9C0F0B",
      connectedUser: 0,
      status: "normal",
    },
    {
      uri: "http://image.auction.co.kr/itemimage/1a/12/30/1a12307236.jpg",
      connectedUser: 0,
      status: "stop",
    },
    {
      uri: "http://m.specimen.co.kr/web/product/big/20200331/0f00d0c07403175cd6a4668c1fed3be2.jpg",
      connectedUser: 0,
      status: "normal",
    },
    {
      uri: "https://view01.wemep.co.kr/wmp-product/3/450/1711114503/pm_pfrbmxst7e0f.jpg",
      connectedUser: 0,
      status: "enroll",
    },
    {
      uri: "https://file.mk.co.kr/meet/neds/2021/09/image_readtop_2021_927932_16329132754799395.jpg",
      connectedUser: 0,
      status: "end",
    },
  ];
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          position: "relative",
        }}
      >
        <ItemInstance
          uri={item.uri}
          connectedUser={item.connectedUser}
          status={item.status}
          clickable={false}
          width={100}
          passport={false}
        />
        {index == 4 ? (
          <View
            style={{
              position: "absolute",
              bottom: -20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Ionicons size={30} name="checkmark-outline" color={"green"} />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>
      <Container>
        <View style={{ height: 150, marginVertical: 20 }}>
          <Carousel
            layout={"default"}
            data={images}
            renderItem={_renderItem}
            sliderWidth={393}
            itemWidth={123}
            firstItem={4}
          />
        </View>
        <StatusContainer>
          <Status color={"green"}>
            <Text style={{ color: "green" }}>거래 완료</Text>
          </Status>
          <Status color={"red"}>
            <Text style={{ color: "red" }}>배송기간 만료</Text>
          </Status>
          <Status color={"blue"}>
            <Text style={{ color: "blue" }}>배송중</Text>
          </Status>
        </StatusContainer>
        <Inputs>
          <InputTitle placeholder="제품명" />
          <InputContent
            placeholder="설명"
            multiline
            numberOfLines={15}
            style={{ textAlignVertical: "top" }}
          />
          <Button style={{ marginTop: 15 }}>
            <ButtonText>배송 신청</ButtonText>
          </Button>
          <Button style={{ marginTop: 15 }}>
            <ButtonText>배송 상태 보기</ButtonText>
          </Button>
        </Inputs>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default ItemDetail;
