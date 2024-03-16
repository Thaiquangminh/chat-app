import { useState } from "react"
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext"

const useLogin = () => {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext()

  const login = async ({ username, password }) => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.statusCode === 200) {
        setLoading(false)
        localStorage.setItem("chat-user", JSON.stringify(data))
        setAuthUser(data)
        toast.success(data.message)
      }
      else {
        setLoading(false)
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return { loading, login }
}

export default useLogin