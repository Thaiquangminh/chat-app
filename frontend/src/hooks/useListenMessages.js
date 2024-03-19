import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import conversationsStore from "../store/conversations.store";


const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = conversationsStore();

  console.log('socket from listen', socket)

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;