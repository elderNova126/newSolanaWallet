import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Typography, Grid,CircularProgress } from "@mui/material";
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

    if (window.location.hash === "#Trending") {
      document
        .getElementById("Trending")
        .scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Paper
        id="Trending"
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 0, // Setting border radius to 0
          background: "rgb(156, 185, 212) 0%",
          borderRight: "2px solid #000000",
          borderLeft: "2px solid #000000",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "VT323, monospace",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            background: "rgb(0, 0, 0) 0%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            borderRadius: 0, // Setting border radius to 0
            borderBottom: "1px solid #000000",
            pl: 3,
          }}
        >
          Meme Tokens on Solana
        </Typography>
        <Box sx={{height: window.screen.height - 350,}}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "100vh", width: "100%" }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {tokens.map((token, index) => (
                <Grid container key={index} pl={1} pr={1} spacing={0.25}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="left">
                      <Typography
                        sx={{
                          fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Scaling font size
                          display: "inline-block", // To ensure width is respected
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {token.name} ({token.symbol.toUpperCase()})
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                    <Box textAlign="left" color="black">
                      Price: ${token.current_price.toFixed(2)}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Box textAlign="left" color="black">
                      Market Cap: ${token.market_cap.toLocaleString()}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="left" color="black">
                      24h Volume: ${token.total_volume.toLocaleString()}
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default MemeTokens;
