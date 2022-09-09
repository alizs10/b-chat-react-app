import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import conversationsReducer from './slices/conversationsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        conversations: conversationsReducer
    },
    
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
