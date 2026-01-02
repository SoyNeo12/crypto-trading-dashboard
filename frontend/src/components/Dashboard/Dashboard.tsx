import React from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useMetrics } from '../../hooks/useMetrics';
import { MetricsCard } from './MetricsCards';
import { TradeList } from './TradeList';
import { PortfolioChart } from './PortfolioChart';
import styles from './Dashboard.module.css';
import { formatCurrency } from '../../utils/formatters';

export const Dashboard: React.FC = () => {
  const { portfolio, loading: portfolioLoading } = usePortfolio();
  const { metrics, loading: metricsLoading } = useMetrics();

  const loading = portfolioLoading || metricsLoading;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header, status, error banner */}

      {/* Metrics */}
      <div className={styles.metricsGrid}>
        <MetricsCard label="Balance" value={formatCurrency(metrics.balance)} change={`${metrics.roi} ROI`} />
        <MetricsCard
          label="Profit/Loss"
          value={formatCurrency(metrics.profit)}
          change={metrics.profit >= 0 ? 'Profitable' : 'In Loss'}
          color={metrics.profit >= 0 ? '#10b981' : '#ef4444'}
        />
        <MetricsCard label="Total Trades" value={`${metrics.totalTrades}`} change="All-time activity" />
      </div>

      {/* Charts */}
      <div className={styles.chartSection}>
        <h2 className={styles.sectionTitle}>Portfolio Performance</h2>
        <PortfolioChart trades={portfolio.trades} />
      </div>

      {/* Trade History */}
      <div className={styles.tradeSection}>
        <h2 className={styles.sectionTitle}>Trade History</h2>
        <TradeList trades={portfolio.trades} />
      </div>
    </div>
  );
};

export default Dashboard;
