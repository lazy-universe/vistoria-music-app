import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "./useEnv";

let socket: Socket | null = null;

const initSocket = () => {
  if (!socket) {
    socket = io( `${BACKEND_URL}`, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};