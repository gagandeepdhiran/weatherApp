import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer} from 'redux-persist';

import {api} from './api';
import homeReducer from './homeSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: [],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  home: homeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [api.middleware];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
