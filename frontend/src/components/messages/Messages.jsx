import { useEffect } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import Message from "./Message.jsx";

const Messages = () => {
  const { loading, messages, getMessages } = useGetMessages();

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};
export default Messages;
