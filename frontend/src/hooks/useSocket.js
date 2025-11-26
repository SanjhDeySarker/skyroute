import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(namespace = "/seats") {
  const socketRef = useRef(null);

  useEffect(() => {
    // Replace with your backend URL (use env var on frontend)
    const url = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    const socket = io(`${url}${namespace}`, { autoConnect: false });

    socketRef.current = socket;
    socket.connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [namespace]);

  return socketRef;
}
