import conversationsStore from "../../store/conversations.store";

const Conversation = ({ avatar, fullName, icon, lastIndex, conversation }) => {
  const { selectedConversation, setSelectedConversation } =
    conversationsStore();
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={avatar} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{fullName}</p>
            <span className="text-xl">{icon}</span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
