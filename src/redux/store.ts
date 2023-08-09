import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import todoReducer from './todoSlice/todoSlice';

const persistConfig = {
    key: 'root',
    storage
}

const persistedTodosReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
    reducer: {
        todos: persistedTodosReducer
    }
})

const persistor = persistStore(store);

export {store, persistor};