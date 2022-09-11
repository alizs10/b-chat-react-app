import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      let newMessage = action.payload;
      state.messages = [newMessage,...state.messages]
    },
    removeMessage: (state) => {
      state.messages = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMessages, addMessage, removeMessage } = messagesSlice.actions

export default messagesSlice.reducer