import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    if (searchTerm.trim() !== "") {
      navigate(`/account/${searchTerm}`);
    }
  };

  return (
    <Box sx={{ width: "100%", background: "#faf3e0 !important" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          p: 2,
          gap: 1,
          backgroundColor: "#faf3e0 !important",
          borderRadius: 0,
        }}
      >
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchChange();
            }
          }}
          placeholder="Enter Wallet Address"
          fullWidth
          sx={{
            borderRadius: 0,
            backgroundColor: "#faf3e0 !important",
            "& .MuiInputBase-root": {
              backgroundColor: "#faf3e0 !important",
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#faf3e0 !important",
            },
            "& .MuiInputBase-input": {
              backgroundColor: "#faf3e0 !important",
              color: "black !important", // Ensures input text is black
            },
            "& .MuiInputLabel-root": {
              color: "black !important", // Ensures label (placeholder) is black
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black !important", // Ensures border color is black
            },
          }}
        />
        <IconButton
          sx={{
            borderRadius: 0,
            width: "40px",
            height: "40px",
            background: "white  !important",
            color: "black",
            backgroundColor: "#faf3e0  !important",
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
