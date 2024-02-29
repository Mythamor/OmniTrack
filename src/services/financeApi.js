import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const financeApiHeaders = {
  'X-RapidAPI-Key': process.env.RAPID_API_KEY,
  'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
};

const financeParams = {
  trend_type: 'MOST_ACTIVE',
  country: 'us',
  language: 'en'
};

const baseUrl = 'https://real-time-finance-data.p.rapidapi.com';

const createRequest = (url) => ({url,  headers: financeApiHeaders});

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMarketTrends: builder.query({
      query: ({typeOfTrend}) => createRequest(`/market-trend?trend_type=${typeOfTrend}&country=us&language=en`),
    }),
  }),
});

export const { useGetMarketTrendsQuery } = financeApi;