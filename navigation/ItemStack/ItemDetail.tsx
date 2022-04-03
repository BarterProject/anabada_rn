import React, { useEffect } from 'react';

import styled from 'styled-components/native';

import { TouchableOpacity, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Slide from './components/Slide';

import {
  InputContent, Inputs, InputTitle, Button, ButtonText,
} from './utils';

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

const HistoryBtn = styled.TouchableOpacity`
  width:32px;
  height:32px;
  border-radius: 32px;
  background-color: rgba(236, 101, 120, 0.19);
  align-items: center;
  justify-content: center;
`;

function ItemDetail({
  // route: { params },
  navigation: { setOptions, goBack, navigate },
}: {
  // route: { params: any };
  navigation: { setOptions: Function; goBack: Function, navigate:Function };
}) {
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
      headerRight: () => (
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
      ),
      title: '물건 디테일',
    });
  }, []);

  const images = [
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
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202203/36615BB020E805847B3D4098BA9CE4B59158D0EABBBAD7FD84159C79D64026C0.jpg?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202203/7418001DFC185E78F4F07ADE9D995A27DECB4319679C8F3668F489F07B246AF4.jpg?q=95&s=1440x1440&t=inside',
      width: 4288,
    },
    {
      cancelled: false,
      height: 2848,
      type: 'image',
      uri: 'https://dnvefa72aowie.cloudfront.net/origin/article/202203/8A31CEA154298AC393568A6553615F882B0BBEB9C4DF343AD5984BE244E32423.jpg?q=95&s=1440x1440&t=inside',
      width: 4288,
    },

  ];
  // function renderItem({ item, index }) {
  //   return (
  //     <View
  //       style={{
  //         position: 'relative',
  //       }}
  //     >
  //       <ItemInstance
  //         uri={item.uri}
  //         connectedUser={item.connectedUser}
  //         status={item.status}
  //         clickable={false}
  //         width={100}
  //         passport={false}
  //       />
  //       {index === 4 ? (
  //         <View
  //           style={{
  //             position: 'absolute',
  //             bottom: -20,
  //             width: '100%',
  //             alignItems: 'center',
  //           }}
  //         >
  //           <Ionicons size={30} name="checkmark-outline" color="green" />
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // }

  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>
      <Container>
        <Slide img={images} edit={false} />

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

        <StatusContainer>
          <Status color="green">
            <Text style={{ color: 'green' }}>거래 완료</Text>
          </Status>
          <Status color="red">
            <Text style={{ color: 'red' }}>배송기간 만료</Text>
          </Status>
          <Status color="blue">
            <Text style={{ color: 'blue' }}>배송중</Text>
          </Status>
        </StatusContainer>
        <Inputs>
          <InputTitle placeholder="제품명" />
          <InputContent
            placeholder="설명"
            multiline
            numberOfLines={15}
            style={{ textAlignVertical: 'top' }}
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
}

export default ItemDetail;
