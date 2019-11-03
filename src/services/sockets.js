import io from "socket.io-client";
import { host } from "../config";

export const socket = io(host);
