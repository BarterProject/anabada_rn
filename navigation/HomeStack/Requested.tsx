import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, View, Image, ImageBackground,
} from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import { BASE_URL } from '@env';
import { useSelector } from 'react-redux';

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
  const mockData = {
    name: 'asdasd',
    description: 'test description2',
    clause_agree: true,
    payment: { amount: 30000, paymentOption: { idx: 3 } },
    itemCategory: { idx: 3 },
  };
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

  const { accessToken } = useSelector((state) => ({
    accessToken: state.userState.accessToken,
  }));

  useEffect(() => {
    alert(accessToken);
    console.log(accessToken);
    // formData.append('name', 'park');
    // formData.append('description', 'verygood');
    // formData.append('clause_agree', '');
    // formData.append('deposit', '10001');
    formData.append('item', JSON.stringify(mockData));
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
            // const res = await fetch('http://10.0.2.2:3000/items/imgsandobject', {
            const res = await fetch(`${BASE_URL}/api/user/items`, {
              method: 'POST',
              // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bear ${accessToken}`,
              },
              body: formData,
            });
            console.log(res);
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </Container>
  );
}
