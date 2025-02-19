import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "./components/AppAppBar";
import Trade from "./components/Trades";
import DashBoard from "./components/DashBoard";
import AppTheme from "../shared-theme/AppTheme";
import Footer from "./components/Footer";
// import AccountDetail from "./components/AccountDetail";
import AccountDetail from "./components/AccountDashboard";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RealTimeTraders from "./components/RealTimeTraders";
import Leaderboard from "./components/Leaderboard";
import MemeTokens from "./components/MemeTokens";
import MemOrder from "./components/MemOrder";

import { CryptoTrans } from "./TransFunc/CryptoTrans";

import { Box, Typography, Container } from "@mui/material";

export default function MarketingPage(props) {
  const { solCurrentAccount } = useContext(CryptoTrans);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        <BrowserRouter>
          <AppAppBar />
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
                <Routes>
                  <Route path="/" element={<Navigate to="/about" />} />
                  <Route exact path="/about" element={<DashBoard />} />
                  <Route path="/Trending" element={<MemOrder />} />
                  <Route path="/Memes" element={<MemeTokens />} />
                  <Route path="/TopKol" element={<Leaderboard />} />
                  <Route path="/Live" element={<RealTimeTraders />} />
                  <Route path="/account/:id" element={<AccountDetail />} />
                </Routes>
              </>
            ) : (
              <Box sx={{ textAlign: "center", padding: 4, height: "100%" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "black" }}
                >
                  Please Connect Your Wallet to Access the Dashboard
                </Typography>
              </Box>
            )}
          </Container>
        </BrowserRouter>
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
