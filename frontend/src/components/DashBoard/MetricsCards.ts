import React from 'react';
import styles from './Dashboard.module.css';

interface Props {
  label: string;
  value: string;
  change?: string;
  color?: string;
}

export const MetricsCard: React.FC<Props> = ({ label, value, change, color }) => (
  <div className={styles.card}>
    <p className={styles.cardLabel}>{label}</p>
    <p className={styles.cardValue} style={{ color }}>{value}</p>
    {change && <p className={styles.cardChange}>{change}</p>}
  </div>
);
