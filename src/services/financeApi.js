import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const financeApiHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
};


const baseUrl = 'https://real-time-finance-data.p.rapidapi.com';

const createRequest = (url) => ({url,  headers: financeApiHeaders});

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMarketTrends: builder.query({
      query: (typeOfTrend) => createRequest(`/market-tren?trend_type=${typeOfTrend}&country=us&language=en`),
    }),

    getCurrencies: builder.query({
      query: () => createRequest('/search?quer=KES&language=en'),
    }),
  }),
});

export const { useGetMarketTrendsQuery, useGetCurrenciesQuery } = financeApi;