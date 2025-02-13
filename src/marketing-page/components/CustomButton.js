import React from "react";
import { Button, Box } from "@mui/material";

const CustomButton = ({ IconComponent , link, width="100%", buttonText = "Follow on Twitter", color = "white" }) => {
  return (
    <Box
      sx={{
        position: "relative", // Parent container for absolute positioning of children
        display: "inline-block", // Aligns elements properly
        width: "100%", // Ensures it matches the button width
      }}
    >
      {/* Div positioned below the button */}
      <Box
        sx={{
          position: "absolute", // Position the div directly below the button
          top: "3px", // Places div right below the button
          left: "-3px",
          width: "100%", // Ensure div has the same width as the button
          height: "100%", // Make div's height same as the button's height
          backgroundColor: "black", // Set div's background to black
          zIndex: 0, // Send div behind the button
        }}
      />

      {/* Button */}
      <Button
        variant="contained"
        startIcon={IconComponent ? <IconComponent /> : null}
        onClick={() => {
          if (link) {
            window.location.href = link;
          }
        }}
        sx={{
          textTransform: "none",
          fontSize: "1rem",
          // width: "100%",
          border: "1px solid rgb(0, 0, 0)  !important", // Add a solid black border
          borderRadius: 0, // No rounded corners
          transition: "all 0.5s ease-in-out",
          zIndex: 1, // Button stays above the div
          width: width,
          "&:hover": {
            transform: "translateX(-3px) translateY(3px)", // Moves slightly
            backgroundColor: color,
            border: "1px solid #FF5733",
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default CustomButton;