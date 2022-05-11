import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import Root from './navigation/Root';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>

  );
}
