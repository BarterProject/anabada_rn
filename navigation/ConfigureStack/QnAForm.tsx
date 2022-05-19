import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { dealApi } from '../../api';
import { Container, InputContent, Inputs, InputTitle, WhiteText, Button } from './components/QnAFormComponents';



//텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

export default function QnAForm() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [send, setSend] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (name.length && description.length) {
            if (!send) {
                setSend(true);
            }
        } else
            if (send) {
                setSend(false);
                console.log('send-false 리렌더!');
            }
    }, [name, description]);

    const handlePress = () => {
        dealApi.sendReport({ title: name, content: description, idx: 1 }).then((result) => {
            console.log(result);
            alert('문의가 접수되었습니다.');
            navigation.dispatch(StackActions.pop(2));
            // dispatch(removeARandomItem()); // 카드 한장 넘기기
        });
    };
    return (
        <Container>
            <Inputs>
                <InputTitle
                    placeholder="문의 제목"
                    onChangeText={(text: string) => { setName(text); }}
                    value={name}
                />
                <InputContent
                    placeholder="문의 내용"
                    multiline
                    numberOfLines={10}
                    onChangeText={(text: string) => { setDescription(text); }}
                    value={description}
                    style={{ textAlignVertical: 'top' }}
                />
            </Inputs>
            <Button
                style={{ margin: 25 }}
                onPress={handlePress}
                disabled={!send}
                dis={!send}
            >
                <WhiteText>
                    등록완료
                </WhiteText>
            </Button>
        </Container>
    );
}
