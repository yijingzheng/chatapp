import express from 'express';
import { createServer } from 'node:http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

const PORT = process.env.PORT || 5700;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

wss.on('connection', (ws) => {
    
    console.log('User connected');

    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(JSON.parse(data)));
            }
        });
    });

    ws.on('close', () => {
        console.log('User disconnected');
    });
});