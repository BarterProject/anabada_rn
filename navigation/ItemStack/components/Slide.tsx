import React, { useState } from 'react';

import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

const Container = styled.View`
  width: 100%;
  align-items: center;
  height: 250px;
  margin: 5px 0 20px 0;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const ImageItem = styled.TouchableOpacity`
  width: 250px;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 25px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
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

function Slide() {
  const [imgList, setImgList] = useState([]);

  const upload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setImgList([...imgList, result]);
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeImage = (index: number) => {
    setImgList(imgList.filter((e, idx) => index !== idx));
  };
  return (
    <Container>
      {imgList && imgList.length === 0 ? (
        <ImageItem onPress={upload}>
          <ImageText>사진을 추가하세요.</ImageText>
        </ImageItem>
      ) : (
        <Scroll
          contentContainerStyle={{ paddingHorizontal: 15 }}
          horizontal
          // onContentSizeChange={() => {
          //   // 여기다가 어떤 경우에 스크롤을 하면 될지에 대한 조건문을 추가하면 된다.
          //   scrollViewRef.current.scrollTo(0);
          // }}
        >
          {imgList.map((e: any, idx: number) => (
            <ImageItem key={e.uri}>
              <ImageInstance
                source={{
                  uri: e.uri,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 25 }}
              />
              <DelBtn
                onPress={() => {
                  removeImage(idx);
                }}
              >
                <Ionicons size={30} color="black" name="close-circle" />
              </DelBtn>
            </ImageItem>
          ))}

          <ImageItem onPress={upload}>
            <ImageText>사진을 추가하세요.</ImageText>
          </ImageItem>
        </Scroll>
      )}
    </Container>
  );
}

export default Slide;
