import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
};

const newsParams = {
  country: 'US',
  lang: 'en'
};

const baseUrl = 'https://real-time-news-data.p.rapidapi.com';

const createRequest = (url) => ({url,  headers: newsApiHeaders});


export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFinancialNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/search?quer=${newsCategory}&safeSearch=Off&freshness=Day&country=US&lang=en&count=${count}`),
    }),
  }),
});

export const { useGetFinancialNewsQuery } = newsApi;