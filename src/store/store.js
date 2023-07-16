import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import roleSlice from "./features/role/roleSlice";
import unreadTotorialSlice from "./features/tutorial/unreadTotorial/unreadTotorialSlice";
import requestTutorialSlice from "./features/tutorial/requestTutorial/requestTutorialSlice";
import anonymousSlice from "./features/anonymous/anonymousSlice";

const store = configureStore({
    reducer: {
        // reducerPath is the name of the slice default is "api"
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer,
        roles: roleSlice,
        unreadRequest: unreadTotorialSlice,
        requestTutorials: requestTutorialSlice,
        anonymous  : anonymousSlice,
    },
    // this need for rtks query to work with cache and other stuff
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    // devTools must set to false in production
    devTools: true,
});

export default store;