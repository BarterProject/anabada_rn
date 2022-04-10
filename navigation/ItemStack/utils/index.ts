import styled from 'styled-components/native';

import { Animated, ImageBackground } from 'react-native';

import DropShadow from 'react-native-drop-shadow';

// about input
export const InputTitle = styled.TextInput.attrs({
  placeholderTextColor: '#626262',
})`
  background-color: #f2f2f2;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px 15px;
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

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
`;

export const Card = styled(Animated.createAnimatedComponent(ImageBackground))`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;

`;
