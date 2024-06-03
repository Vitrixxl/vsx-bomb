import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
let socket: any;

export const initializeSocket = () => {
    if (!socket) {
        socket = io('http://localhost:3002');

        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });


    }

    return socket;
};

export const getSocket = () => {
    return socket;
};