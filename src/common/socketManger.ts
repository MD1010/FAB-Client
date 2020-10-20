import io from "socket.io-client";
import { SERVER_URL } from "../consts/ServerUrl";

export const socket = io(SERVER_URL);
