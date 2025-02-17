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
import CustomButton from "./CustomButton";

const Leaderboard = (count) => {
  const [leader, setLeader] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedShortWallet, setCopiedShortWallet] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch data from the API
    fetch(`${baseUrl}/leader`)
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
    if (window.location.hash === "#TopKol") {
      document.getElementById("TopKol").scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  // console.log("dddddddddddddddddddddddd",leader)
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: window.screen.height - 350, // Set a fixed height for the container
        overflowY: "auto", // Enable vertical scrolling when content exceeds the height
        overflowX: "hidden",
        background: "#009B77",
        "&::-webkit-scrollbar": {
          width: "8px", // Adjust width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(3, 83, 65)", // Scrollbar thumb color
        },
        "&::-webkit-scrollbar-track": {
          background: " #009B77", // Background color of the scrollbar track
        },
      }}
    >
      {leader.slice(0, count.count).map((tx, index) => (
        <Paper
          key={tx.id}
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Adjust layout for smaller screens
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            p: 2,
            borderRadius: 0,
            background: "#009B77",
            borderBottom: "1px solid #000000",
          }}
        >
          <Box
            sx={{
              display: "flex", // Enables flexbox
              alignItems: "center", // Centers content vertically
              justifyContent: "center", // Centers content horizontally
              height: "100%", // Ensures Box takes full height for vertical
              width: 30,
              mb: { xs: 1, sm: 0 }, // Margin for small screens
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
            href={`/account/${tx.wallet_address.split("/").pop()}`}
            sx={{
              textDecoration: "none",
              display: "flex",
              color: "black",
              fontWeight: 600,
              flexDirection: { xs: "column", sm: "row" }, // Vertical on small screens, horizontal on larger screens
              alignItems: "center",
              gap: 1, // Increased gap for horizontal layout
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
            <Box sx={{ color: "black", textAlign: "center" }}>
              {tx.username}
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
              <Link
                href={tx.twitter_link}
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="/images/Twitter.webp"
                  alt={`${tx.name} pfp`}
                  sx={{
                    textDecoration: "none",
                    width: 20,
                    height: 20,
                  }}
                />
              </Link>
              <Box
                sx={{
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(
                    tx.wallet_address.split("/").pop()
                  );
                  setCopied(true);
                  setCopiedShortWallet(
                    tx.wallet_address.split("/").pop().substring(0, 12)
                  );
                  setTimeout(() => {
                    setCopied(false);
                  }, 500);
                }}
              >
                {copied &&
                copiedShortWallet ===
                  tx.wallet_address.split("/").pop().substring(0, 12)
                  ? "Copied"
                  : tx.wallet_address.split("/").pop().substring(0, 12)}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "black" }}>{tx.buy}</Typography>
            <Typography sx={{ color: "black" }}>/</Typography>
            <Typography sx={{ color: "red" }}>{tx.sell}</Typography>
            <Typography sx={{ color: "black", pl: 1, fontWeight: 800 }}>
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
