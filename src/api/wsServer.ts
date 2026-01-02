import { WebSocketServer } from "ws";
import { getMetrics } from "../services/metricsService";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", ws => {
    ws.send(JSON.stringify({ msg: "Connected to Crypto Trading WebSocket" }));

    const interval = setInterval(() => {
        const metrics = getMetrics();
        ws.send(JSON.stringify({ type: "metrics", data: metrics }));
    }, 3000);

    ws.on("close", () => clearInterval(interval));
});

console.log("WebSocket server running on ws://localhost:8080");