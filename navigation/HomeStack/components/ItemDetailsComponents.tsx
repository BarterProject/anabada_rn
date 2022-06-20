import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { TextFontAramL } from '../../../Font';
import { removeARandomItem, requestDeal } from '../../../slice';

export const Container = styled.ScrollView`
    margin-bottom: 15px;
`;

export const ItemName = styled(TextFontAramL)`
  font-size: 36;
  font-weight:600;

`;
export const ItemNameContainer = styled.View`
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;
  padding-bottom: 20px;
  /* padding-left:10px; */
`;

export const Deposit = styled(TextFontAramL)`
  font-size: 20;
  font-weight:600;
`;

export const Description = styled(TextFontAramL)`
  
`;

export const DescriptionContainer = styled.View`
  background-color: #eae9e9;
  padding: 10px;
  border-radius: 15px;

`;

export const Button = styled.TouchableOpacity`
width: 100%;
height: 50px;
padding: 5px;
border-radius: 15px;
background-color: #e94057;
justify-content: center;
align-items: center;
`;

export const ButtonText = styled(TextFontAramL)`
color: white;
font-weight: 600;
font-size: 20px;
`;

export const ReportButtonBackground = styled(Button)`
    background-color: white;
    border: 1px solid red;

`;

export const ReportButtonText = styled(ButtonText)`
    color: red;

`;

export function LikeButton() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = () => {
    dispatch(removeARandomItem()); // 카드 한장 넘기기
    dispatch(requestDeal()); // 교환 신청하기
    navigation.goBack();
  };

  return (
    <Button style={{ marginTop: 15 }}>
      <ButtonText
        onPress={handlePress}
      >
        교환 요청
      </ButtonText>
    </Button>
  );
}

export function ReportButton({ idx }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Report', {
      idx,
    });
  };
  return (
    <ReportButtonBackground
      style={{ marginTop: 15 }}
      onPress={handlePress}
    >
      <ReportButtonText>신고하기</ReportButtonText>
    </ReportButtonBackground>
  );
}
