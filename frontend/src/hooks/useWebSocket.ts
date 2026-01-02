import { useEffect, useState } from 'react';
import { Metrics } from '../types';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

export const useWebSocket = (onMetricsUpdate: (data: Metrics) => void) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => setConnected(true);

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.type === 'metrics') {
          onMetricsUpdate({
            balance: data.data.balance ?? 0,
            roi: data.data.roi ?? '0%',
            totalTrades: data.data.totalTrades ?? 0,
            profit: data.data.profit ?? 0
          });
        }
      } catch (err) {
        console.error('WS message parse error:', err);
      }
    };

    ws.onerror = () => setConnected(false);
    ws.onclose = () => setConnected(false);

    return () => ws.close();
  }, [onMetricsUpdate]);

  return connected;
};
