import { useNavigation } from '@react-navigation/native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
`;
const Header = styled.View`
/* background-color:blue; */
  flex:2;
`;
// 텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    flex: 1;
    justify-content:center;
    align-items:center;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  width: 85px;
  height: 85px;
  right: 30px;
  bottom: 50px;
  border-radius: 80px;
`;
const BtnInstance = styled.View`
  width: 100%;
  height: 100%;
  background-color: #e94057;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
`;


const ButtonContainer = styled.View`
  /* background-color:red; */
  flex:14;
  /* margin-top:50px; */
  margin-left:20px;
  margin-right:20px;
  flex-direction: column;
  align-items:flex-start;
`;

const Text2 = styled.Text`
  font-size:20px;
`;

const Button = styled.TouchableOpacity`
    /* background-color:yellow; */
    width:100%;
    margin-bottom: 15px;
    margin-top: 15px;
`;

const Line = styled.View`
  background-color:lightgray;
  height:2px;
  width:100%;
`;
const SmallText = styled.Text`
      font-size:10px;

`

export default function QnAs() {
    const navigation = useNavigation();
    return (
        <Container>
            <Header />

            <ButtonContainer>
                <Line />
                <Button
                    onPress={() => {
                        // navigation.navigate('MyInfo');
                    }}
                >
                    <Text2>
                        문의 내용입니다.
                    </Text2>
                    <SmallText>
                        박성일 2022--05-13
                    </SmallText>
                </Button>
                <Line />
            </ButtonContainer>
            <Btn
                onPress={() => {
                    navigation.navigate('QnAForm');
                }}
            >
                <DropShadow
                    style={{
                        shadowColor: '#171717',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                    }}
                >
                    <BtnInstance>
                        <Text style={{ top: 30, color: 'white', fontSize: 18, fontWeight: '600' }}>
                            등록하기
                        </Text>
                    </BtnInstance>
                </DropShadow>
            </Btn>
        </Container>
    );
}
