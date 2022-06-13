import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import styled from 'styled-components/native';
import { itemType } from '../../../types';

export const Container = styled.View`
position:absolute;
justify-content:flex-end;
width:100%;
height:100%;
`;

export const InfoContainer = styled.View`
z-index:1;
position:absolute;
/* flex-direction:row; */
width:100%;
height:30%;
`;

export const InfoText = styled.Text`
padding: 8px;
color: white;
font-size:40px;
font-weight:900;
`;

export const InfoContainerBackground = styled.View`
position:absolute;
/* z-index:0; */
/* flex:1; */
width:100%;
height:30%;
opacity:0.2;
background-color:black;

`;

export const DetailButtonContainer = styled.View`

`;

export const DetailButton = styled.Pressable`

`;

export const DetailButtonText = styled.Text`
left:0;
padding-top: 15px;
`;
export const ChangeImageContainer = styled.View`
position:absolute;
flex-direction:row;
width:100%;
height:100%;
opacity:0.5;
`;

export const InfoTitle = styled.View`
flex-direction:row;
`;

export const DepositContainer = styled.View`
display:flex;
flex-direction:row;
padding: 10px;
top:-10px;
`;

export const Deposit = styled.Text`
background-color:gray;
font-size: 20px;
`;
export type CardProps = {
  item: itemType
}

export function Info({ name }: { name: string }) {
  return (
    <InfoTitle>
      <InfoText>
        {name}
      </InfoText>
      <DetailButtonContainer>
        <DetailButton>
          <DetailButtonText>
            <Icon
              name="infocirlceo"
              color="white"
              size={20}
            />
          </DetailButtonText>
        </DetailButton>
      </DetailButtonContainer>
    </InfoTitle>
  );
}

export function DepositInfo({ deposit }: { deposit: number }) {
  return (
    <DepositContainer>
      <Deposit>
        {deposit}
        원
      </Deposit>
    </DepositContainer>
  );
}
