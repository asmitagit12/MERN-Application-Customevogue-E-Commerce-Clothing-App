import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import reducers
import cartReducer from "../redux/slices/cartSlice";
import authReducer from "../redux/slices/authSlice";
import wishlistReducer from "../redux/slices/wishlistSlice";

// Combine reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
});

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Define the persist config type
const persistConfig: PersistConfig<RootState> = {
    key: "root",
    version: 1,
    storage,
};

// Apply persistence to the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Persistor instance
export const persistor = persistStore(store);

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
