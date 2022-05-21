import React from 'react';

import styled from 'styled-components/native';

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
function ItemRequests({ itemIdxs }: {
  itemIdxs: {
    reqeustIdxs: number,
    dealIdx: number
  }[]
}) {
  console.log('ItemRequests itemIdxs.length:', itemIdxs.length);
  return (
    (
      <Container
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <GridItem>
          {itemIdxs.map((idx) => (
            <ItemRequestInstance
              key={idx.reqeustIdxs}
              idx={idx.reqeustIdxs}
              dealIdx={idx.dealIdx}
              // uri={item.images[0].name}
              connectedUser={1}
              status="배송중"
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
