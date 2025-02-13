import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ textAlign: "center", padding: 2, background: "chocolate" }}>
      <Typography
        sx={{
          fontFamily: "VT323, monospace",
          fontSize: "5rem",
          fontWeight: 800,
          color: 'cyan',
        }}
      >
        Where Fun Meets Fortune!
      </Typography>
      <Typography >
        © 2025 Kolscan – All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
