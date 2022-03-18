import React from 'react';

import styled from 'styled-components/native';

import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Message = styled.Text``;

const Btn = styled.TouchableOpacity``;
function Main() {
  const navigation = useNavigation();

  return (
    <Container>
      <Message>Item</Message>
      <Btn
        onPress={() => {
          navigation.navigate('Item', { screen: 'Enroll' });
        }}
      >
        <Text>아이템 등록</Text>
      </Btn>
    </Container>
  );
}

export default Main;
