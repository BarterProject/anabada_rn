import React from 'react';

import styled from 'styled-components/native';
import { itemType } from '../../types';

import ItemRequestInstance from './ItemRequestInstance';

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
function ItemRequests({ requestDeals }: {
  requestDeals: {
    reqeustItem: itemType,
    dealIdx: number
  }[]
}) {
  console.log('ItemRequests itemIdxs.length:', requestDeals.length);
  return (
    (
      <Container
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <GridItem>
          {requestDeals.map((reqeustItem) => (
            <ItemRequestInstance
              item={reqeustItem.reqeustItem}
              key={reqeustItem.reqeustItem.idx}
              idx={reqeustItem.reqeustItem.idx}
              dealIdx={reqeustItem.dealIdx}
              // uri={item.images[0].name}
              connectedUser={1}
              status={reqeustItem.reqeustItem.state}
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

export default ItemRequests;
