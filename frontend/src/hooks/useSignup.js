import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  // handle signup
  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })
    if (!success) return

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      })

      const data = await res.json()
      if (data.statusCode === 200) {
        toast.success(data.message)
        setAuthUser(data)
        localStorage.setItem("chat-user", JSON.stringify(data))
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { signup, loading }
}

export default useSignUp

// Handle error cases
const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields")
    return false
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match")
    return false
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}


