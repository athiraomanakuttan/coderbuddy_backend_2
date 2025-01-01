import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const configureSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] },
    });
    const rooms = new Map<string, Set<string>>();
    io.on('connection', (socket) => {

        socket.on('join-room', ({ roomId }) => {
            if (!rooms.has(roomId)) {
                rooms.set(roomId, new Set());
            }
            const room = rooms.get(roomId)!;
            socket.join(roomId);
            room.add(socket.id);
            io.to(roomId).emit('participant-count', room.size);
        });
        socket.on('offer', (data) => {
            socket.to(data.roomId).emit('offer', data);
        });

        socket.on('answer', (data) => {
            socket.to(data.to).emit('answer', data);
        });

        socket.on('ice-candidate', (data) => {
            socket.to(data.roomId).emit('ice-candidate', data);
        });

        socket.on('leave-room', ({ roomId }) => {
            handleLeaveRoom(socket, roomId);
        });

        socket.on('disconnect', () => {
            for (const [roomId, participants] of rooms.entries()) {
                if (participants.has(socket.id)) {
                    handleLeaveRoom(socket, roomId);
                }
            }
        });

        function handleLeaveRoom(socket: any, roomId: string) {
            const room = rooms.get(roomId);
            if (room) {
                room.delete(socket.id);
                socket.leave(roomId);
                if (room.size === 0) {
                    rooms.delete(roomId);
                } else {
                    io.to(roomId).emit('participant-count', room.size);
                    io.to(roomId).emit('participant-left');
                }
            }
        }
    });

    return io;
};

export default configureSocket;