import React from "react";

import styled from "styled-components/native";

import ItemInstance from "./ItemInstance";

const Container = styled.ScrollView`
  width: 100%;
  padding: 0 15px;
`;

const GridItem = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 10px 0;
`;
function ItemList() {
  const images = [
    {
      uri: "https://t1.daumcdn.net/cfile/tistory/995BB63A5BDF9C0F0B",
      connectedUser: 3,
      status: "normal",
    },
    {
      uri: "http://image.auction.co.kr/itemimage/1a/12/30/1a12307236.jpg",
      connectedUser: 0,
      status: "stop",
    },
    {
      uri: "http://m.specimen.co.kr/web/product/big/20200331/0f00d0c07403175cd6a4668c1fed3be2.jpg",
      connectedUser: 1,
      status: "normal",
    },
    {
      uri: "https://view01.wemep.co.kr/wmp-product/3/450/1711114503/pm_pfrbmxst7e0f.jpg",
      connectedUser: 0,
      status: "enroll",
    },
    {
      uri: "https://file.mk.co.kr/meet/neds/2021/09/image_readtop_2021_927932_16329132754799395.jpg",
      connectedUser: 0,
      status: "end",
    },
  ];

  return (
    <Container
      contentContainerStyle={{
        justifyContent: "flex-start",
      }}
    >
      <GridItem>
        {images.map((image) => (
          <ItemInstance
            uri={image.uri}
            connectedUser={image.connectedUser}
            status={image.status}
          />
        ))}
      </GridItem>
    </Container>
  );
}

export default ItemList;
