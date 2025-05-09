import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.openweathermap.org/",
  prepareHeaders: (headers, {getState}: {getState: () => any}) => {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

const baseQueryC = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  refetchOnFocus: true,
  baseQuery: baseQueryC,
  tagTypes: ['user'],
  endpoints: builder => ({
    getWeatherDetails: builder.query({
      query: ({ cityName }) => ({
        url: `data/2.5/weather?q=${cityName}&appid=b7644dc8e701198db51a40c5bb213520&units=metric`,
        method: 'GET',
      }),
    }),
  }),
});