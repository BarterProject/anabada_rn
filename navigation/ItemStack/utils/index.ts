import { TextFontAramL } from './../../../Font';
import styled from 'styled-components/native';

import { Animated, ImageBackground } from 'react-native';

// about input
export const InputTitle = styled.TextInput.attrs({
  placeholderTextColor: '#626262',
})`
  background-color: #f2f2f2;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 15px;
  color:black;
  font-family: '210AramGothicL';
`;

export const InputContent = styled(InputTitle)`
  height: 200px;
  padding-top: 15px;
  margin: 0;
`;

export const Inputs = styled.View`
  padding: 0 25px;
`;

// about button

export const Button = styled.Pressable`
  width: 100%;
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(TextFontAramL)`
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

export const Card = styled(Animated.createAnimatedComponent(ImageBackground))`
  width: 200px;
  height: 200px;
  justify-content: flex-end;
  border-radius: 30px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  border:1px solid #e8e8e8;

`;

export const InputColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  height:50px;
`;

export const CommonText = styled(TextFontAramL)`
color: #626262;
font-weight: 300;
font-size: 23px;
`;

export const InputValue = styled(InputTitle)`
height: 43px;
width: 100px;
margin: 0;
`;

export const Fresh = styled.TouchableOpacity`
  position: absolute;
  width: 85px;
  height: 85px;
  right: 30px;
  bottom: 50px;
  border-radius: 80px;
  left:25px;
  border:2px solid #e94057;
  background-color: white;
  flex:1;
  align-items: center;
  justify-content: center;
`;
