import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { store } from '../../src/redux/store';
import { api } from '../../src/redux/api';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ApiProvider api={api}>
      <Provider store={store}>
        {ui}
      </Provider>
    </ApiProvider>
  );
};

export default renderWithProviders;