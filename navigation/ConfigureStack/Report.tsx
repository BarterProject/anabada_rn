import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { dealApi } from '../../api';
import { initialStateProps } from '../../slice';

const Container = styled.View`
    flex: 1;
    height: 100%;
    width: 100%;
    /* justify-content:center;
    align-items:center; */
`;

const Inputs = styled.View`
  margin-top:100;
  padding: 0 25px;
`;
const InputTitle = styled.TextInput.attrs({
  placeholderTextColor: '#626262',
})`
  background-color: #d4d4d4;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px 15px;
`;
const InputContent = styled(InputTitle)`
height: 200px;
padding-top: 15px;
margin: 0;
`;

const Button = styled.TouchableOpacity<{dis:boolean}>`
  /* width: 100%; */
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
  opacity:${(props) => (props.dis ? 0.3 : 1)};
`;

const WhiteText = styled.Text`
  color: white;
  /* font-weight: '600'; */
  font-size: 20 ;
`;

export default function Report() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [send, setSend] = useState(false);

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

  const navigation = useNavigation();

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
        onPress={() => {
          dealApi.sendReport({ title: name, content: description }).then((result) => {
            console.log(result);
            alert('문의가 접수되었습니다.');
            navigation.goBack();
          });
        }}
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
