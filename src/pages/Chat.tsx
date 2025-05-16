import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { getSocket, initSocket } from "../utils/useSocket";
import styles from "./Chat.module.css";
import { useAuthStore } from "../utils/useAuthStore";

interface Message {
  id: string;
  text: string;
  sender: string;
  senderName: string;
  timestamp: Date;
}

const Chat = () => {
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null); // Store unique ID
  const [userName, setUsername] = useState<string>(""); // Store username
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize socket when component mounts
    const socket = initSocket();

    // Handle connection events
    socket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    // Set up event listeners
    socket.on("setUserId", (id: string) => {
      // console.log("User ID set:", id);
      setUserId(id); // Set the unique socket ID as userId
    });

    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [
        ...prev,
        { ...data, timestamp: new Date(data.timestamp) },
      ]);
    });

    // const username = localStorage.getItem("username");
    const username = user?.username;
    setUsername(username || "Guest");

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("setUserId");
      socket.off("receiveMessage");
    };
  }, [user]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const socket = getSocket(); // Get the socket instance

    if (!socket.connected) {
      console.error("Socket is not connected");
      return;
    }

    if (message.trim() && userId) {
      // Ensure userId is available
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: userId, // Use the unique socket ID
        senderName: userName,
        timestamp: new Date(),
      };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatHeader}>Chat App <span className={isConnected ? styles.connected : styles.disconnected}>{isConnected ? "Connected" : "Disconnected"}</span></h2>
      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageWrapper} ${
              msg.sender === userId ? styles.sent : styles.received
            }`}
          >
            <div className={styles.message}>
              <span className={styles.senderName}>
                {msg.sender === userId ? "You" : msg.senderName}
              </span>
              <p className={styles.messageText}>{msg.text}</p>
              <span className={styles.timestamp}>
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
