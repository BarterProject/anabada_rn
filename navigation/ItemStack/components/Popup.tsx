import React, { useState } from 'react';
import { Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import styled from 'styled-components/native';

const Container = styled.Pressable`
    flex:1;
    position: absolute;
    align-items: center;
    width:100%;
    z-index: 100;
    height:100%;
    background-color: #c1c1c16a;
    padding-top:20px;
`;

const ContentContainer = styled.View`
    width:270px;
    height:160px;
    border-radius: 7px;
    background-color: white;

`;

const Header = styled.View`
    background-color: #e94057;
    width:100%;
    justify-content: center;
    padding:10px 15px;
    height:100%;
  `;

const HeaderText = styled.Text`
  color:white;
  font-size:15px;
  font-weight:500;
`;

const Body = styled.View`
  flex:3.5;
  padding:20px 15px;
  justify-content: space-between;
`;

const BodyText = styled.Text`
  color:black;
  font-size:15px;
  font-weight:600;
`;

const BodyBtnColumn = styled.View`
  align-items:flex-end;
`;

const Btn = styled.TouchableOpacity`
  padding:5px 10px;
  border-radius: 10;
  background-color: #f3f3f3;
`;

function Popup({ message, header }:{message:string, header:string}) {
  const [display, setDisplay] = useState(true);

  return (
    display ? (
      <Container onPress={() => { setDisplay(false); }}>
        <DropShadow
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 100,
          }}
        >
          <ContentContainer>
            <DropShadow
              style={{
                shadowColor: '#171717',
                shadowOffset: { width: 0, height: 7 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                flex: 2,
              }}
            >
              <Header style={{ borderTopLeftRadius: 7, borderTopRightRadius: 7 }}>
                <HeaderText>
                  {/* Congratulations 🎉 */}
                  {header}
                </HeaderText>
              </Header>

            </DropShadow>

            <Body>
              <BodyText>
                {message}
                {/* 등록이 완료되었습니다. */}
              </BodyText>
              <BodyBtnColumn>
                <Btn onPress={() => { setDisplay(false); }}>
                  <Text style={{ fontSize: 10, fontWeight: '600' }}>
                    CLOSE
                  </Text>
                </Btn>

              </BodyBtnColumn>
            </Body>
          </ContentContainer>
        </DropShadow>

      </Container>
    ) : null
  );
}

export default Popup;
