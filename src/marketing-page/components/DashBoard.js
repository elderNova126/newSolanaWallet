import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CustomButton from "./CustomButton";
import SearchBar from "./SearchBar";
import Transactions from "./Transactions";
import Tokenomics from "./Tokenomics";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Faqs from "./Faqs";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import Leaderboard from "./Leaderboard";
import { Link } from "@mui/material";

export default function DashBoard() {
  const { solCurrentAccount } = useContext(CryptoTrans);
  return (
    <Container
      maxWidth={false}
      disableGutters
      
      sx={{
        background: "#faf3e0",
        px: "5%",
        minHeight: "92vh",
        alignContent:"center",
      }}
    >
      {solCurrentAccount ? (
        <>
      <Box
        sx={{
          textAlign: "center",
          borderBottom: "2px solid #000000",
          paddingBottom: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "VT323, monospace",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 800,
            background: "rgb(0, 0, 0) 0%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
            borderRadius: 0, // Setting border radius to 0
          }}
        >
          Track Top Memecoin Traders
        </Typography>
        <Typography
          sx={{
            color: "black",
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
            borderRadius: 0, // Setting border radius to 0
          }}
        >
          Real-time insights into the most successful traders in the memecoin
          market.
        </Typography>
      </Box>

      {/* Main Grid Section */}
      <Box
        sx={{
          borderLeft: "2px solid #000000 !important",
          borderRight: "2px solid #000000",
        }}
      >
        <Grid container spacing={0} sx={{ width: "100%", flexWrap: "wrap" }}>
          {/* Left Column */}
          <Grid item xs={12} lg={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "3px",
                borderRight: "2px solid #000000",
              }}
            >
              {/* Search Bar */}
              <Paper
                sx={{
                  borderRadius: 0, // Setting border radius to 0
                  width: "100%",
                  background: "#faf3e0",
                }}
              >
                <SearchBar />
              </Paper>

              {/* Live Transactions */}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: 0, // Setting border radius to 0
                  background: "#faf3e0",
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
                    pl: 3,
                  }}
                >
                  Live Transactions
                </Typography>
                <Transactions />
              </Paper>
              {/* FAQs Section */}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  borderRadius: 0, // Setting border radius to 0
                  background: "rgb(241, 238, 238) 0%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "VT323, monospace",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    fontWeight: 800,
                    // background: "rgb(0, 0, 0) 0%",
                    color:'black',
                    backgroundClip: "text",
                    textAlign: "center",
                    borderRadius: 0, // Setting border radius to 0
                  }}
                >
                  Frequently Asked Questions
                </Typography>
                <Faqs />
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
                background: "#faf3e0",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gap: 2, // Adds space between the buttons
                  mt: 2, // Adds margin on top

                  pl: 5,
                  pr: 5,
                  mx: "auto", // Centers it horizontally
                  borderRadius: 0, // Setting border radius to 0
                  borderBottom: "2px solid #000000",
                  paddingBottom: 2,
                }}
              >
                <CustomButton
                  IconComponent={TwitterIcon}
                  link="https://twitter.com/kolsOnline"
                  buttonText="Follow on Twitter"
                />
                <CustomButton
                  IconComponent={TelegramIcon}
                  link="https://t.me/kolsOnline"
                  buttonText="Join Our Telegram"
                />
                <CustomButton
                  IconComponent={ShoppingCartIcon}
                  link="https://raydium.io/swap/"
                  buttonText="Buy $kolsOnline"
                />
              </Box>
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
                  Leaderboard
                </Typography>
              <Leaderboard count={9}/>
              <Link href={`/trades`}>
              <Typography
                  variant="h5"
                  sx={{
                    textAlign:"center",
                    background: "rgb(0, 0, 0) 0%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    borderRadius: 0, // Setting border radius to 0
                    p: 3,
                  }}
                >
                  Show Detail
                </Typography>
                </Link>
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
