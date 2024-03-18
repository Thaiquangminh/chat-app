import { useEffect, useState } from "react"
import conversationsStore from "../store/conversations.store"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = conversationsStore()

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/${selectedConversation._id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(data.data.messages);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('do fetch messages')
    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages }
}

export default useGetMessages