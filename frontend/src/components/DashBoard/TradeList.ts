import React from 'react';
import { Trade } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import styles from './Dashboard.module.css';

interface Props {
  trades: Trade[];
}

export const TradeList: React.FC<Props> = ({ trades }) => {
  if (!trades.length) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>No trades yet</p>
        <p className={styles.emptyStateSubtext}>Your trade history will appear here</p>
      </div>
    );
  }

  return (
    <div className={styles.tradeList}>
      {trades.map((trade, index) => (
        <div key={`${trade.timestamp}-${index}`} className={styles.tradeItem}>
          <div className={styles.tradeInfo}>
            <span
              className={styles.tradeBadge}
              style={{
                backgroundColor: trade.type === 'BUY' ? '#10b98120' : '#ef444420',
                color: trade.type === 'BUY' ? '#10b981' : '#ef4444'
              }}
            >
              {trade.type}
            </span>
            <span className={styles.tradeSymbol}>{trade.symbol}</span>
            <span className={styles.tradeAmount}>{trade.amount} units</span>
          </div>
          <div className={styles.tradeDetails}>
            <span className={styles.tradePrice}>{formatCurrency(trade.price)}</span>
            <span className={styles.tradeDate}>{formatDate(trade.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};