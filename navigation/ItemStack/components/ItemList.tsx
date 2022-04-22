import React from 'react';

import styled from 'styled-components/native';

import ItemInstance from './ItemInstance';

import { itemType } from '../../../types';

const Container = styled.ScrollView`
  width: 100%;
  padding: 0 15px;
  background-color: white;
`;

const GridItem = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px 0;
`;
function ItemList({ items }:{items: itemType[]}) {
  // const renderItem = useCallback(({ item }:{item:itemType}) => (
  //   <ItemInstance
  //     key={item.idx}
  //     uri={item.images[0].saveName}
  //     connectedUser={1}
  //     status=""
  //     clickable
  //     width={33}
  //     passport={item.delivery.length !== 0}
  //   />
  // ), []);

  return (
    (
      <Container
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <GridItem>
          {items.map((item) => (
            <ItemInstance
              key={item.idx}
              uri={item.images[0].name}
              connectedUser={1}
              status="배송중"
              clickable
              width={33}
              passport
              idx={item.idx}
            />
          ))}
        </GridItem>
      </Container>
    )
  );
}

export default ItemList;
