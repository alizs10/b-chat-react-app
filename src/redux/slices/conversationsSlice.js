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
    },
    seenAllMessages: (state, action) => {
      let conversationInstance = [...state.conversations]
      let convIndex = conversationInstance.findIndex(conv => conv.id == action.payload.conversation_id)
      let conv = conversationInstance[convIndex]
      conv.unseen_messages = 0;
      state.conversations = [...conversationInstance]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setConversations, addConversation, removeConversation, setLastMessage,seenAllMessages } = conversationsSlice.actions

export default conversationsSlice.reducer