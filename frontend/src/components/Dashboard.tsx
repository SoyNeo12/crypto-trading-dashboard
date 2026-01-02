import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface Trade {
    symbol: string;
    type: "BUY" | "SELL";
    price: number;
    amount: number;
    timestamp: number;
}

interface Portfolio {
    balance: number;
    trades: Trade[];
}

interface Metrics {
    balance: number;
    roi: string;
    totalTrades: number;
    profit: number;
}

const Dashboard: React.FC = () => {
    const [portfolio, setPortfolio] = useState<Portfolio>({ balance: 0, trades: [] });
    const [metrics, setMetrics] = useState<Metrics>({
        balance: 0,
        roi: "0%",
        totalTrades: 0,
        profit: 0,
    });

    const fetchPortfolio = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/portfolio");
            setPortfolio(res.data ?? { balance: 0, trades: [] });
        } catch (err) {
            console.error("Error fetching portfolio:", err);
            setPortfolio({ balance: 0, trades: [] });
        }
    };

    const fetchMetrics = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/metrics");
            setMetrics(res.data ?? { balance: 0, roi: "0%", totalTrades: 0, profit: 0 });
        } catch (err) {
            console.error("Error fetching metrics:", err);
            setMetrics({ balance: 0, roi: "0%", totalTrades: 0, profit: 0 });
        }
    };

    useEffect(() => {
        fetchPortfolio();
        fetchMetrics();

        const ws = new WebSocket("ws://localhost:8080");
        ws.onmessage = (msg) => {
            try {
                const data = JSON.parse(msg.data);
                if (data.type === "metrics") {
                    const updated = {
                        balance: data.data.balance ?? 0,
                        roi: data.data.roi ?? "0%",
                        totalTrades: data.data.totalTrades ?? 0,
                        profit: data.data.profit ?? 0,
                    };
                    setMetrics(updated);
                }
            } catch (err) {
                console.error("Error parsing WS message:", err);
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Crypto Trading Dashboard</h1>

            <h2>Balance: ${metrics.balance?.toFixed(2) ?? "0.00"}</h2>
            <h3>ROI: {metrics.roi ?? "0%"}</h3>
            <h3>Total Trades: {metrics.totalTrades ?? 0}</h3>
            <h3>Profit: ${metrics.profit?.toFixed(2) ?? "0.00"}</h3>

            <h2>Trade History</h2>
            <ul>
                {portfolio.trades.length > 0 ? (
                    portfolio.trades.map((t) => (
                        <li key={t.timestamp}>
                            {t.type} {t.amount} {t.symbol} @ ${t.price?.toFixed(2) ?? "0.00"}
                        </li>
                    ))
                ) : (
                    <li>No trades yet</li>
                )}
            </ul>

            <h2>Portfolio Graph</h2>
            {portfolio.trades.length > 0 ? (
                <LineChart
                    width={600}
                    height={300}
                    data={portfolio.trades.map((t) => ({
                        time: new Date(t.timestamp).toLocaleTimeString(),
                        value: t.price ?? 0,
                    }))}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            ) : (
                <p>No trade data to display</p>
            )}
        </div>
    );
};

export default Dashboard;