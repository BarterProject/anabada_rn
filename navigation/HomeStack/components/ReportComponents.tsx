import styled from 'styled-components/native';
import { TextFontAramL } from '../../../Font';

export const Container = styled.View`
    flex: 1;
    height: 100%;
    width: 100%;
    /* justify-content:center;
    align-items:center; */
`;

export const Inputs = styled.View`
  margin-top:100;
  padding: 0 25px;
`;
export const InputTitle = styled.TextInput.attrs({
  placeholderTextColor: '#626262',
})`
  background-color: #d4d4d4;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px 15px;
  font-family: '210AramGothicL';
`;
export const InputContent = styled(InputTitle)`
height: 200px;
padding-top: 15px;
margin: 0;
`;

export const Button = styled.TouchableOpacity<{ dis: boolean }>`
  /* width: 100%; */
  height: 50px;
  padding: 5px;
  border-radius: 15px;
  background-color: #e94057;
  color: white;
  justify-content: center;
  align-items: center;
  opacity:${(props) => (props.dis ? 0.3 : 1)};
`;

export const WhiteText = styled(TextFontAramL)`
  color: white;
  /* font-weight: '600'; */
  font-size: 20 ;
`;
