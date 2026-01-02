import { getPortfolio } from "./tradingService";

export async function getMetrics() {
    const portfolio = await getPortfolio();

    const roi = portfolio.trades.length
        ? (portfolio.balance / 10000 - 1) * 100
        : 0;

    const totalTrades = portfolio.trades.length;

    const profit = portfolio.trades
        .filter(t => t.type === "SELL")
        .reduce((sum, t) => sum + t.price * t.amount, 0);

    return {
        balance: portfolio.balance,
        roi: roi.toFixed(2) + "%",
        totalTrades,
        profit
    };
}