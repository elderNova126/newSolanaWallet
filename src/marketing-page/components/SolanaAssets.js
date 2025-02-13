import { useState } from "react";

const API_KEY = "YOUR_API_KEY";
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${API_KEY}`;

export default function SolanaAssets() {
  const [walletAddress, setWalletAddress] = useState("");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssets = async () => {
    if (!walletAddress) return alert("Enter a wallet address");
    setLoading(true);
    try {
      const response = await fetch(HELIUS_RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getAssetsByOwner",
          params: [walletAddress],
        }),
      });
      const data = await response.json();
      setAssets(data.result || []);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Solana Wallet Assets</h2>
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Enter Solana Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button
        onClick={fetchAssets}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Assets"}
      </button>
      <ul className="mt-4">
        {assets.map((asset, index) => (
          <li key={index} className="border p-2 rounded my-2">
            Asset: {asset.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
