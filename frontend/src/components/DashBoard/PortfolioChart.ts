import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trade } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';
import styles from './Dashboard.module.css';

interface Props {
  trades: Trade[];
}

export const PortfolioChart: React.FC<Props> = ({ trades }) => {
  if (!trades.length) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>No trading data available</p>
        <p className={styles.emptyStateSubtext}>Start trading to see your portfolio performance</p>
      </div>
    );
  }

  const chartData = trades
    .slice()
    .reverse()
    .map((trade, index) => ({ name: formatDate(trade.timestamp), price: trade.price, index }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: 12 }} />
        <YAxis stroke="#9ca3af" style={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#f3f4f6'
          }}
          formatter={(value: number) => [formatCurrency(value), 'Price']}
        />
        <Area type="monotone" dataKey="price" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};