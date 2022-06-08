/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';

import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

import ImagePicker from 'react-native-image-crop-picker';

import { BASE_URL } from '@env';

import { imageType } from '../../../types';

const Container = styled.View`
  width: 100%;
  align-items: center;
  height: 330px;
  margin: 5px 0 20px 0;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const ImageItem = styled.Pressable`
  width: 250px;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 25px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  border:1px solid #e8e8e8;
`;

const ImageInstance = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

const ImageText = styled.Text`
  background-color: #f2f2f2;
  color: #626262;
  font-weight: 300;
  font-size: 15px;
`;

const DelBtn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 1px 1px 5px lightgray;
`;

function Slide({ imgList, edit, setImgList }: {
  imgList: Array<imageType>,
  edit: boolean,
  setImgList: Function
}) {
  const upload = async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((images) => {
        setImgList([...imgList, images]);
      });
      // const result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   aspect: [3, 1],
      //   quality: 1,
      // });
      // if (!result.cancelled) {
      // setImgList([...imgList, result]);
      // console.log(result);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const removeImage = (index: number) => {
    setImgList(imgList.filter((e, idx) => index !== idx));
  };

  const imageFetch = useMemo(() => imgList.map((e, idx: number) => (
    <ImageItem key={e.name + idx}>
      <ImageInstance
        source={{
          uri: edit ? e.path : `${BASE_URL}/api/v2/items/images/${e.name}`,
        }}
        resizeMode="cover"
        imageStyle={{ borderRadius: 25 }}
        key={e.name}
      />
      {edit ? (
        <DelBtn
          onPress={() => {
            removeImage(idx);
          }}
        >
          <Ionicons size={30} color="black" name="close-circle" />
        </DelBtn>
      ) : null}

    </ImageItem>
  )), [imgList]);
  return (
    <Container>
      {imgList && imgList.length === 0 ? (
        edit ? (
          <ImageItem onPress={upload}>
            <ImageText>사진을 추가하세요.</ImageText>
          </ImageItem>
        ) : null
      ) : (
        imgList.length !== 1 ? (
          <Scroll
            contentContainerStyle={{ paddingHorizontal: 15 }}
            horizontal
          >

            {imageFetch}
            {edit ? (
              <ImageItem onPress={upload}>
                <ImageText>사진을 추가하세요.</ImageText>
              </ImageItem>
            ) : null}

          </Scroll>
        ) : (
          !edit
            ? imageFetch : (
              <Scroll
                contentContainerStyle={{ paddingHorizontal: 15 }}
                horizontal
              >

                {imageFetch}
                {edit ? (
                  <ImageItem onPress={upload}>
                    <ImageText>사진을 추가하세요.</ImageText>
                  </ImageItem>
                ) : null}

              </Scroll>
            )
        )
      )}
    </Container>
  );
}

export default Slide;
