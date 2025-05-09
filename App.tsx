import { ApiProvider } from '@reduxjs/toolkit/query/react';
import React from 'react';
import { api } from './src/redux/api';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Home from './src/screens/home';

const persistor = persistStore(store);

const App = () => {
  return (
    <ApiProvider api={api}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    </ApiProvider>
  )
}

export default App;