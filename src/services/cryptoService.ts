import axios from 'axios';

export async function getCryptoPrice(symbol: string): Promise<number> {
  const res = await axios.get(`${process.env.COINGECKO_API_URL}/simple/price?ids=${symbol}&vs_currencies=usd`);
  return res.data[symbol].usd;
}
