import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message.jsx";
import conversationsStore from "../../store/conversations.store.js";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef(null);
  const { selectedConversation } = conversationsStore();

  useListenMessages();
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    if (messages && !loading) {
      lastMessageRef.current?.scrollIntoView();
    }
  }, [messages, selectedConversation, loading]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message messageContent={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-[#ccc]">
          Send a message to start the conversation
        </p>
      )}

      {/* --- At the bottom of the JSX element ----*/}
      <div ref={lastMessageRef} />
    </div>
  );
};
export default Messages;
