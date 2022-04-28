import React from 'react';

import styled from 'styled-components/native';

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
function ItemReceives({ itemIdxs }:{itemIdxs: {
  receiveIdxs:number,
  dealIdx:number
}[]}) {
  console.log('ItemReceives', itemIdxs.length);
  return (
    (
      <Container
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <GridItem>
          {itemIdxs.map((idx) => (
            <ItemReceiveInstance
              key={idx}
              idx={idx.receiveIdxs}
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

export default ItemReceives;
