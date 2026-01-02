export interface Trade {
  id?: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  amount: number;
  timestamp: number;
}

export interface Portfolio {
  balance: number;
  trades: Trade[];
}

export interface Metrics {
  balance: number;
  roi: string;
  totalTrades: number;
  profit: number;
}
