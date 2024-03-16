import { useState } from "react"
import conversationsStore from "../store/conversations.store"

const useGetMessages = () => {
  const [loading, setLoading] = useState()
  const [messages, setMessages] = useState([])
  const { selectedConversation } = conversationsStore()

  const getMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/message/${selectedConversation._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()
      if (data.statusCode === 200) {
        setMessages(data.data.message)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, messages, getMessages }
}

export default useGetMessages