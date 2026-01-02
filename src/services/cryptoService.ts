import axios from "axios";

export async function getCryptoPrice(symbol: string): Promise<number> {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
  );
  return res.data[symbol].usd;
}