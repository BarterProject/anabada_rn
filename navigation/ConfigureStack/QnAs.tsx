import React, { useEffect, useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { boardApi } from '../../api';

const Container = styled.ScrollView`
    flex: 1;
    position: relative;
    padding: 10px 25px 0 25px;
`;
const Header = styled.View`
/* background-color:blue; */
`;
// 텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

const Btn = styled.TouchableOpacity`
  width: 70px;
  height: 55px;
  border-radius: 80px;
`;

const ButtonContainer = styled.View`
  /* background-color:red; */
  flex:14;
  /* margin-top:50px; */
  flex-direction: column;
  align-items:flex-start;
  padding-bottom: 10px;
  margin-bottom:15px;
`;

const Text2 = styled.Text`
  font-size:20px;
  margin-bottom:10px;
`;

const Button = styled.TouchableOpacity`
    /* background-color:yellow; */
    width:100%;
 
`;

const Line = styled.View`
  background-color:lightgray;
  height:2px;
  width:100%;
`;
const SmallText = styled.Text`
      font-size:10px;

`;

export default function QnAs({
  route: {
    params,
  },
  navigation: {
    setOptions, goBack, navigate,
  },

}:{navigation: {
    setOptions:Function, goBack:Function, navigate:Function
  }, route:{
    params:{
        getNewData:boolean
    }
} }) {
  const headerHeight = useHeaderHeight();

  const [posts, setPosts] = useState(null);
  const getBoards = async () => {
    try {
      const { data } = await boardApi.getMyPosts();
      setPosts(data);
      console.log(data);
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
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigate('QnAForm');
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '500' }}>
            등록하기
          </Text>
        </TouchableOpacity>
        // <Btn
        //   onPress={() => {
        //     navigate('QnAForm');
        //   }}
        // >

        //   <Text style={{
        //     color: 'white', fontSize: 18, fontWeight: '600',
        //   }}
        //   >
        //     등록하기
        //   </Text>
        // </Btn>
      ),
    });
    getBoards();
  }, []);

  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    if (params) {
      if (params.getNewData) {
        getBoards();
      }
    }
  }, [params]);

  return (posts !== null ? (
    <Container>
      <Header style={{ height: headerHeight }} />

      {posts.length !== 0
        ? posts.map((post) => (
          <ButtonContainer style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>
            <Button
              onPress={() => {
                navigate('QnADetail', { detail: post });
              }}
            >
              <Text2>
                {post.title}
              </Text2>
              <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                <SmallText>
                  {post.content.length > 10 ? `${post.content.slice(0, 10)}...` : post.content}
                </SmallText>
                <SmallText>
                  {moment(post.updatedAt).fromNow()}
                </SmallText>
              </View>

            </Button>
          </ButtonContainer>
        )) : (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>업로드한 게시물이 없습니다.</Text>
          </View>
        )}

    </Container>
  ) : null

  );
}
