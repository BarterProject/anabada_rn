import React, { useState } from 'react';

import styled from 'styled-components/native';

import { Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import DropShadow from 'react-native-drop-shadow';
import ItemList from './components/ItemList';

const Container = styled.View`
  flex: 1;
`;

const Navigation = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 2px;
`;

const NavigationItem = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NavigationTitle = styled.Text<{ show: boolean }>`
  font-weight: 400;
  font-size: 20px;
  opacity: ${(props) => (props.show ? 1 : 0.3)};
`;

const NavigationTab = styled.View<{ show: boolean }>`
  background: #e94057;
  border-radius: 10px;
  position: absolute;
  width: 100px;
  height: 4px;
  bottom: 0px;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  width: 100px;
  height: 100px;
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

function Main() {
  const navigation = useNavigation();
  const [nav, setNav] = useState([true, false]);

  return (
    <Container>
      <Navigation>
        <NavigationItem>
          <TouchableOpacity
            onPress={() => {
              if (!nav[0] && nav[1]) {
                setNav([true, false]);
              }
            }}
          >
            <NavigationTitle show={nav[0]}>인벤토리</NavigationTitle>
          </TouchableOpacity>
          <NavigationTab show={nav[0]} />
        </NavigationItem>
        <NavigationItem>
          <TouchableOpacity
            onPress={() => {
              if (nav[0] && !nav[1]) {
                setNav([false, true]);
              }
            }}
          >
            <NavigationTitle show={nav[1]}>아이템</NavigationTitle>
          </TouchableOpacity>
          <NavigationTab show={nav[1]} />
        </NavigationItem>
      </Navigation>
      <ItemList />

      <Btn
        onPress={() => {
          navigation.navigate('Item', { screen: 'Enroll' });
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
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              등록하기
            </Text>
          </BtnInstance>
        </DropShadow>
      </Btn>
    </Container>
  );
}

export default Main;
