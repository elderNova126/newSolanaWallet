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
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import { PublicKey } from "@solana/web3.js";
import { Link, useParams } from "react-router-dom";
const AccountDashboard = () => {

  const params = useParams();
  const id = params.id;
  const { getSolTransaction, phantonConnect } = useContext(CryptoTrans);

  const [transData, setTransData] = useState(null); // State to hold transaction data

  function parseTransactionDetails(transactions) {
    return transactions.map(tx => {
        const sender = tx.transaction.message.accountKeys[0]; // Sender is usually the first account key
        const receiver = tx.transaction.message.accountKeys[1]; // Receiver is the second account key
        const fee = tx.meta.fee; // Transaction fee
        const blockTime = tx.blockTime; // Block time (UNIX timestamp)
        const date = new Date(blockTime * 1000).toISOString(); // Convert block time to readable date
        const preBalances = tx.meta.preBalances; // Balances before the transaction
        const postBalances = tx.meta.postBalances; // Balances after the transaction
        const amount = preBalances[0] - postBalances[0]; // Amount transferred (difference in sender's balance)
        const mintAddress = tx.transaction.message.accountKeys[2]; // Mint address (if applicable)

        return {
            sender,
            receiver,
            mintAddress,
            amount,
            fee,
            date
        };
    });
}

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const publicKey = new PublicKey(id);
        if (phantonConnect && publicKey) {
          const data = await getSolTransaction(phantonConnect, publicKey);

          
          console.log("eee", data);
          setTransData(parseTransactionDetails(data)); // Set the fetched data into state
          console.log(parseTransactionDetails(data));
        } else {
          console.error("Invalid connection or public key");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    if (phantonConnect && id) {
      fetchTransactionData(); // Fetch transaction data when connection and ID are available
    }
  }, [phantonConnect, id]); // Dependency array: re-run effect when `phantonConnect` or `id` change

  const mockTopHoldings = [
    {
      token: "BONK",
      amount: "2,450,000",
      value: "$1,225",
      change: "+12.5%",
      icon: "🐕",
    },
    {
      token: "WIF",
      amount: "15,000",
      value: "$750",
      change: "-3.2%",
      icon: "🐶",
    },
    {
      token: "MYRO",
      amount: "85,000",
      value: "$425",
      change: "+8.7%",
      icon: "🚀",
    },
  ];

  const mockDefiTrades = [
    {
      time: "2 mins ago",
      token: "BONK/SOL",
      type: "Buy",
      amount: "+450K BONK",
      price: "0.000001",
      icon: "🐕",
    },
    {
      time: "5 mins ago",
      token: "WIF/SOL",
      type: "Sell",
      amount: "-1.2K WIF",
      price: "0.05",
      icon: "🐶",
    },
    {
      time: "15 mins ago",
      token: "MYRO/SOL",
      type: "Buy",
      amount: "+25K MYRO",
      price: "0.005",
      icon: "🚀",
    },
  ];

  const GlassCard = ({ children, ...props }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        background:"#faf3e0",
        backdropFilter: "blur(12px)",
        border: '1px solid black',
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
      <Container maxWidth="xl">
        {/* Main Content Grid */}
        <Grid container>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Stack>
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
                <Stack>
                  {mockTopHoldings.map((holding, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#faf3e0",
                          mr: 2,
                          fontSize: "1.5rem",
                        }}
                      >
                        {holding.icon}
                      </Box>
                      <Box flex={1}>
                        <Typography fontWeight="400" color="black">
                          {holding.token}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography fontWeight="400" color="black">
                          {holding.value}
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
            <GlassCard sx={{ height: "100%" }}>
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
              <Stack>
                {mockDefiTrades.map((trade, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        fontSize: "1.5rem",
                      }}
                    >
                      {trade.icon}
                    </Box>
                    <Box flex={1}>
                      <Typography fontWeight="400" color="black">{trade.token}</Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }} color="black">
                      <Typography color="black">
                        @ {trade.price} SOL
                      </Typography>
                    </Box>
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
              mb={3}
            >
              <Typography variant="h6" fontWeight="700" color="black">
                Token PnL
              </Typography>
              <Select
                size="small"
                defaultValue="recent"
                sx={{
                  minWidth: 120,
                  background: "#faf3e0",
                }}
              >
                <MenuItem value="recent">Most Recent</MenuItem>
                <MenuItem value="profit">Highest Profit</MenuItem>
                <MenuItem value="loss">Highest Loss</MenuItem>
              </Select>
            </Stack>
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  background:
                    "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800,
                }}
              >
                +125.45 SOL
              </Typography>
              <Typography
                variant="h6"
                color="success.main"
                fontWeight="600"
                sx={{ mt: 1 }}
              >
                $8,781.50
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountDashboard;
