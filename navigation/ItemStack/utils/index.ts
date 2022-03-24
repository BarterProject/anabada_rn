import styled from 'styled-components/native';

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
