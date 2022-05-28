import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { PostType } from '../../types';
import {
  Container, InputContent, Inputs, InputTitle,
} from './components/QnAFormComponents';

// 텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

const Line = styled.View`
    width:100%;
    height:1px;
    background-color: #e94057;
    margin: 20px 0 ;
`;

const ReplyWrapper = styled.View`
    width:100%;
    height:200px;
    background-color: #e94057;
    padding:15px;
`;
const ReplyHeader = styled.Text`
    font-size:20px;
    font-weight:700;
    color:white;
`;

const ReplyContents = styled.TextInput`
    margin-top:15px;
    flex:1;   
    color:white;
`;

const ReplyText = styled.Text`
    font-size:20px;
    font-weight:400;
    color:#e94057;
`;

export default function QnADetail({
  navigation: {
    setOptions, goBack,
    navigate,
  },
  route: { params: { detail } },
}:{navigation: {
  setOptions:Function, goBack:Function,
  navigate:Function
}, route: { params: { detail: PostType} },
}) {
  const styles = StyleSheet.create({
    textInputStyle: {
      color: 'white',
    },
  });
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
    });
  }, []);

  return (
    <Container>
      <Inputs>
        <InputTitle
          value={detail.title}
          editable={false}
        />
        <InputContent
          multiline
          editable={false}
          numberOfLines={10}
          value={detail.content}
          style={{ textAlignVertical: 'top' }}
        />
        <Line />
        {
            detail.reply !== null ? (
              <ReplyWrapper style={{
                borderBottomLeftRadius: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
              >
                <ReplyHeader>운영진 답변</ReplyHeader>
                <ReplyContents
                  multiline
                  style={
                      styles.textInputStyle
                  }
                  editable={false}
                  value={detail.reply}
                />
              </ReplyWrapper>
            ) : (
              <>
                <ReplyText>운영진의 답변이 등록되지 않았습니다.</ReplyText>
                <ReplyText>잠시 기다려주세요.</ReplyText>
              </>
            )
        }

      </Inputs>
    </Container>
  );
}
