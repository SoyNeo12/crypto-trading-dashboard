import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Portfolio } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>({ balance: 0, trades: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await axios.get<Portfolio>(`${API_BASE_URL}/api/portfolio`);
      setPortfolio(res.data ?? { balance: 0, trades: [] });
      setError(null);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError('Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return { portfolio, loading, error, refetch: fetchPortfolio };
};
