import React from 'react';

import styled from 'styled-components/native';

import { itemType } from '../../../types';
import ItemInventoryInstance from './ItemInventoryInstance';

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
function ItemInventory({ items }:{items: itemType[]}) {
  return (
    (
      <Container
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <GridItem>
          {items.map((item) => (
            <ItemInventoryInstance
              key={item.idx}
              uri={item.images.length !== 0 ? item.images[0].name : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuwX7lcqhAjm-fqpG8KKoNL84ldCGKt9Ugg&usqp=CAU'}
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

export default ItemInventory;
