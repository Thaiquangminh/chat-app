import Conversation from "./Conversation";
import { useEffect } from "react";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis.js";

const Conversations = () => {
  const { getConversations, conversations } = useGetConversations();

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => {
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            avatar={conversation.profilePic}
            fullName={conversation.fullName}
            icon={getRandomEmoji()}
            lastIndex={conversations.length - 1 === index}
          />
        );
      })}
    </div>
  );
};

export default Conversations;
