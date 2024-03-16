import { create } from 'zustand'

const conversationsStore = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  message: [],
  setMessages: (message) => set({ message })
}))

export default conversationsStore