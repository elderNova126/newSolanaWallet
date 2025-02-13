import { useState } from "react";

const API_KEY = "a8b7566f-4ffb-4428-8517-cfc3266e66a8";
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

export default function SolanaTransactions() {
  const [walletAddress, setWalletAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!walletAddress) return alert("Enter a wallet address");
    setLoading(true);
    try {
      const response = await fetch(HELIUS_RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getSignaturesForAddress",
          params: [walletAddress, { limit: 100 }],
        }),
      });
      const data = await response.json();
      setTransactions(data.result || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Solana Wallet Transactions</h2>
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Enter Solana Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button
        onClick={fetchTransactions}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Transactions"}
      </button>
      <ul className="mt-4">
        {transactions.map((tx, index) => (
          <li key={index} className="border p-2 rounded my-2">
            Signature: {tx.signature}
          </li>
        ))}
      </ul>
    </div>
  );
}
