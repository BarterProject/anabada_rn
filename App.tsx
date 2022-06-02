import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';


import store from './store';
import Root from './navigation/Root';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
