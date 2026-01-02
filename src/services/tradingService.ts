import { logger } from "../utils/logger";
import { initDB } from "../db/db";

interface Trade {
    id?: number;
    symbol: string;
    type: "BUY" | "SELL";
    price: number;
    amount: number;
    timestamp: number;
}

export async function buy(symbol: string, price: number, amount: number) {
    const db = await initDB();
    const row = await db.get("SELECT balance FROM portfolio LIMIT 1");
    const balance = row.balance;

    const cost = price * amount;
    if (cost > balance) throw new Error("Insufficient funds");

    await db.run("UPDATE portfolio SET balance = balance - ? WHERE id = 1", cost);
    await db.run(
        "INSERT INTO trades(symbol, type, price, amount, timestamp) VALUES(?,?,?,?,?)",
        symbol,
        "BUY",
        price,
        amount,
        Date.now()
    );
    logger.info(`BUY ${amount} ${symbol} @ $${price}`);
}

export async function sell(symbol: string, price: number, amount: number) {
    const db = await initDB();

    const boughtAmount = await db.get(
        `SELECT SUM(amount) as total FROM trades WHERE symbol = ? AND type = "BUY"`,
        symbol
    );
    const soldAmount = await db.get(
        `SELECT SUM(amount) as total FROM trades WHERE symbol = ? AND type = "SELL"`,
        symbol
    );

    const owned = (boughtAmount.total || 0) - (soldAmount.total || 0);
    if (amount > owned) throw new Error("Not enough quantity to sell");

    await db.run("UPDATE portfolio SET balance = balance + ? WHERE id = 1", price * amount);
    await db.run(
        "INSERT INTO trades(symbol, type, price, amount, timestamp) VALUES(?,?,?,?,?)",
        symbol,
        "SELL",
        price,
        amount,
        Date.now()
    );
    logger.info(`SELL ${amount} ${symbol} @ $${price}`);
}

export async function getPortfolio() {
    const db = await initDB();
    const trades = await db.all("SELECT * FROM trades ORDER BY timestamp DESC");
    const balanceRow = await db.get("SELECT balance FROM portfolio LIMIT 1");
    return {
        balance: balanceRow.balance,
        trades,
    };
}