import React from 'react';
import { memo } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

//텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;


const RightTextContainer = styled.View`
    /* height:60px; */
    display:flex;
    flex-direction:row;
    align-items:center;
    margin:5px;
    margin-left:30px;
    margin-right:50px;
    
`
const RightText = styled.Text`
    background-color:#85cd89fa;
    padding:10px;
    font-size: 20px;
    border-radius: 20px;
    /* height:20px; */
`
const LeftTextContainer = styled.View`
    display:flex;
    flex-direction:row-reverse;
    align-items:center;
    margin:5px;
    margin-left:30px;
    margin-right:50px;
`
const LeftText = styled.Text`
    background-color:#ff9c76f9;
    padding:10px;
    border-radius: 20px;
    font-size: 20px;

`

type ChatBoxProps = {
    text: string,
    id: number,
    sender: boolean
}
function arePropsEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */return (prevProps.text === nextProps.text)
}
const ChatBox = memo(({ text, id, sender }: ChatBoxProps) => {
    console.log('ChatBoxId', id)
    return (
        sender ?
            (<LeftTextContainer>
                <LeftText>
                    {text}
                </LeftText>
            </LeftTextContainer>) :
            (<RightTextContainer>
                <RightText>
                    {text}
                </RightText>
            </RightTextContainer>)
    );
})

// export default ChatBox;
export default memo(ChatBox, arePropsEqual);

