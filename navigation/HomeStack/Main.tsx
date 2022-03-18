import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Text } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity``;

const Message = styled.Text``;
function Main() {
  const navigation = useNavigation();

  return (
    <Container>
      <Message>home</Message>
      <Btn
        onPress={() => {
          navigation.navigate('Item', { screen: 'Main' });
        }}
      >
        <Text>아이템</Text>
      </Btn>
    </Container>
  );
}

export default Main;
