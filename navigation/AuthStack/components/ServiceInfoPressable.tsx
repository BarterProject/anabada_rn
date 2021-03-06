import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { TextFontAramL } from '../../../Font';

const Text = styled(TextFontAramL)`
  color:#E94057;
`;

interface ServiceInfoPressableTextProps {
  navigation: any,
  to: string,
  text: string
}

export default function ServiceInfoPressableText(
  { navigation, to, text }: ServiceInfoPressableTextProps,
) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Auth', {
          screen: to,
        });
      }}
    >
      <Text>
        {text}
      </Text>
    </Pressable>
  );
}
