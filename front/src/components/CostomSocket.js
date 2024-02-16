 import io from "socket.io-client";
import { URL } from "../Url";
// import { SOCKET_URL } from "config";



// export const costomeSocket = io(URL.API_BASE_URL);
const userID = localStorage.getItem("token")
export const costomeSocket = io(URL.API_BASE_URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    auth : {
        token : userID
    }
});