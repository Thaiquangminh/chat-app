import { useState } from "react"
import conversationsStore from "../store/conversations.store"

const useSendMessage = () => {
  const [loadingSendMsg, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = conversationsStore()
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      const data = await (res.json())
      setMessages([...messages, data.data]);
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loadingSendMsg, sendMessage }
}

export default useSendMessage