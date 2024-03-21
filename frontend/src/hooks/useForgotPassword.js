import { useState } from "react"
import toast from 'react-hot-toast'

const useForgotPassword = () => {
  //#region "State"
  const [loadingCheckUsername, setLoadingCheckUsername] = useState(false)
  const [loadingChangPassword, setLoadingChangPassword] = useState(false)
  //#endregion

  //#region "Functions"
  const checkUsername = async (username) => {
    setLoadingCheckUsername(true)
    try {
      const res = await fetch(`/api/auth?username=${username}`)
      const data = await res.json()
      if (data.statusCode !== 200) {
        toast.error(data.message)
      }
      return data
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingCheckUsername(false)
    }
  }

  const changePassword = async ({ username, newPassword }) => {
    setLoadingChangPassword(true)
    try {
      const res = await fetch('api/auth/change-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, newPassword }),
      })
      const data = await res.json();
      if (data.statusCode === 200) {
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
      return data
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingChangPassword(false)
    }
  }
  //#endregion

  return { loadingCheckUsername, checkUsername, loadingChangPassword, changePassword }
}

export default useForgotPassword