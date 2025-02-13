import { useState } from "react";

const API_KEY = "a8b7566f-4ffb-4428-8517-cfc3266e66a8";
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;
const KNOWN_WALLETS = [
];

export default function TopTraders() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTopTraders = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        KNOWN_WALLETS.map(async (wallet) => {
          const response = await fetch(HELIUS_RPC_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "getSignaturesForAddress",
              params: [wallet, { limit: 100 }],
            }),
          });
          const data = await response.json();
          return { wallet, trades: data.result.length };
        })
      );
      
      const sortedTraders = results.sort((a, b) => b.trades - a.trades);
      setTraders(sortedTraders);
    } catch (error) {
      console.error("Error fetching traders:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Top Solana Traders</h2>
      <button
        onClick={fetchTopTraders}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Top Traders"}
      </button>
      <ul className="mt-4">
        {traders.map((trader, index) => (
          <li key={index} className="border p-2 rounded my-2">
            Wallet: {trader.wallet} | Trades: {trader.trades}
          </li>
        ))}
      </ul>
    </div>
  );
}
