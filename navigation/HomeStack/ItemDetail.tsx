import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Slide from './components/Slide';
import {
  CommonText, InputColumn, Inputs, InputValue,
} from '../ItemStack/utils';
import { itemType } from '../../types';
import {
  Button,
  Container,
  Deposit,
  Description,
  DescriptionContainer,
  ItemName,
  ItemNameContainer,
  LikeButton,
  ReportButton,
} from './components/ItemDetailsComponents';

export default function ItemDetail({ route }) {
  console.log(route.params);
  const { item } : {item:itemType} = route.params;
  const {
    idx,
    name,
    description,
    deposit,
    images,
    itemCategory: { name: categoryName },
  } = item;
  console.log(deposit);
  return (
    <KeyboardAwareScrollView extraScrollHeight={30}>
      <Container>
        <Slide imgList={images} />
        <Inputs>
          <ItemNameContainer>
            <ItemName>
              {name}
            </ItemName>
            <Deposit>
              {deposit}
              원
            </Deposit>
          </ItemNameContainer>
          <DescriptionContainer>
            <Description>
              {description}
            </Description>
          </DescriptionContainer>
          <InputColumn style={{ marginTop: 30 }}>
            <CommonText>카테고리</CommonText>
            <InputValue
              textAlign="center"
              value={categoryName}
              editable={false}
              style={{
                color: 'black',
              }}
            />
          </InputColumn>
          <LikeButton />
          <ReportButton idx={idx} />
        </Inputs>
      </Container>
    </KeyboardAwareScrollView>
  );
}
