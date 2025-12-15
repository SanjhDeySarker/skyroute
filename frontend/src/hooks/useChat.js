import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useChat(token) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io(import.meta.env.VITE_API_URL + "/chat", {
      auth: { token }
    });

    s.on("messages", setMessages);
    s.on("newMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    s.emit("loadMessages");
    setSocket(s);

    return () => s.disconnect();
  }, [token]);

  return { socket, messages };
}
