import { Entypo, Ionicons } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import ChatBox from './components/ChatBox';

// const Container = styled.View`
//     flex: 1;
//     justify-content:center;
//     align-items:center;
// `;

const Container = styled.View`
    /* position: relative; */
    /* padding-bottom:20px ; */
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    flex:1;
`;

//텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    /* color:black;
    flex: 1;
    justify-content:center;
    align-items:center; */
`;

const MessageContainer = styled.View`
    flex:1;
`

const MessageInputContainer = styled.View`
    height:50px;
    border: 1px solid lightgray;
    /* border-radius: 5px;; */
    display:flex;
    flex-direction:row;
    /* position:absolute; */
`
const MessageInput = styled.TextInput`
    flex:1;
    /* margin:3px; */
    padding:5px;

`
const SendButton = styled.Button`
    width:20px;
`

export default function ChatRoom({ route: { params }, navigation: { setOptions
}, }) {
    // console.log(params)
    const [height, setHeight] = useState(0)
    const [content, setContent] = useState('')
    useEffect(() => {
        setOptions({
            headerShown: true,
        })
    })
    return (
        <Container>
            <MessageContainer>
                <KeyboardAwareScrollView extraScrollHeight={30}>
                    <ChatBox text='언제 배송 가능하시죠' sender={0} />
                    <ChatBox text='3일뒤 가능합니다.' sender={1} />
                    <ChatBox text='좀더 빨리 안될까요' sender={0} />
                    <ChatBox text='제가 직장인이라 힘듭니다.' sender={1} />
                    <ChatBox text='여기 군대라 우체국 택배로 보내주세요' sender={0} />
                    <ChatBox text='넹' sender={1} />
                </KeyboardAwareScrollView>
            </MessageContainer>
            <MessageInputContainer>
                <MessageInput
                    multiline={true}
                    onChangeText={setContent}
                    style={{ height: Math.max(50, height) }}

                    value={content}
                />
                <SendButton
                    title='Send'
                >
                </SendButton>
            </MessageInputContainer>
        </Container >
    );
}
