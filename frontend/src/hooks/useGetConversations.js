import { useState } from "react"
import toast from 'react-hot-toast'

const useGetConversations = () => {
  const [loading, setLoading] = useState()
  const [conversations, setConversations] = useState([])

  const getConversations = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/user', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (data.statusCode === 200) {
        setConversations(data.data.users)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, conversations, getConversations }
}

export default useGetConversations