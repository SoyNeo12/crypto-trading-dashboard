import { initDB } from "../src/db/db";

async function seed() {
    const db = await initDB();

    await db.run("DELETE FROM trades");

    const now = Date.now();
    const trades = [
        { symbol: "BTC", type: "BUY", price: 20000, amount: 0.1, timestamp: now - 1000000 },
        { symbol: "ETH", type: "BUY", price: 1000, amount: 2, timestamp: now - 900000 },
        { symbol: "BTC", type: "SELL", price: 21000, amount: 0.05, timestamp: now - 800000 },
        { symbol: "SOL", type: "BUY", price: 30, amount: 10, timestamp: now - 700000 },
    ];

    for (const t of trades) {
        await db.run(
            "INSERT INTO trades(symbol, type, price, amount, timestamp) VALUES(?,?,?,?,?)",
            t.symbol,
            t.type,
            t.price,
            t.amount,
            t.timestamp
        );
    }

    console.log("Seed data inserted!");
}

seed();
