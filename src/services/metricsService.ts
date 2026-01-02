import { getPortfolio } from './tradingService';

export async function getMetrics() {
  const portfolio = await getPortfolio();

  const initialBalance = 10000;
  const roi = ((portfolio.balance / initialBalance - 1) * 100).toFixed(2);

  const totalTrades = portfolio.trades.length;

  const buyTotal = portfolio.trades.filter((t) => t.type === 'BUY').reduce((sum, t) => sum + t.price * t.amount, 0);

  const sellTotal = portfolio.trades.filter((t) => t.type === 'SELL').reduce((sum, t) => sum + t.price * t.amount, 0);

  const profit = sellTotal - buyTotal;

  return {
    balance: portfolio.balance,
    roi: roi + '%',
    totalTrades,
    profit
  };
}
