import React, {useContext} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RealTimeTraders from "./RealTimeTraders";
import Leaderboard from "./Leaderboard";
import MemeTokens from "./MemeTokens";
import { CryptoTrans } from "../TransFunc/CryptoTrans";

export default function DashBoard() {
  const { solCurrentAccount } = useContext(CryptoTrans);
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        // overflowX: "hidden", // Ensures no horizontal scrolling
        background: "#faf3e0",
        px: '5%',
        minHeight: "92vh",
        alignContent:"center",
      }}
    >      
    {solCurrentAccount ? (
        <> 
      {/* Main Grid Section */}
      <Box sx={{borderLeft: "2px solid #000000 !important",
        borderRight: "2px solid #000000",}}>
        <Grid container spacing={0} sx={{ width: "100%", flexWrap: "wrap" }}>
          {/* Left Column */}
          <Grid item xs={12} lg={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 0,
                borderRight: "2px solid #000000",
              }}
            >
              

              {/* Live Transactions */}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: 0, // Setting border radius to 0
                  background: "rgb(236, 236, 236)",
                  p:0,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "VT323, monospace",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 700,
                    background: "rgb(102, 85, 179) 0%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    borderRadius: 0, // Setting border radius to 0
                    borderBottom: "2px solid #000000",
                    pl: 3,
                  }}
                >
                  Realtime Trades
                </Typography>
                <RealTimeTraders />
              </Paper>
              
            </Box>
          </Grid>

          {/* Right Column - Tokenomics */}
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: 0, // Setting border radius to 0
                background: "#009B77",
              }}
            >              
            <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "VT323, monospace",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 700,
                    background: "rgb(103, 255, 141) 0%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    borderRadius: 0, // Setting border radius to 0
                    borderBottom: "2px solid #000000",
                    pl: 3,
                  }}
                >
                  Realized PnL Leaderboard
                </Typography>
              {/* <Leaderboard count={100}/> */}
              <MemeTokens />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      </>
      ) : (
        <Box sx={{ textAlign: "center", padding: 4, height:"100%" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color:'black' }}>
            Please Connect Your Wallet to Access the Dashboard
          </Typography>          
        </Box>
      )}
    </Container>
  );
}
