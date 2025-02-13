import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Link,
  Typography,
  Paper,
  Chip,
  Tooltip,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import io from "socket.io-client";
import { alpha, useTheme } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const socket = io("http://localhost:5000"); // Connect to Flask-SocketIO server

const RealTimeTraders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [trades, setTrades] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);
    fetch("http://localhost:5000/trades")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((propertyData) => {
        const sortedTrades = Object.entries(propertyData["trades"])
          .sort((a, b) => new Date(b[1][0].Time) - new Date(a[1][0].Time))
          .reduce((acc, [wallet, transactions]) => {
            acc[wallet] = transactions;
            return acc;
          }, {});

        setTrades(sortedTrades);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        // setLoading(false);
      });

    socket.on("new_trade", (newTrade) => {
      console.log("New Trade: ", newTrade);
      setTrades((prevTrades) => {
        const updatedTrades = { ...prevTrades };

        if (!updatedTrades[newTrade.Wallet]) {
          updatedTrades[newTrade.Wallet] = [];
        }

        const isDuplicate = updatedTrades[newTrade.Wallet].some(
          (trade) => trade.Time === newTrade.Time
        );

        if (!isDuplicate) {
          updatedTrades[newTrade.Wallet] = [
            newTrade,
            ...updatedTrades[newTrade.Wallet],
          ];
        }

        const sortedTrades = Object.entries(updatedTrades)
          .sort((a, b) => new Date(b[1][0].Time) - new Date(a[1][0].Time))
          .reduce((acc, [wallet, transactions]) => {
            acc[wallet] = transactions;
            return acc;
          }, {});

        return sortedTrades;
      });
    });

    return () => {
      socket.off("new_trade");
    };
  }, []);
  const [IncreaseNum, setIncreaseNum] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIncreaseNum((prevNum) => prevNum + 2); // Increase by 2 every 2 seconds
    }, 2000); // Run every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Run once on mount
  console.log("************", trades);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(auto-fit, minmax(250px, 1fr))",
          md: "repeat(3, 1fr)",
        },
        width: "100%",
        p: 1,
        background: "rgb(255, 211, 91)",
        maxHeight: "800px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(200, 160, 60)", // Adjusted for contrast
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgb(255, 211, 91)",
        },
      }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {" "}
          {Object.entries(trades).map(([wallet, transactions]) => {
            const username = transactions[0]?.User_Name || "Unknown"; // Fix undefined username
            const Avatar_link = transactions[0]?.Avatar || "Unknown"; // Fix undefined username

            return (
              <Paper
                key={wallet}
                sx={{
                  border: "1px solid black",
                  minWidth: "250px", // Prevent items from shrinking too much
                }}
              >
                <Box
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 }, // Reduce gap for smaller screens
                    p: 1,
                    borderRadius: 0,
                    background: "#faf3e0",
                  }}
                >
                  <Link
                    href={`/account/${wallet}`}
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={Avatar_link}
                      alt={`user pfp`}
                      sx={{
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                      }}
                    />
                  </Link>

                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Link
                        href={`${wallet}.html`}
                        sx={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: 800,
                        }}
                      >
                        {username}
                      </Link>
                      <Link
                        href={`https://x.com/${username}`} // Fixed Twitter link
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          src="/images/Twitter.webp" // Fixed Twitter image path
                          alt={`${username} Twitter`}
                          sx={{
                            width: { xs: 15, sm: 20 },
                            height: { xs: 15, sm: 20 },
                          }}
                        />
                      </Link>
                    </Box>
                  </Box>
                </Box>

                {/* Transactions List */}
                <Box
                  sx={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#faf3e0",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#faf3e0",
                    },
                  }}
                >
                  {transactions.map((item, index) => (
                    <Box
                      key={index}
                      elevation={2}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: { xs: 1, sm: 2 },
                        pl: 2,
                        pr: 2,
                        borderRadius: 0,
                        background: "#faf3e0",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        {/* Left side */}
                        <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                          <Typography
                            sx={{
                              color: item.Buy_Sell === "Buy" ? "green" : "red", // Change color based on Buy/Sell
                              fontSize: { xs: "12px", sm: "14px" },
                              // width: "60px", // Set a fixed width for both 'Buy' and 'Sell'
                              display: "inline-block", // To ensure width is respected
                            }}
                          >
                            {item.Buy_Sell}
                          </Typography>
                          {item.Buy_Sell === "Buy" && (
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {item.Sol_Amount} sol
                            </Typography>
                          )}
                          {item.Buy_Sell === "Sell" && (
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {item.Token_Amount} {item.Token}
                            </Typography>
                          )}
                        </Box>

                        {/* Right side */}
                        <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                          {item.Buy_Sell === "Buy" && (
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {item.Token_Amount} {item.Token}
                            </Typography>
                          )}
                          {item.Buy_Sell === "Sell" && (
                            <Typography
                              sx={{
                                color: "black",
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {item.Sol_Amount} sol
                            </Typography>
                          )}

                          <Typography
                            sx={{
                              color: "black",
                              fontSize: { xs: "12px", sm: "14px" },
                            }}
                          >
                            <Link
                              href={item.Link} // URL to open in the new tab
                              target="_blank" // Open in a new tab
                              rel="noopener noreferrer" // Security best practice when using target="_blank"
                              sx={{
                                textDecoration: "none",
                                color: "inherit", // Keeps the text color consistent
                                cursor: "pointer", // Pointer cursor effect
                              }}
                            >
                              {getTimeDifference(
                                getCurrentCETTime(),
                                item.Time
                              )}
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default RealTimeTraders;
