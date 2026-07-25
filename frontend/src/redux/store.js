// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from './userSlice'


// const store = configureStore({
//     reducer:{
//         user:userSlice
//     }
// })

// export default store




import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
// import authReducer from './authSlice'; // Example slice
import userSlice from './userSlice'
import { version } from 'react';


// 1. Combine all your reducers
const rootReducer = combineReducers({
    user: userSlice,
});

// 2. Define the persist configuration
const persistConfig = {
    key: 'Infinity-Ai',
    storage : storage.default,
    version : 1,
    whitelist: ["user"], // Only auth state will be persisted (optional)
};

// 3. Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore Redux Persist internal actions to prevent console warnings
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 5. Create the persistor
export const persistor = persistStore(store);

export default store;
