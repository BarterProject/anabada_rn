import React from 'react';

import styled from 'styled-components/native';
import DropShadow from 'react-native-drop-shadow';
import { Animated, ImageBackground, View } from 'react-native';

const Instance = styled(Animated.createAnimatedComponent(ImageBackground))`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border:1px solid #e8e8e8;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;

`;

function Card({ uri, styleProps }:{uri:string, styleProps:any}) {
  return (
    <Instance
      style={styleProps}
      source={{
        uri,
      }}
      resizeMode="cover"
      imageStyle={{ borderRadius: 25 }}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <DropShadow style={{
          shadowColor: '#171717',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
        }}
        />
      </View>
    </Instance>
  );
}

export default Card;
