import React, { useEffect, useState } from "react";
import axios from "axios";

const MemeTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch meme tokens from an API
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // Replace with a real API endpoint for Solana meme tokens
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              category: "meme-token", // Example category
              order: "market_cap_desc", // Sort by market cap
              per_page: 10, // Number of tokens to fetch
              page: 1,
            },
          }
        );
        setTokens(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meme tokens. Please try again later.");
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trending Meme Tokens on Solana</h1>
      <ul>
        {tokens.map((token) => (
          <li key={token.id}>
            <h2>{token.name} ({token.symbol.toUpperCase()})</h2>
            <p>Price: ${token.current_price.toFixed(2)}</p>
            <p>Market Cap: ${token.market_cap.toLocaleString()}</p>
            <p>24h Volume: ${token.total_volume.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemeTokens;