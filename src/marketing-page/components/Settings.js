import React, { useState } from "react";
import {
  Switch,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Importing the dropdown icon
import { useColorScheme } from "@mui/material/styles";

const Settings = () => {
    const { mode, setMode } = useColorScheme();
  const [theme, setTheme] = useState(false);
  const [sounds, setSounds] = useState(false);
  const [platform, setPlatform] = useState("Pump/Dexscreener");

  const handleSoundsChange = (event) => {
    setSounds(event.target.checked);
  };

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
    setTheme((prev) => !prev)
  };
  return (
    <Box>
      {/* Theme */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        //   mb: 1,
        }}
      >
        <Typography>Theme</Typography>
        <FormControlLabel
          control={<Switch checked={theme} onChange={toggleTheme} />}
        />
      </Box>

      {/* Sounds */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          mb: 1,
        }}
      >
        <Typography>Sounds</Typography>
        <FormControlLabel
          control={<Switch checked={sounds} onChange={handleSoundsChange} />}
        />
      </Box>

      {/* Platform */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          mb: 1,
        }}
      >
        <Typography>Platform</Typography>
        <FormControl
          fullWidth
          sx={{
            width: "100px", // Setting width to 100px
            padding: "2px", // Setting padding to 2px
          }}
        >
          <Select
            value={platform}
            onChange={handlePlatformChange}
            IconComponent={ExpandMoreIcon} // Adding dropdown icon
            disableUnderline // Removing button effect (removes the underline)
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "30px", // Make room for the dropdown icon
              textOverflow: "ellipsis", // Add ellipsis for overflowed text
              paddingLeft: "0px",
              height: "25px",
              overflow: "hidden", // Hide overflowing text
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
          >
            <MenuItem value="Pump/Dexscreener">Pump/Dexscreener</MenuItem>
            <MenuItem value="Photon">Photon</MenuItem>
            <MenuItem value="BullX">BullX</MenuItem>
            <MenuItem value="Nova">Nova</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Custom Settings */}
      <Typography sx={{ mt: 2, mb: 1 }}>Custom Settings</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Input
            fullWidth
            placeholder="Helius Api Key"
            sx={{ marginRight: 1 }}
          />
          <IconButton
            href="https://helius.xyz"
            target="_blank"
            sx={{ height: "30px" }}
          >
            <LinkIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Input fullWidth placeholder="Rpc Url" sx={{ marginRight: 1 }} />
          <IconButton
            href="https://rpc.xyz"
            target="_blank"
            sx={{ height: "30px" }}
          >
            <LinkIcon />
          </IconButton>
        </Box>
        <FormHelperText sx={{ fontSize: "14px" }}>
          Supports comma separated lists
        </FormHelperText>
      </Box>
    </Box>
  );
};

export default Settings;
