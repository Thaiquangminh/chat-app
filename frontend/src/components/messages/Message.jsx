import { useAuthContext } from "../../context/AuthContext";
import conversationsStore from "../../store/conversations.store";
import { extractTime } from "../../utils/extractTime";

const Message = ({ messageContent }) => {
  //#region "State"
  const { authUser } = useAuthContext();
  const { selectedConversation } = conversationsStore();
  //#endregion

  //#region "Check message state"
  const fromMe = messageContent.senderId === authUser.data._id;
  const profilePic = fromMe
    ? authUser.data.profilePic
    : selectedConversation.profilePic;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const chatBubbleBg = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(messageContent.createdAt);

  const shakeClass = messageContent.shouldShake ? "shake" : "";
  //#endregion

  //#region "Render"
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${chatBubbleBg} ${shakeClass} pb-2`}
      >
        {messageContent.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
  //#endregion
};
export default Message;
