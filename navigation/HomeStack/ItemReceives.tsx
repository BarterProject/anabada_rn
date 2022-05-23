import React from 'react';

import styled from 'styled-components/native';
import { itemType } from '../../types';

import ItemReceiveInstance from './ItemReceiveInstance';

const Container = styled.ScrollView`
  width: 100%;
  padding: 0 15px;
  background-color: white;
`;

// const Container = styled.View`
//   flex: 1;
// `;

const GridItem = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px 0;
`;
function ItemReceives({ receiveDeals }: {
  receiveDeals: {
    receiveItem: itemType,
    dealIdx: number
  }[]
}) {
  console.log('ItemReceives', receiveDeals.length);
  return (
    (
      <Container
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <GridItem>
          {receiveDeals.map((aDeal) => (
            <ItemReceiveInstance
              item={aDeal.receiveItem}
              key={aDeal.dealIdx}
              idx={aDeal.receiveItem.idx}
              dealIdx={aDeal.dealIdx}
              // uri={item.images[0].name}
              connectedUser={1}
              status={aDeal.receiveItem.state}
              clickable
              width={33}
              passport
            // idx={item.idx}
            />
          ))}
        </GridItem>
      </Container>
    )
  );
}

export default ItemReceives;
