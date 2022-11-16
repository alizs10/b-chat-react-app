import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  conversations: []
}

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload
    },
    addConversation: (state, action) => {
      state.conversations = [action.payload, ...state.conversations]
    },
    removeConversation: (state) => {
      state.conversations = []
    },
    setLastMessage: (state, action) => {
      let lastMessage = action.payload
      let conversationsInstance = [...state.conversations]
      let conversationIndex = conversationsInstance.findIndex(con => con.id == lastMessage.conversation_id)
      let conversation = conversationsInstance[conversationIndex]
      if (lastMessage.pending || lastMessage.id == conversation.last_message.id) return
      conversation.last_message = lastMessage
      state.conversations = [...conversationsInstance]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setConversations, addConversation, removeConversation, setLastMessage } = conversationsSlice.actions

export default conversationsSlice.reducer