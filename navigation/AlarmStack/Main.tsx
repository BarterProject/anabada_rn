import React, { useEffect } from 'react';

import { FlatList, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import styled from 'styled-components/native';
import { initialStateProps } from '../../slice';

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

  const {
    notice,
  } = useSelector(
    (state:initialStateProps) => ({
      notice: state.notice,
    }),
  );

  useEffect(() => {
    console.log(notice);
  }, []);
 

  return (
    <Container>
      <FlatList
        data={notice}
        renderItem={renderItem}
        ItemSeparatorComponent={Height}
        keyExtractor={(item) => item.idx}
      />
    </Container>
  );
}

export default Main;
