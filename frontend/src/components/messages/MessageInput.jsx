import { useEffect, useRef, useState } from "react";
import { BsSend, BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  //#region "State"
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage(message);
  const [openEmoji, setOpenEmoji] = useState(false);
  const emojiPickerRef = useRef(null);
  //#endregion

  //#region "Functions"
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      await sendMessage(message.trim());
      setMessage("");
      setOpenEmoji(false);
    }
  };

  const handleEmojiClick = (values) => {
    console.log(values.emoji);
    setMessage((prev) => prev + values.emoji);
  };
  //#endregion

  //#region "Effects"
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setOpenEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);
  //#endregion

  return (
    <form
      className="px-4 my-3"
      onSubmit={handleSendMessage}
      ref={emojiPickerRef}
    >
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div>
          <BsEmojiSmile
            className="text-white absolute top-[50%] right-[10%] -translate-y-1/2"
            onClick={() => setOpenEmoji(true)}
          />
        </div>

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend className="text-white" />
          )}
        </button>
      </div>
      <EmojiPicker
        // className="absolute"
        open={openEmoji}
        onEmojiClick={handleEmojiClick}
        skinTonesDisabled
        searchDisabled
        showPreview={false}
        previewConfig={{
          showPreview: false,
        }}
      />
    </form>
  );
};
export default MessageInput;
