import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import conversationsStore from "../store/conversations.store";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = conversationsStore();


  //#region "Notifications"
  // Function to handle notification
  const handleNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("New Message Received", {
        body: "Bạn nhận được 1 thông báo mới!",
        icon: '/messenger.png'
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("New Message Received", {
            body: "Bạn nhận được 1 thông báo mới!",
            icon: '/messenger.png'
          });
        }
      });
    }
  };

  //#region "Effects"
  useEffect(() => {
    // Check for permission when the component mounts
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Display initial notification if permission is granted
          handleNotification();
        }
      });
    }
  }, []);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      handleNotification();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;