import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import { Box, Link, Typography, Grid, Paper, CircularProgress } from "@mui/material";

const baseUrl = process.env.REACT_APP_BASE_URL;

const MemOrder = () => {
  const [memes, setMemes] = useState();
  const { trades } = useContext(CryptoTrans);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTimeDiffInMinutes = (time) => {
    const currentTime = new Date();
    const transactionTime = new Date(time);
    // Convert both times to the same time zone (local time)
    const timeDiff =
      (currentTime.getTime() - transactionTime.getTime()) / 1000 / 60; // in minutes
    return timeDiff;
  };
  // Fetch meme tokens from an API
  useEffect(() => {
    // debugger;
    setLoading(true);
    fetch(`${baseUrl}/trades`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((propertyData) => {
        const sortedTrades = Object.entries(propertyData["trades"])
          .sort((a, b) => new Date(b[1][0].Time) - new Date(a[1][0].Time))
          .reduce((acc, [wallet, transactions]) => {
            acc[wallet] = transactions;
            return acc;
          }, {});

        let new_array = {};

        Object.values(sortedTrades)
          .flat()
          .forEach((item) => {
            if (getTimeDiffInMinutes(item.Time) < 10) {
              if (!new_array[item.Token]) {
                new_array[item.Token] = {
                  totalAmount: 0,
                  wallet: item.Wallet, // Assuming 'item.Wallet' is the wallet you want to associate
                };
              }

              new_array[item.Token].totalAmount += parseFloat(item.Sol_Amount);
            }
          });

        const sortedData = Object.fromEntries(
          Object.entries(new_array)
            .filter(([key, value]) => value.totalAmount !== null) // Remove null values
            .sort((a, b) => b[1].totalAmount - a[1].totalAmount) // Sort descending by totalAmount
        );
        setMemes(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        // setLoading(false);
      });
    // if (window.location.hash === "#Memes") {
    //   document.getElementById("Memes").scrollIntoView({ behavior: "smooth" });
    // }
  }, []);
  return (
    <>
      <Paper
        id="Memes"
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 0, // Setting border radius to 0
          background: "rgb(212, 194, 156) 0%",
          borderRight: "2px solid #000000",
          borderLeft: "2px solid #000000",
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
            borderBottom: "1px solid #000000",
            textAlign: "center",
            pl: 3,
          }}
        >
          Trending
        </Typography>
        {/* <Leaderboard count={100}/> */}
        <Box sx={{height: window.screen.height - 350,}}>
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
              {memes && (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  padding={3}
                >
                  {Object.entries(memes).map(([key, value], index) => (
                    <Box
                      key={key}
                      display="flex"
                      justifyContent="center"
                      padding={0.5}
                    >
                      <Link
                        href={`https://photon-sol.tinyastro.io/en/lp/${value.Wallet}`} // Fixed Twitter link
                        target="_blank"
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            display: "inline-block",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {key} : {value.totalAmount.toFixed(2)} Sol
                        </Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default MemOrder;
