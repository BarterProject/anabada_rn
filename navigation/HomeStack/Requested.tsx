import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, View, Image, ImageBackground,
} from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function Requested() {
  const [imgList, setImgList] = useState([]);
  const formData = new FormData();
  const upload = async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((images) => {
        setImgList([...imgList, { id: imgList.length, ...images }]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    formData.append('name', 'park');
    formData.append('description', 'verygood');
    formData.append('clause_agree', '');
    formData.append('deposit', '10001');
    console.log('formData', formData);
  });

  return (
    <Container>
      <Button
        title="이미지 올리기"
        onPress={upload}
      />
      {imgList.length === 0 ? null : (
        imgList.map((aImg) => {
          formData.append('images', {
            uri: aImg.path,
            name: aImg.path,
            type: `image/${aImg.path.split('.').pop()}`,
          });
          console.log(aImg.path);
          return (
            <View
              key={aImg.id}
              style={{
                width: 200,
                height: 100,
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={{
                  height: `${100}%`,
                  width: `${100}%`,
                }}
                source={{
                  uri: aImg.path,
                }}
              />
            </View>
          );
        })
      )}
      <Button
        title="더미데이터 업로드"
        onPress={async () => {
          try {
            const res = await fetch('http://10.0.2.2:3000/items/imgsandobject', {
              method: 'POST',
              // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            });
          } catch (e) {
            console.error(e);
          }
          console.log(res);
        }}
      />
    </Container>
  );
}
