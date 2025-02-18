import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Stack,
  Grid,
  Avatar,
  useMediaQuery,
  CircularProgress,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";

const AccountDashboard = () => {
  const params = useParams();
  const id = params.id;
  const [holding, setHolding] = useState([]);
  const [defi_trades, setDefi_trades] = useState([]);
  const [tokenPnl, setTokenPnl] = useState([]);
  const [selectedValue, setSelectedValue] = useState("recent");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [loading, setLoading] = useState(true);
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

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
  function parseTokenAmount(amount) {
    const multipliers = { k: 1e-3, m: 1, b: 1e3 };
    const match = amount.match(/^([\d.]+)([kmb]?)$/i);
    if (!match) return { value: parseFloat(amount).toFixed(2) || 0, unit: "m" };
    const [, num, unit] = match;
    return {
      value: parseFloat(num) * (multipliers[unit.toLowerCase()] || 1),
      unit: unit || "m",
    };
  }

  function transformTransactions(transactions1) {
    const transactions = Object.values(transactions1)
      .sort((a, b) => new Date(b.Time) - new Date(a.Time))
      .reverse();

    const result = {};

    for (let i = transactions.length - 1; i >= 0; i--) {
      const { Buy_Sell, Token, Token_Amount, Sol_Amount, Time } =
        transactions[i];

      if (!result[Token]) {
        result[Token] = {
          buy: { Token: 0, Sol: 0, Time: "" },
          sell: { Token: 0, Sol: 0, Time: "" },
        };
      }

      const type = Buy_Sell.toLowerCase();
      const parsedToken = parseTokenAmount(Token_Amount);
      result[Token][type].Token += parsedToken.value;
      result[Token][type].Sol += parseFloat(Sol_Amount);
      result[Token][type].Time = Time; // Store the latest time
    }

    // Format output with 'm' unit for token amounts
    Object.keys(result).forEach((token) => {
      result[token].buy.Token = `${result[token].buy.Token.toFixed(2)}m`;
      result[token].sell.Token = `${result[token].sell.Token.toFixed(2)}m`;
    });
    return result;
  }
  useEffect(() => {
    setLoading(true);
    // Fetch data from the API
    fetch(`${baseUrl}/account/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((propertyData) => {
        setHolding(propertyData["holding"]);
        setDefi_trades(propertyData["defi"]);
        setTokenPnl(transformTransactions(propertyData["defi"]));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  let TempTotal_Profit = 0;

  // Loop through each token in the tokenPnl object
  Object.keys(tokenPnl).forEach((token) => {
    const sell = tokenPnl[token]?.sell?.Sol || 0; // Safely get sell.Sol, default to 0 if undefined
    const buy = tokenPnl[token]?.buy?.Sol || 0; // Safely get buy.Sol, default to 0 if undefined
    TempTotal_Profit += sell - buy; // Add the profit (sell - buy) to TempTotal_Profit
  });
  const calculateTotalUsdValue = (data) => {
    return data.reduce((sum, item) => {
      // Clean the value by removing the dollar sign, commas, and parse the number
      const value = parseFloat(item.Usd_Value.replace(/[^\d.-]/g, ""));
      return sum + value;
    }, 0);
  };

  // Format the number with commas and add '$' symbol
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US") + "$";
  };

  console.log("holding: ", holding);
  console.log("defi trades: ", transformTransactions(defi_trades));

  const GlassCard = ({ children, ...props }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        background: "#faf3e0",
        backdropFilter: "blur(12px)",
        border: "1px solid black",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
        ...props.sx,
      }}
    >
      {children}
    </Paper>
  );
  const isMobile = useMediaQuery("(max-width:600px)"); // Detects mobile screens

  // console.log("fffffffffffffffffffffff", tokenPnl);
  return (
    <Box
      sx={{
        background: "#faf3e0",
        minHeight: "100vh",
        pt: 4,
        pb: 8,
      }}
    >
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
          <Container maxWidth="xl">
            {/* Main Content Grid */}
            <Grid container alignItems="stretch">
              {/* Left Column - Top Holdings */}
              <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
                <Stack sx={{ m: 1, width: "100%", flex: 1 }}>
                  <GlassCard
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography
                        variant={isMobile ? "body1" : "h6"}
                        fontWeight="700"
                        color="black"
                      >
                        Top Holdings
                      </Typography>
                      <Typography
                        variant={isMobile ? "body1" : "h6"}
                        fontWeight="700"
                        color="black"
                      >
                        {formatCurrency(
                          calculateTotalUsdValue(holding.slice(1))
                        )}
                      </Typography>
                    </Stack>

                    {/* Scrollable Content */}
                    <Stack
                      flex={1} // Ensures stack takes available space
                      minHeight={isMobile ? 120 : 150}
                      sx={{
                        maxHeight: isMobile ? 120 : 150,
                        overflowY: "auto",
                        overflowX: "hidden",
                        backgroundColor: "#faf3e0",
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": { width: "3px" },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#d9c7a3",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "#cbb997",
                        },
                      }}
                    >
                      {holding.slice(1).map((holding, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            px: isMobile ? 0.5 : 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: isMobile ? 16 : 20,
                              height: isMobile ? 16 : 20,
                              borderRadius: 2,
                              background: "#faf3e0",
                              mr: isMobile ? 1 : 2,
                              fontSize: isMobile ? "1.2rem" : "1.5rem",
                            }}
                            src={holding.Token_Avatar}
                          />
                          <Box flex={1}>
                            <Typography
                              fontWeight="400"
                              color="black"
                              fontSize={isMobile ? "0.75rem" : "1rem"}
                            >
                              {holding.Token_Amount} {"  "} {holding.Token_Name}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography
                              fontWeight="400"
                              color="black"
                              fontSize={isMobile ? "0.75rem" : "1rem"}
                            >
                              {holding.Usd_Value}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </GlassCard>
                </Stack>
              </Grid>

              {/* Right Column - Defi Trades */}
              <Grid item xs={12} sm={6} md={8} sx={{ display: "flex" }}>
                <GlassCard
                  sx={{
                    m: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant={isMobile ? "body1" : "h6"}
                      fontWeight="700"
                      color="black"
                    >
                      Defi Trades
                    </Typography>
                  </Stack>

                  {/* Scrollable Trades List */}
                  <Stack
                    flex={1} // Makes sure it fills height
                    minHeight={isMobile ? 120 : 150}
                    sx={{
                      maxHeight: isMobile ? 120 : 150,
                      overflowY: "auto",
                      overflowX: "hidden",
                      backgroundColor: "#faf3e0",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": { width: "3px" },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#d9c7a3",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#cbb997",
                      },
                    }}
                  >
                    {defi_trades.map((trade, index) => (
                      <Grid container key={index} pl={1} pr={1} spacing={0.25}>
                        <Grid item xs={3} sm={3} md={3}>
                          <Box textAlign="left">
                            <Typography
                              sx={{
                                color:
                                  trade.Buy_Sell === "Buy" ? "green" : "red",
                                fontSize: {
                                  xs: "12px",
                                  sm: "14px",
                                  md: "16px",
                                },
                                display: "inline-block",
                              }}
                            >
                              {trade.Buy_Sell === "Buy" ? "Aped" : "Flipped"}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={8} sm={8} md={8}>
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
                            <Box textAlign="left">
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
                                {trade.Sol_Amount} SOL
                              </Typography>
                            </Box>
                            <Box textAlign="right">
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
                                {trade.Token_Amount} {trade.Token}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

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
                                href={trade.Link}
                                sx={{
                                  textDecoration: "none",
                                  color: "black",
                                  fontWeight: 600,
                                  fontSize: isMobile ? "0.8rem" : "1rem",
                                }}
                                target="_blank"
                              >
                                {getTimeDifference(
                                  getCurrentCETTime(),
                                  trade.Time
                                )}
                              </Link>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </Stack>
                </GlassCard>
              </Grid>
            </Grid>

            <Grid sx={{ marginTop: 3 }}>
              {/* Token PnL */}
              <GlassCard>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography variant="h6" fontWeight="700" color="black">
                    Token PnL{"  "}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "800", color: "black" }}
                  >
                    {TempTotal_Profit.toFixed(2)}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr", // Full-width for smaller screens
                      sm: "repeat(auto-fit, minmax(250px, 1fr))", // Fluid layout for mid-sized screens
                      md: "repeat(3, 1fr)", // 4 columns on medium screens and above
                      lg: "repeat(4, 1fr)", // Three equal columns on large screens
                    },
                    border: "1px solid black",
                    width: "100%",
                    p: 1,
                    gap:1,
                    background: "#faf3e0",
                    maxHeight: window.screen.height - 100,
                    overflowY: "auto",
                    overflowX: "hidden",
                    backgroundColor: "#faf3e0",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": { width: "3px" },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#d9c7a3",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#cbb997",
                    },
                  }}
                >
                  {Object.entries(tokenPnl).map(([token, transactions]) => (
                    <Paper
                      key={token}
                      sx={{ background: "#faf3e0", border:"dotted 1px black",borderRadius:0, }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pl: 1,
                          pr: 1,
                          borderRadius: 0,
                          background: "#faf3e0 !important",
                          py: 1, // Added padding for vertical spacing
                        }}
                      >
                        {/* Left Section (Avatar + Name) */}
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            alt="user pfp"
                            sx={{
                              width: { xs: 30, sm: 40 },
                              height: { xs: 30, sm: 40 },
                            }}
                          />
                          <Typography
                            variant="h5"
                            color="black"
                            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                          >
                            {token}
                          </Typography>
                        </Box>

                        {/* Right Section (Tooltip Text) */}
                        <Typography
                          color="black"
                          sx={{
                            ml: "auto",
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                          }}
                        >
                          {(
                            transactions.sell.Sol - transactions.buy.Sol
                          ).toFixed(2)}
                          Sol
                        </Typography>
                      </Box>

                      {/* Buy Section */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pl: 3,
                          pr: 3,
                          borderRadius: 0,
                          background: "#faf3e0",
                          py: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography fontSize={isMobile ? "0.75rem" : "1rem"} color="green">
                            aped
                          </Typography>
                          <Typography fontSize={isMobile ? "0.75rem" : "1rem"} color="black">
                            {transactions.buy.Sol.toFixed(2)}
                            {" ("}
                            {transactions.buy.Token}
                            {")"}
                          </Typography>
                        </Box>
                        <Typography
                          color="black"
                          fontSize={isMobile ? "0.75rem" : "1rem"}
                        >
                          {getTimeDifference(
                            getCurrentCETTime(),
                            transactions.buy.Time
                          )}
                        </Typography>
                      </Box>

                      {/* Sell Section */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pl: 3,
                          pr: 3,
                          borderRadius: 0,
                          background: "#faf3e0",
                          py: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography fontSize={isMobile ? "0.75rem" : "1rem"} color="red">
                            Flipped
                          </Typography>
                          <Typography fontSize={isMobile ? "0.75rem" : "1rem"} color="black">
                            {transactions.sell.Sol.toFixed(2)}
                            {" ("}
                            {transactions.sell.Token}
                            {")"}
                          </Typography>
                        </Box>
                        <Typography
                          color="black"
                          fontSize={isMobile ? "0.75rem" : "1rem"}
                        >
                          {getTimeDifference(
                            getCurrentCETTime(),
                            transactions.sell.Time
                          )}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </GlassCard>
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};

export default AccountDashboard;
