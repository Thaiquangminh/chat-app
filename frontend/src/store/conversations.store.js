import { create } from 'zustand'

const conversationsStore = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages })
}))

export default conversationsStore