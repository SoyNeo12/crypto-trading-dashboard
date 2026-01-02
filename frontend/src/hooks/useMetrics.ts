import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Metrics } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    balance: 0,
    roi: '0%',
    totalTrades: 0,
    profit: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await axios.get<Metrics>(`${API_BASE_URL}/api/metrics`);
      setMetrics(res.data ?? { balance: 0, roi: '0%', totalTrades: 0, profit: 0 });
      setError(null);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to load metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, loading, error, refetch: fetchMetrics };
};
