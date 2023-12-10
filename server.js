import express from 'express';
import { createServer } from 'node:http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

server.listen(5700, () => {
    console.log('listening on port 5700');
});

wss.on('connection', (ws) => {
    
    console.log('User connected');

    ws.on('message', (data) => {
        const msg = Buffer.from(data).toString()
        console.log('Received message:', msg);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                // if (client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });

    ws.on('close', () => {
        console.log('User disconnected');
    });
});