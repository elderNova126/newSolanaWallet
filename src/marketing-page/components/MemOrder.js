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
    console.log("dsdsadsadsadsadasd", trades);
    if (trades) {
       
      let new_array = {};

      Object.values(trades)
        .flat()
        .forEach((item) => {
          debugger;
          if (getTimeDiffInMinutes(item.Time) < 10) {
            
            new_array[item.Token] =
              (new_array[item.Token] || 0) + parseFloat(item.Sol_Amount);
          }
        });

      const sortedData = Object.fromEntries(
        Object.entries(new_array)
          .filter(([key, value]) => value !== null) // Remove null values
          .sort((a, b) => b[1] - a[1]) // Sort descending
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
            <Box key={key} display="flex" justifyContent="center" padding={1}>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  display: "inline-block",
                  color: "black",
                }}
              >
                {key} : {value.toFixed(2)} Sol
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default MemOrder;
