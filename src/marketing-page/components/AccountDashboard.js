import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  Container,
  Stack,
  Grid,
  Avatar,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import { PublicKey } from "@solana/web3.js";
import { Link, useParams } from "react-router-dom";

const dataLists = [
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
  {
    image:
      "https://cdn.kolscan.io/profiles/3h65MmPZksoKKyEpEjnWU2Yk2iYT5oZDNitGy5cTaxoE.png",
    name: "Kev",
    sol_amount: "2.04",
    usd_amount: "$51.8",
    b_type: "Buy",
    b_amount: "235.3 Sol (23.4m)",
    b_date: "2d",
    s_type: "Sell",
    s_amount: "90.91 Sol (18.4m)",
    s_date: "2d",
  },
];
const AccountDashboard = () => {
  const params = useParams();
  const id = params.id;
  const [holding, setHolding] = useState([]);
  const [defi_trades, setDefi_trades] = useState([]);
  const [tokenPnl, setTokenPnl] = useState([]);
  const [selectedValue, setSelectedValue] = useState("recent");

  // const [mergedDataSell, setMergedDataSell] = useState([]);
  // const [mergedDataBuy, setMergedDataBuy] = useState([]);
  const [allSol, setAllSol] = useState([]);
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

    return now.toLocaleString("en-US", options).replace(",", "");
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
    fetch(`http://24.199.120.137:5000/account/${id}`)
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
            <Grid container>
              {/* Left Column */}
              <Grid item xs={12} md={4}>
                <Stack sx={{ m: 1 }}>
                  {/* Top Holdings */}
                  <GlassCard>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography variant="h6" fontWeight="700" color="black">
                        Top Holdings
                      </Typography>

                      <Typography variant="h6" fontWeight="700" color="black">
                        $720,544.7
                      </Typography>
                    </Stack>
                    <Stack
                      minHeight={150}
                      sx={{
                        maxHeight: 150, // Adjust as needed
                        overflowY: "auto",
                        overflowX: "hidden", // Prevents horizontal scrolling
                        scrollbarWidth: "thin", // For Firefox
                        backgroundColor: "#faf3e0",
                        "&::-webkit-scrollbar": {
                          width: "3px", // Adjust scrollbar width
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#faf3e0", // Scrollbar color
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "#faf3e0",
                        },
                      }}
                    >
                      {holding.map((holding, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: 0,
                            px: 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#faf3e0",
                              mr: 2,
                              fontSize: "1.5rem",
                            }}
                            src={holding.Token_Avatar}
                          />

                          <Box flex={1}>
                            <Typography fontWeight="400" color="black">
                              {holding.Token_Amount} {"  "} {holding.Token_Name}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography fontWeight="400" color="black">
                              {holding.Usd_Value}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </GlassCard>
                </Stack>
              </Grid>

              {/* Right Column - Recent Trades */}
              <Grid item xs={12} md={8}>
                <GlassCard sx={{ m: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    space={3}
                  >
                    <Typography variant="h6" fontWeight="700" color="black">
                      Defi Trades
                    </Typography>
                    <TextField
                      size="small"
                      placeholder="Search trades..."
                      InputProps={{
                        startAdornment: (
                          <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                        ),
                      }}
                      sx={{
                        width: 200,
                        "& .MuiOutlinedInput-root": {
                          background: "#faf3e0",
                        },
                      }}
                    />
                  </Stack>
                  <Stack
                    minHeight={150}
                    sx={{
                      maxHeight: 150, // Adjust as needed
                      overflowY: "auto",
                      overflowX: "hidden", // Prevents horizontal scrolling
                      scrollbarWidth: "thin", // For Firefox
                      backgroundColor: "#faf3e0",
                      "&::-webkit-scrollbar": {
                        width: "3px", // Adjust scrollbar width
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#faf3e0", // Scrollbar color
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#faf3e0",
                      },
                    }}
                  >
                    {defi_trades.map((trade, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 2,
                          px: 1, // Adds spacing for better UI
                        }}
                      >
                        <Box flex={1}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              fontWeight="400"
                              sx={{
                                color:
                                  trade.Buy_Sell === "Buy" ? "green" : "red",
                              }}
                            >
                              {trade.Buy_Sell}
                            </Typography>
                            <Typography fontWeight="400" color="black" pl={5}>
                              {trade.Sol_Amount} SOL
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography color="black" pr={5}>
                            {trade.Token_Amount} {trade.Token}{" "}
                          </Typography>
                        </Box>
                        <Link
                          href={trade.Link}
                          sx={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          {getTimeDifference(getCurrentCETTime(), trade.Time)}
                        </Link>
                      </Box>
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
                    <Select
                      size="small"
                      value={selectedValue}
                      onChange={handleChange}
                      defaultValue="recent"
                      sx={{
                        minWidth: 120,
                        p: 1,
                        height: 10,
                      }}
                    >
                      <MenuItem value="recent">Most Recent</MenuItem>
                      <MenuItem value="profit">Profit</MenuItem>
                      <MenuItem value="loss">Loss</MenuItem>
                    </Select>
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
                      md: "repeat(4, 1fr)", // 4 columns on medium screens and above
                    },
                    border: "1px solid black",
                    width: "100%",
                    p: 1,
                    background: "#faf3e0",
                    maxHeight: "800px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgb(200, 160, 60)",
                      borderRadius: "1px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#faf3e0",
                    },
                  }}
                >
                  {Object.entries(tokenPnl).map(([token, transactions]) => (
                    <Paper
                      key={token}
                      sx={{ marginBottom: 2, background: "#faf3e0" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pl: 3,
                          pr: 3,
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
                            fontSize: { xs: "0.9rem", sm: "1rem" },
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
                          <Typography variant="h6" color="green">
                            Buy
                          </Typography>
                          <Typography variant="h6" color="black">
                            {transactions.buy.Sol.toFixed(2)}
                            {" ("}
                            {transactions.buy.Token}
                            {")"}
                          </Typography>
                        </Box>
                        <Typography
                          color="black"
                          sx={{
                            ml: "auto",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                          }}
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
                          <Typography variant="h6" color="red">
                            Sell
                          </Typography>
                          <Typography variant="h6" color="black">
                            {transactions.sell.Sol.toFixed(2)}
                            {" ("}
                            {transactions.sell.Token}
                            {")"}
                          </Typography>
                        </Box>
                        <Typography
                          color="black"
                          sx={{
                            ml: "auto",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                          }}
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
