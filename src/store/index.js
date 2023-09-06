import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense/expense-slice";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { loggerMiddleware } from "./middlewares/logger-middleware";

// const store = configureStore({
//     reducer: {
//         EXPENSE: expenseSlice.reducer,
//     },
// });

const rootReducer = combineReducers({
    EXPENSE: expenseSlice.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // blacklist: ["EXPENSE"],
    // whitelist: ["EXPENSE"],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).prepend(loggerMiddleware.middleware);
    },
});

const persistor = persistStore(store);

export { store, persistor };
