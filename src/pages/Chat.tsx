import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./Chat.module.css";

interface Message {
  id: string;
  text: string;
  sender: string;
  // senderName: string;
  timestamp: Date;
}

const socket = io("http://localhost:5000"); // Backend URL

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null); // Store unique ID
  const [userName, setUsername] = useState<string>(""); // Store username
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("setUserId", (id: string) => {
      setUserId(id); // Set the unique socket ID as userId
    });

    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [
        ...prev,
        { ...data, timestamp: new Date(data.timestamp) },
      ]);
    });

    const username = localStorage.getItem("username");
    setUsername(username || "Guest");

    return () => {
      socket.off("setUserId");
      socket.off("receiveMessage");
    };
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() && userId) {
      // Ensure userId is available
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: userId, // Use the unique socket ID
        // senderName: "You",
        timestamp: new Date(),
      };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatHeader}>Chat App</h2>
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
                {userName}
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
