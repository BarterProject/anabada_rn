import React from 'react';

import { FlatList, Dimensions } from 'react-native';

import styled from 'styled-components/native';

import AlarmColumn from './components/AlarmColumn';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  height: ${SCREEN_HEIGHT}px;
  padding-top: 15px;
`;

const Height = styled.View`
  height: 10px;
`;

function Main() {
  const renderItem = ({ item }: { item: any }) => (
    <AlarmColumn key={item.idx} content={item.content} />
  );

  const DATA = [
    { idx: 1, id: 1, content: '‘유리잔’의 배송이 신청돠었습니다.' },
    {
      idx: 2,
      id: 2,
      content: '배송기한을 넘겼으므로 보증금 300,000원이 00님에게 ...',
    },
  ];

  return (
    <Container>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        ItemSeparatorComponent={Height}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
}

export default Main;
