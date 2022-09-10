import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import conversationsReducer from './slices/conversationsSlice'
import messagesReducer from './slices/messagesSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        conversations: conversationsReducer,
        messages: messagesReducer,
    },
    
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
