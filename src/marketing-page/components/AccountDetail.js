import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import { Avatar, Box, Typography, Paper, Grid, Tooltip } from "@mui/material";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import { PublicKey } from "@solana/web3.js";
import { Link, useParams } from "react-router-dom";
export default function AccountDetail() {
  const params = useParams();
  const id = params.id;
  const { getSolTransaction, phantonConnect } = useContext(CryptoTrans);

  const [transData, setTransData] = useState(null); // State to hold transaction data

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const publicKey = new PublicKey(id);
        if (phantonConnect && publicKey) {
          const data = await getSolTransaction(phantonConnect, publicKey);
          console.log("eee", data);
          setTransData(data); // Set the fetched data into state
          console.log(data);
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

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        // overflowX: "hidden", // Ensures no horizontal scrolling
        background: "#faf3e0",
        px: "5%",
        pt: 10,
        gap: 10,
      }}
    >
      {/* Main Grid Section */}

        <Grid container spacing={0} sx={{ width: "100%", flexWrap: "wrap" }}>
          {/* Left Column */}
          <Grid item xs={12} lg={5}>            
            <Paper
              sx={{
                border: "1px solid black",
                minWidth: "250px", // Prevent items from shrinking too much
                borderRadius: 0,
              }}
            >
              <Box
                elevation={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2 }, // Reduce gap for smaller screens
                  p: 3,
                  borderRadius: 0,
                  background: "#faf3e0",
                  borderBottom: "1px solid black",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ color: "black", fontWeight: 800 }}>
                      Top Holdings
                    </Typography>
                  </Box>
                </Box>

                <Tooltip title="View transaction">
                  <Typography sx={{ color: "black", fontWeight: 800 }}>
                    $674,274.4
                  </Typography>
                </Tooltip>
              </Box>

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
                <Box
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 }, // Reduce gap on small screens
                    p: 2,
                   
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
                          color: "black",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        sss
                      </Typography>
                    </Box>

                    {/* Right side */}
                    <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        222
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          {/* Right ==========================================================Column============================================= */}
          <Grid item xs={12} lg={6} >            
            <Paper
              sx={{
                border: "1px solid black",
                minWidth: "250px", // Prevent items from shrinking too much
                borderRadius: 0,
                marginLeft:2,
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
                  borderBottom: "1px solid black",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ color: "black", fontWeight: 800 }}>
                    Defi Trades
                    </Typography>
                  </Box>
                </Box>

                <Tooltip title="View transaction">
                  <Typography sx={{ color: "black", fontWeight: 800 }}>
                    $674,274.4
                  </Typography>
                </Tooltip>
              </Box>

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
                <Box
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 }, // Reduce gap on small screens
                    p: 2,
                   
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
                    
                    <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        sss
                      </Typography>
                    </Box>

                    {/* Right side */}
                    <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        222ddd
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

    </Container>
  );
}
