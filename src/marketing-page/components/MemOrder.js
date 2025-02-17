import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CryptoTrans } from "../TransFunc/CryptoTrans";
import { Box, Link, Typography, Grid } from "@mui/material";

const baseUrl = process.env.REACT_APP_BASE_URL;

const MemOrder = () => {
  const [memes, setMemes] = useState();
  const { trades } = useContext(CryptoTrans);

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
    if (trades) {
      let new_array = {};

      Object.values(trades)
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
    }
    if (window.location.hash === "#Memes") {
      document.getElementById("Memes").scrollIntoView({ behavior: "smooth" });
    }
  }, [trades]);
  return (
    <>
      {memes && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={3}
        >
          {Object.entries(memes).map(([key, value], index) => (
            <Box key={key} display="flex" justifyContent="center" padding={0.5}>
              <Link
                href={`https://photon-sol.tinyastro.io/en/lp/${value.Wallet}`} // Fixed Twitter link
                target="_blank"
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    display: "inline-block",
                    color: "black",
                    fontWeight:"bold",
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
  );
};

export default MemOrder;
