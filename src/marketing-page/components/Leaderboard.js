import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Link,
  Typography,
  Paper,
  Chip,
  Tooltip,
  colors,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const Leaderboard = () => {
  const [leader, setLeader] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://24.199.120.137:5000/leader")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((propertyData) => {
        setLeader(propertyData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "800px", // Set a fixed height for the container
        overflowY: "auto", // Enable vertical scrolling when content exceeds the height
        background: "#009B77",
        "&::-webkit-scrollbar": {
          width: "8px", // Adjust width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#009B77", // Scrollbar thumb color
        },
        "&::-webkit-scrollbar-track": {
          background: "#009B77", // Background color of the scrollbar track
        },
      }}
    >
      {leader.map((tx, index) => (
        <Paper
          key={tx.id}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
            p: 2,
            borderRadius: 0,
            background: "#009B77",
            borderBottom: "1px solid #000000",
            // borderTop: "2px solid #000000",
          }}
        >
          <Box
            sx={{
              display: "flex", // Enables flexbox
              alignItems: "center", // Centers content vertically
              justifyContent: "center", // Centers content horizontally
              height: "100%", // Ensures Box takes full height for vertical
              width: 30,
            }}
          >
            {index === 0 ? (
              <Avatar
                src="https://kolscan.io/images/Trophy.webp"
                alt={`${tx.name} pfp`}
                sx={{
                  textDecoration: "none",
                  width: 30,
                  height: 30,
                }}
              />
            ) : (
              <Typography sx={{ color: "black", fontWeight: 800 }}>
                {index + 1}
              </Typography>
            )}
          </Box>

          <Link
            href={`${tx.id}.html`}
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={tx.avatar}
              alt={`${tx.name} pfp`}
              sx={{
                textDecoration: "none",
                width: 40,
                height: 40,
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Link
                href={`${tx.id}.html`}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: 600,
                }}
              >
                {tx.username}
              </Link>
              <Link
                href={`${tx.twitter_link}`}
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="https://kolscan.io/images/Twitter.webp"
                  alt={`${tx.name} pfp`}
                  sx={{
                    textDecoration: "none",
                    width: 20,
                    height: 20,
                  }}
                />
              </Link>
              <Link
                href={`${tx.wallet_address}`}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {tx.wallet_address.split("/").pop().substring(0, 12)}
              </Link>
            </Box>
          </Box>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "black" }}>{tx.buy}</Typography>
            <Typography sx={{ color: "black" }}>/</Typography>
            <Typography sx={{ color: "red" }}>{tx.sell}</Typography>
            <Typography sx={{ color: "black", pl: 5, fontWeight: 800 }}>
              {tx.total_profit}
            </Typography>
            <Typography sx={{ color: "black", fontWeight: 800 }}>
              {tx.usd_value}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Leaderboard;
