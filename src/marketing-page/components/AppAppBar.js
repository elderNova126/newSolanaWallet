import React, { useState, useContext, useEffect } from "react";
import { styled, keyframes } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Container,
  Modal,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import { ToastContainer } from "react-toastify";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import "react-toastify/dist/ReactToastify.css";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#faf3e0 !important",
  backdropFilter: "blur(10px)",
  borderBottom: "3px solid rgba(0, 0, 0, 0.8)",
  animation: `${slideDown} 0.5s ease-out`,
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 800,
  color: "#FF3B30",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
  },
}));

export default function AppAppBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [solPrice, setSolPrice] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState(false);
  const navigate = useNavigate();

  const { SolConnectWallet, solCurrentAccount } = useContext(CryptoTrans);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
        );
        const data = await response.json();
        setSolPrice(parseFloat(data.price).toFixed(2));
      } catch (error) {
        console.error("Error fetching SOL price:", error);
      }
    };

    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StyledAppBar elevation={0}>
        <Container maxWidth="xl">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1.5}
          >
            {/* Left Section - Logo */}
            <Box display="flex" alignItems="center">
              <LogoTypography onClick={() => navigate("/")}>
                KOLs Online
              </LogoTypography>
            </Box>

            {/* Middle - Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <CustomButton link="/" buttonText="Home" />
              <CustomButton
                link="/trades"
                buttonText="Traders & Leaderboard"
                width="max-content !important"
              />
            </Box>

            {/* Right Section - Price & Wallet */}
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                component="img"
                src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                sx={{
                  width: 24,
                  height: 24,
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, color: "black" }}
              >
                ${solPrice}
              </Typography>

              <Button
                onClick={() => {
                  if (!solCurrentAccount) {
                    SolConnectWallet(1);
                  } else {
                    navigate(`/account/${solCurrentAccount}`);
                  }
                }}
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  border: "1px solid black !important",
                  borderRadius: 0,
                  transition: "all 0.5s ease-in-out",
                  background: !solCurrentAccount
                    ? bgColor
                      ? "white !important"
                      : "red !important"
                    : "white !important",
                  color: "black",
                  "&:hover": {
                    transform: "translateX(-3px) translateY(3px)",
                    border: "1px solid #FF5733",
                  },
                }}
              >
                {solCurrentAccount
                  ? solCurrentAccount.toString().substring(0, 6)
                  : "Connect Wallet"}
              </Button>

              {/* Mobile Menu Icon */}
              <IconButton
                sx={{ display: { md: "none" } }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{ py: 2, background: "#faf3e0" }}
            >
              <CustomButton link="/" buttonText="Home" />
              <CustomButton link="/trades" buttonText="Traders & Leaderboard" />
            </Box>
          )}
        </Container>
      </StyledAppBar>

      {/* Spacer */}
      <Box sx={{ height: "72px" }} />

      {/* Search Modal */}
      <Modal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pt: 10,
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <SearchBar />
        </Box>
      </Modal>

      <ToastContainer />
    </>
  );
}
