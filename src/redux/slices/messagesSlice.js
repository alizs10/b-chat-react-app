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
      state.messages = action.payload
    },
    removeMessage: (state) => {
      state.messages = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMessages, addMessage, removeMessage } = messagesSlice.actions

export default messagesSlice.reducer