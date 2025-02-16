import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Link,
  Typography,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const Transactions = () => {

  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const getTimeDifference = (dateTime1, dateTime2) => {
    const date1 = new Date(dateTime1);
    const date2 = new Date(dateTime2);
    // console.log("second date---", date2);
    let diffInSeconds = Math.abs((date1 - date2) / 1000); // Difference in seconds

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`; // Seconds
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`; // Minutes
    }

    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours < 24) {
      return `${diffInHours}h`; // Hours
    }

    const diffInDays = Math.floor(diffInSeconds / 86400);
    if (diffInDays < 30) {
      return `${diffInDays}d`; // Days
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}mon`; // Months
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y`; // Years
  };
  function getCurrentCETTime() {
    const now = new Date();

    const options = {
      timeZone: "Europe/Berlin", // CET (GMT+0100, adjusts for DST)
      year: "numeric",
      month: "short", // "Feb"
      day: "2-digit", // "12"
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    return now.toLocaleString("en-US", options).replace(",", "");
  }
  useEffect(() => {
    fetch(`${baseUrl}/latest`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((propertyData) => {
        setTransactions(propertyData["trades"]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("##################", transactions);
  return (
    <Box
      sx={{
        width: "100%",
        background: "#faf3e0",
        px: 3, // Added horizontal padding
      }}
    >
      {transactions.map((tx) => (
        <Paper
          key={tx.Wallet}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1.5, sm: 2 },
            p: 1,
            borderRadius: 0,
            background: "#faf3e0",
            borderTop: "1px solid #000000",
            maxWidth: "1400px", // Added max-width
            mx: "auto", // Center the paper
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: "120px", // Fixed width for avatar and name
            }}
          >
            <Link
              href={`/account/${tx.Wallet}`}
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                src={tx.Avatar}
                alt={`${tx.User_Name} pfp`}
                sx={{
                  textDecoration: "none",
                  width: 40,
                  height: 40,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />
            </Link>

            <Link
              href={`/account/${tx.Wallet}`}
              sx={{
                textDecoration: "none",
                color: "black",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              {tx.User_Name}
            </Link>

            <Chip
              label={tx.Buy_Sell === "Buy" ? "aped" : "flipped"}
              color="white  !important"
              sx={{
                fontSize: "1rem",
                color: "white  !important",
                background:
                  tx.Buy_Sell === "Buy"
                    ? "green  !important"
                    : "red !important",
                fontWeight: 600,
                minWidth: "60px", // Fixed width for chip
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: tx.Buy_Sell === "Buy" ? "green" : "red",
                display: "flex",
                alignItems: "center",

                minWidth: "150px", // Fixed width for amount
              }}
            >
              {tx.Sol_Amount} SOL {`(${tx.Token_Amount}) `}{" "}
              <Link href={`https://dexscreener.com/solana/${tx.Link.split("/")[4]}`}>
                <span
                  style={{ fontWeight: "bold", color: "black", paddingLeft: 5 }}
                >
                  {tx.Token}
                </span>
              </Link>
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontWeight: 500,
                minWidth: "80px", // Fixed width for token name
              }}
            ></Typography>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              minWidth: "50px", // Fixed width for timestamp
              textAlign: "right",
            }}
          >
            <Tooltip title="View transaction">
              <Link
                href={tx.Link}
                target="_blank"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {getTimeDifference(getCurrentCETTime(), tx.Time)}
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </Link>
            </Tooltip>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Transactions;
