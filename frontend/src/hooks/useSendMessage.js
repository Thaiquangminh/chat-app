import { useState } from "react"
import conversationsStore from "../store/conversations.store"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { selectedConversation } = conversationsStore()
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, sendMessage }
}

export default useSendMessage