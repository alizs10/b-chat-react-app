import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload
    },
    addConversation: (state, action) => {
      state.conversations = action.payload
    },
    removeConversation: (state) => {
      state.conversations = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setConversations, addConversation, removeConversation } = conversationsSlice.actions

export default conversationsSlice.reducer