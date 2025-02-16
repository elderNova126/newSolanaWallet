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
  background: "#faf3e0 !important",
  backdropFilter: "blur(10px)",
  borderBottom: "2px solid rgba(0, 0, 0, 0.8)",
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



  return (
    <>
      <StyledAppBar elevation={0}>
        <Container maxWidth="xl" sx={{ background: "#faf3e0 !important", }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1.5}
            sx={{ background: "#faf3e0 !important", }}
          >
            {/* Left Section - Logo */}
            <Box display="flex" alignItems="center">
              <LogoTypography onClick={() => navigate("/")}>
                KOLs Online
              </LogoTypography>
            </Box>

            {/* Middle - Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <CustomButton link="/" buttonText="Top Kols" />
              <CustomButton link="/" buttonText="Trending" />
              <CustomButton link="/" buttonText="Memes" />
              <CustomButton link="/" buttonText="Live" />
              {/* <CustomButton
                link="/trades"
                buttonText="Traders & Leaderboard"
                width="max-content !important"
              /> */}

            </Box>

            {/* Right Section - Price & Wallet */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography sx={{ color: 'black' }}>Last updated: X Seconds ago</Typography>
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
              <CustomButton link="/" buttonText="Top Kols" />
              <CustomButton link="/" buttonText="Trending" />
              <CustomButton link="/" buttonText="Memes" />
              <CustomButton link="/" buttonText="Live" />
              {/* <CustomButton link="/trades" buttonText="Traders & Leaderboard" /> */}
            </Box>
          )}
        </Container>
      </StyledAppBar>

      {/* Spacer */}
      <Box sx={{ height: "68px" }} />

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
