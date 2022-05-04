import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dealApi } from '../../api';
import { removeARandomItem } from '../../slice';
import {
  Button, Container, InputContent, Inputs, InputTitle, WhiteText,
} from './components/ReportComponents';

export default function Report({ route: { params } }) {
  console.log(params);
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
      dispatch(removeARandomItem()); // 카드 한장 넘기기
    });
  };

  return (
    <Container>
      <Inputs>
        <InputTitle
          placeholder="신고 제목"
          onChangeText={(text:string) => { setName(text); }}
          value={name}
        />
        <InputContent
          placeholder="신고 내용"
          multiline
          numberOfLines={10}
          onChangeText={(text:string) => { setDescription(text); }}
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
