import io from "socket.io-client";
import { SERVER_URL } from "src/consts/ServerUrl";

export const socket = io(SERVER_URL);
