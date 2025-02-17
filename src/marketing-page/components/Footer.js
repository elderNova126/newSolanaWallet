import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  const [solPrice, setSolPrice] = useState(null);
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
        );
        const data = await response.json();
        setSolPrice(parseFloat(data.price).toFixed(2));
      } catch (error) {
        console.error("Error fetching SOL price:", error);
      }
    };

    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box sx={{ textAlign: "center", padding: 2, background: "black" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Vertically align items in the center
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
          sx={{
            width: 100,
            height: 100,
            display: { xs: "none", sm: "block" },
          }}
        />
        <Typography
          sx={{
            fontSize: "4rem",
            fontWeight: 800,
            color: "#ffffff",
            marginLeft: "10px", // Add some spacing between the image and the text
          }}
        >
          ${solPrice}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "#ffffff",
        }}
      >
        © 2025 KOLs Online – All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
