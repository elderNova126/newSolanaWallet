import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Box,
  Link,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import io from "socket.io-client";
import { alpha, useTheme } from "@mui/material/styles";

const baseUrl = process.env.REACT_APP_BASE_URL;
const socket = io(baseUrl); // Connect to Flask-SocketIO server

const RealTimeTraders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { trades, setTrades } = useContext(CryptoTrans);

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
    return now.toLocaleString("en-US", options).replace(",", "") + " GMT+0100";
  }
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/trades`)
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
    if (window.location.hash === "#Live") {
      document.getElementById("Live").scrollIntoView({ behavior: "smooth" });
    }
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

  return (
    <Box>
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr", // Single column on extra-small screens
                sm: "repeat(1fr)", // Two flexible columns on small screens
                md: "repeat(2, 1fr)", // Two equal columns on medium screens
                lg: "repeat(3, 1fr)", // Three equal columns on large screens
              },
              width: "100%",
              p: 1,
              background: "rgb(236, 236, 236)",
              maxHeight: window.screen.height - 350,
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgb(117, 116, 116)", // Adjusted for contrast
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgb(236, 236, 236)",
              },
            }}
          >
            {Object.entries(trades).map(([wallet, transactions]) => {
              const username = transactions[0]?.User_Name || "Unknown"; // Fix undefined username
              const Avatar_link = transactions[0]?.Avatar || "Unknown"; // Fix undefined username

              return (
                <>
                  <Paper
                    key={wallet}
                    sx={{
                      border: "1px solid black",
                      background: "#faf3e0",
                      // minWidth: "250px", // Prevent items from shrinking too much
                    }}
                  >
                    <Box
                      elevation={2}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: { xs: 1, sm: 2 }, // Reduce gap for smaller screens
                        pl: 1,
                        pr: 1,
                        pt: 1,
                        borderRadius: 0,
                        background: "#faf3e0",
                        borderBottom: "dotted 1px black",
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
                            href={`/account/${wallet}`}
                            sx={{
                              textDecoration: "none",
                              fontSize: 16,
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
                        <>
                          <Grid
                            container
                            key={index}
                            pl={1}
                            pr={1}
                            spacing={0.25}
                          >
                            {/* Buy/Sell Column */}
                            <Grid item xs={2} sm={2} md={2}>
                              <Box textAlign="left">
                                <Typography
                                  sx={{
                                    color:
                                      item.Buy_Sell === "Buy" ? "green" : "red",
                                    fontSize: {
                                      xs: "12px",
                                      sm: "14px",
                                      md: "16px",
                                    }, // Responsive font size
                                    display: "inline-block",
                                  }}
                                >
                                  {item.Buy_Sell === "Buy" ? "Aped" : "Flipped"}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* Token Amount and Name */}
                            <Grid item xs={9} sm={9} md={9}>
                              <Box
                                display="flex"
                                justifyContent={{
                                  xs: "center",
                                  sm: "space-between",
                                }}
                                gap={0.5}
                                alignItems="center"
                                flexWrap="wrap"
                              >
                                {/* Left Section */}
                                <Box textAlign="left">
                                  {item.Buy_Sell === "Buy" && (
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: {
                                          xs: "10px",
                                          sm: "14px",
                                          md: "16px",
                                        },
                                      }}
                                    >
                                      {item.Sol_Amount} sol
                                    </Typography>
                                  )}
                                  {item.Buy_Sell === "Sell" && (
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: {
                                          xs: "10px",
                                          sm: "14px",
                                          md: "16px",
                                        },
                                      }}
                                    >
                                      {item.Token_Amount}{" "}
                                      <Link
                                        href={`https://photon-sol.tinyastro.io/en/lp/${username}`}
                                        target="_blank"
                                      >
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            color: "black",
                                          }}
                                        >
                                          {item.Token}
                                        </span>
                                      </Link>
                                    </Typography>
                                  )}
                                </Box>

                                {/* Right Section */}
                                <Box textAlign="right">
                                  {item.Buy_Sell === "Buy" && (
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: {
                                          xs: "10px",
                                          sm: "14px",
                                          md: "16px",
                                        },
                                      }}
                                    >
                                      {item.Token_Amount}{" "}
                                      <Link
                                        href={`https://photon-sol.tinyastro.io/en/lp/${username}`}
                                        target="_blank"
                                      >
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            color: "black",
                                          }}
                                        >
                                          {item.Token}
                                        </span>
                                      </Link>
                                    </Typography>
                                  )}
                                  {item.Buy_Sell === "Sell" && (
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: {
                                          xs: "10px",
                                          sm: "14px",
                                          md: "16px",
                                        },
                                      }}
                                    >
                                      {item.Sol_Amount} sol
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </Grid>

                            {/* Time Column */}
                            <Grid item xs={1} sm={1} md={1}>
                              <Box textAlign="right">
                                <Typography
                                  sx={{
                                    color: "black",
                                    fontSize: {
                                      xs: "10px",
                                      sm: "12px",
                                      md: "14px",
                                    },
                                  }}
                                >
                                  <Link
                                    href={item.Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                      textDecoration: "none",
                                      color: "inherit",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {getTimeDifference(
                                      getCurrentCETTime(),
                                      item.Time
                                    )}
                                  </Link>
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </>
                      ))}
                    </Box>
                  </Paper>
                </>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default RealTimeTraders;
