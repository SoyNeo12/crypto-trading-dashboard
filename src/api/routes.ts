import { Router } from 'express';
import { z } from 'zod';
import { getCryptoPrice } from '../services/cryptoService';
import { buy, sell, getPortfolio } from '../services/tradingService';
import { getMetrics } from '../services/metricsService';

const router = Router();

// GET /api/price/:symbol
router.get('/price/:symbol', async (req, res) => {
  try {
    const schema = z.object({ symbol: z.string() });
    const { symbol } = schema.parse(req.params);
    const price = await getCryptoPrice(symbol.toLowerCase());
    res.json({ symbol, price });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch price' });
  }
});

// GET /api/portfolio
router.get('/portfolio', async (_req, res) => {
  try {
    const portfolio = await getPortfolio();
    res.json(portfolio);
  } catch (err) {
    console.error('Error getting portfolio:', err);
    res.status(500).json({ error: 'Failed to get portfolio' });
  }
});

// GET /api/metrics
router.get('/metrics', async (_req, res) => {
  try {
    const metrics = await getMetrics();
    res.json(metrics);
  } catch (err) {
    console.error('Error getting metrics:', err);
    res.status(500).json({ error: 'Failed to get metrics' });
  }
});

// POST /api/trade/buy
router.post('/trade/buy', async (req, res) => {
  try {
    const schema = z.object({
      symbol: z.string(),
      amount: z.number().positive()
    });
    const { symbol, amount } = schema.parse(req.body);
    const price = await getCryptoPrice(symbol.toLowerCase());
    await buy(symbol, price, amount);
    const portfolio = await getPortfolio();
    res.json({ success: true, portfolio });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/trade/sell
router.post('/trade/sell', async (req, res) => {
  try {
    const schema = z.object({
      symbol: z.string(),
      amount: z.number().positive()
    });
    const { symbol, amount } = schema.parse(req.body);
    const price = await getCryptoPrice(symbol.toLowerCase());
    await sell(symbol, price, amount);
    const portfolio = await getPortfolio();
    res.json({ success: true, portfolio });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
