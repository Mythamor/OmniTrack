import { configureStore } from "@reduxjs/toolkit";

import { financeApi } from "../services/financeApi";
import { newsApi } from "../services/newsApi";

export default configureStore({
    reducer: {
        [financeApi.reducerPath]: financeApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(financeApi.middleware, newsApi.middleware),
});