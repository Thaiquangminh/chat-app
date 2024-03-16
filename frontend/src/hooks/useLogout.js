import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext"
import conversationsStore from "../store/conversations.store"

const useLogout = () => {
  const [loading, setLoading] = useState()
  const { setAuthUser } = useAuthContext()
  const { setSelectedConversation } = conversationsStore()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (data.statusCode === 200) {
        toast.success('Logout successfully')
        localStorage.removeItem('chat-user')
        setAuthUser(null)
        setLoading(false)
        setSelectedConversation(null)
      }
      else if (data.statusCode === 500) {
        toast.error('Logout failed')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return { loading, logout }
}

export default useLogout