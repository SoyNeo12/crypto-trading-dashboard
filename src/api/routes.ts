import { Router } from "express";
import { z } from "zod";
import { getCryptoPrice } from "../services/cryptoService";
import { buy, sell, getPortfolio } from "../services/tradingService";
import { getMetrics } from "../services/metricsService";

const router = Router();

// GET /api/price/:symbol
router.get("/price/:symbol", async (req, res) => {
    try {
        const schema = z.object({ symbol: z.string() });
        const { symbol } = schema.parse(req.params);
        const price = await getCryptoPrice(symbol.toLowerCase());
        res.json({ symbol, price });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch price" });
    }
});

// GET /api/portfolio
router.get("/portfolio", (req, res) => {
    res.json(getPortfolio());
});

// GET /api/metrics
router.get("/metrics", (req, res) => {
    res.json(getMetrics());
});

// POST /api/trade/buy
router.post("/trade/buy", async (req, res) => {
    try {
        const schema = z.object({
            symbol: z.string(),
            amount: z.number().positive()
        });
        const { symbol, amount } = schema.parse(req.body);
        const price = await getCryptoPrice(symbol.toLowerCase());
        buy(symbol, price, amount);
        res.json({ success: true, portfolio: getPortfolio() });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/trade/sell
router.post("/trade/sell", async (req, res) => {
    try {
        const schema = z.object({
            symbol: z.string(),
            amount: z.number().positive()
        });
        const { symbol, amount } = schema.parse(req.body);
        const price = await getCryptoPrice(symbol.toLowerCase());
        sell(symbol, price, amount);
        res.json({ success: true, portfolio: getPortfolio() });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;