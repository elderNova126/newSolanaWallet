import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RealTimeTraders from "./RealTimeTraders";
import Leaderboard from "./Leaderboard";
import MemeTokens from "./MemeTokens";
import MemOrder from "./MemOrder";
import { CryptoTrans } from "../TransFunc/CryptoTrans";

export default function DashBoard() {
  
  // const { TopKol,Trending,Memes,Live,solCurrentAccount } = useContext(CryptoTrans);
  const { solCurrentAccount } = useContext(CryptoTrans);
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        // overflowX: "hidden", // Ensures no horizontal scrolling
        background: "#faf3e0",
        px: "5%",
        minHeight: "92vh",
        alignContent: "center",
      }}
    >
      {solCurrentAccount ? (
        <>
          <Box sx={{ borderLeft: "2px solid #000000 !important" }}>
            {/* top kols */}
            <Paper
              id="TopKol"
              elevation={0}
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: 0, // Setting border radius to 0
                background: "#009B77",
                borderRight: "2px solid #000000",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "VT323, monospace",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  background: "rgb(0, 0, 0) 0%",
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
              <Leaderboard />
            </Paper>

            <Paper
              id="Trending"
              elevation={0}
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: 0, // Setting border radius to 0
                background: "rgb(156, 185, 212) 0%",
                borderRight: "2px solid #000000",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "VT323, monospace",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  background: "rgb(0, 0, 0) 0%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  borderRadius: 0, // Setting border radius to 0
                  borderBottom: "2px solid #000000",
                  pl: 3,
                }}
              >
                 Meme Tokens on Solana
              </Typography>
              {/* <Leaderboard count={100}/> */}
              <MemeTokens />
            </Paper>

            <Paper
              id="Memes"
              elevation={0}
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: 0, // Setting border radius to 0
                background: "rgb(212, 194, 156) 0%",
                borderRight: "2px solid #000000",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "VT323, monospace",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  background: "rgb(0, 0, 0) 0%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  borderRadius: 0, // Setting border radius to 0
                  borderBottom: "2px solid #000000",
                  textAlign: "center",
                  pl: 3,
                }}
              >
                Trending
              </Typography>
              {/* <Leaderboard count={100}/> */}
              <MemOrder />
            </Paper>

            <Box
              id="Live"
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 0,
                borderRight: "2px solid #000000",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: 0, // Setting border radius to 0
                  background: "rgb(236, 236, 236)",
                  p: 0,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "VT323, monospace",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 700,
                    background: "rgb(0, 0, 0) 0%",
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
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: "center", padding: 4, height: "100%" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "black" }}>
            Please Connect Your Wallet to Access the Dashboard
          </Typography>
        </Box>
      )}
    </Container>
  );
}
