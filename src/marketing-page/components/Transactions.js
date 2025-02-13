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

// const transactions = [
//   {
//     id: "BTf4A2exGK9BCVDNzy65b9dUzXgMqB4weVkvTMFQsadd",
//     name: "Kev",
//     amount: "2.04",
//     sol: "51.8m",
//     token: "Gwenchana",
//     price: "0.0000081",
//     image:
//       "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
//     time: "1m ago",
//     profit: "+12.5%",
//     txLink:
//       "https://solscan.io/tx/7eNBgymB54NjfHfokFkqAAxyqMYQsFK2vsrUh7x8aXsTmpsgLJSKp1cNDzNT6SqJG3hCCzd8yoNrij1w7jRQtzP",
//   },
//   {
//     id: "ATFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2B",
//     name: "Marcell",
//     amount: "50.7",
//     sol: "557k",
//     token: "SSE",
//     price: "0.019",
//     image:
//       "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
//     time: "2m ago",
//     profit: "+8.3%",
//     txLink:
//       "https://solscan.io/tx/4UnTRwH6enGDhfqSzUXBUdyryf3AyUpM5E2Qun8aaooA3wJv1f1RZeW8aFt7wS9TMad15BJZDra4bqdEqqRTMm1U",
//   },
//   // Add 8 more similar transactions with different values
//   {
//     id: "CTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2C",
//     name: "Alex",
//     amount: "35.2",
//     sol: "420k",
//     token: "PEPE",
//     price: "0.025",
//     image:
//       "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
//     time: "5m ago",
//     profit: "+15.7%",
//     txLink: "https://solscan.io/tx/sample3",
//   },
//   {
//     id: "DTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2D",
//     name: "Sarah",
//     amount: "18.9",
//     sol: "283k",
//     token: "DOGE",
//     price: "0.012",
//     image:
//       "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
//     time: "8m ago",
//     profit: "+5.2%",
//     txLink: "https://solscan.io/tx/sample4",
//   },
//   {
//     id: "ETFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2E",
//     name: "Mike",
//     amount: "42.6",
//     sol: "639k",
//     token: "SHIB",
//     price: "0.008",
//     image:
//       "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
//     time: "12m ago",
//     profit: "+19.8%",
//     txLink: "https://solscan.io/tx/sample5",
//   },
//   {
//     id: "FTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2F",
//     name: "Emma",
//     amount: "27.3",
//     sol: "410k",
//     token: "BONK",
//     price: "0.015",
//     image:
//       "https://cdn.kolscan.io/profiles/GfXQesPe3Zuwg8JhAt6Cg8euJDTVx751enp9EQQmhzPH.png",
//     time: "15m ago",
//     profit: "+11.4%",
//     txLink: "https://solscan.io/tx/sample6",
//   },
//   {
//     id: "FTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2F",
//     name: "Emma",
//     amount: "27.3",
//     sol: "410k",
//     token: "BONK",
//     price: "0.015",
//     image:
//       "https://cdn.kolscan.io/profiles/GfXQesPe3Zuwg8JhAt6Cg8euJDTVx751enp9EQQmhzPH.png",
//     time: "15m ago",
//     profit: "+11.4%",
//     txLink: "https://solscan.io/tx/sample6",
//   },
//   {
//     id: "FTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2F",
//     name: "Emma",
//     amount: "27.3",
//     sol: "410k",
//     token: "BONK",
//     price: "0.015",
//     image:
//       "https://cdn.kolscan.io/profiles/GfXQesPe3Zuwg8JhAt6Cg8euJDTVx751enp9EQQmhzPH.png",
//     time: "15m ago",
//     profit: "+11.4%",
//     txLink: "https://solscan.io/tx/sample6",
//   },
//   {
//     id: "FTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2F",
//     name: "Emma",
//     amount: "27.3",
//     sol: "410k",
//     token: "BONK",
//     price: "0.015",
//     image:
//       "https://cdn.kolscan.io/profiles/GfXQesPe3Zuwg8JhAt6Cg8euJDTVx751enp9EQQmhzPH.png",
//     time: "15m ago",
//     profit: "+11.4%",
//     txLink: "https://solscan.io/tx/sample6",
//   },
//   {
//     id: "FTFRUwvyMh61w2Ab6AZxUyxsAfiiuG1RqL6iv3Vi9q2F",
//     name: "Emma",
//     amount: "27.3",
//     sol: "410k",
//     token: "BONK",
//     price: "0.015",
//     image:
//       "https://cdn.kolscan.io/profiles/GfXQesPe3Zuwg8JhAt6Cg8euJDTVx751enp9EQQmhzPH.png",
//     time: "15m ago",
//     profit: "+11.4%",
//     txLink: "https://solscan.io/tx/sample6",
//   },
// ];

const Transactions = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
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
    fetch("http://localhost:5000/latest")
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
    <Box sx={{ 
      width: "100%", 
      background: "#faf3e0",
      px: 3  // Added horizontal padding
    }}>
      {transactions.map((tx) => (
        <Paper
          key={tx.Wallet}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1.5, sm: 2 },
            p: 2,
            borderRadius: 0,
            background: "#faf3e0",
            borderTop: "1px solid #000000",
            maxWidth: "1400px", // Added max-width
            mx: "auto", // Center the paper
          }}
        >
          {/* Left Section */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            minWidth: "120px", // Fixed width for avatar and name
          }}>
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
              href={`${tx.id}.html`}
              sx={{
                textDecoration: "none",
                color: "black",
                fontWeight: 600,
              }}
            >
              {tx.User_Name}
            </Link>
          </Box>

          {/* Middle Section */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            flex: 1,
            maxWidth: "300px", // Added max-width for middle section
            justifyContent: "center"
          }}>
            <Chip
              label={tx.Buy_Sell === "Buy" ? "bought" : "sold"}
              size="small"
              sx={{
                color: "white",
                backgroundColor: tx.Buy_Sell === "Buy" ? "green" : "red",
                fontWeight: 600,
                minWidth: "80px", // Fixed width for chip
              }}
            />
            
            <Typography
              variant="body2"
              sx={{
                color: tx.Buy_Sell === "Buy" ? "green" : "red",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                minWidth: "150px", // Fixed width for amount
              }}
            >
              {tx.Sol_Amount} sol {`(${tx.Token_Amount})`}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontWeight: 500,
                minWidth: "80px", // Fixed width for token name
              }}
            >
              of <span style={{ fontWeight: "bold" }}>{tx.Token}</span>
            </Typography>
          </Box>

          {/* Right Section */}
          <Box sx={{ 
            minWidth: "50px", // Fixed width for timestamp
            textAlign: "right"
          }}>
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
