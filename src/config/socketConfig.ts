import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const configureSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] },
    });

    // Track rooms and their participants
    const rooms = new Map<string, Set<string>>();

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join-room', ({ roomId }) => {
            // Create room if it doesn't exist
            if (!rooms.has(roomId)) {
                rooms.set(roomId, new Set());
            }

            const room = rooms.get(roomId)!;
            
            // Join the room
            socket.join(roomId);
            room.add(socket.id);

            // Broadcast participant count to all in room
            io.to(roomId).emit('participant-count', room.size);
            
            console.log(`User ${socket.id} joined room ${roomId}. Current participants: ${room.size}`);
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
            // Find and leave all rooms this socket was in
            for (const [roomId, participants] of rooms.entries()) {
                if (participants.has(socket.id)) {
                    handleLeaveRoom(socket, roomId);
                }
            }
            console.log('User disconnected:', socket.id);
        });

        // Helper function to handle leaving rooms
        function handleLeaveRoom(socket: any, roomId: string) {
            const room = rooms.get(roomId);
            if (room) {
                room.delete(socket.id);
                socket.leave(roomId);
                
                // Remove room if empty
                if (room.size === 0) {
                    rooms.delete(roomId);
                } else {
                    // Notify remaining participants
                    io.to(roomId).emit('participant-count', room.size);
                    io.to(roomId).emit('participant-left');
                }
            }
        }
    });

    return io;
};

export default configureSocket;