import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const configureSocket = (server : HttpServer) => {
    const io = new Server(server, {
        cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] },
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Define socket events here
        socket.on('offer', (data) => {
            socket.to(data.to).emit('offer', data);
        });

        socket.on('answer', (data) => {
            socket.to(data.to).emit('answer', data);
        });

        socket.on('ice-candidate', (data) => {
            socket.to(data.to).emit('ice-candidate', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

export default configureSocket;
