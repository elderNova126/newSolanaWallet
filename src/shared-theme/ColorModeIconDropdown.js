import * as React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Settings from "../marketing-page/components/Settings";

export default function SettingsDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <IconButton
        data-screenshot="settings-menu"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...props}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="settings-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            elevation: 0,
            sx: {
              my: "4px",
              width: 220, // Increased menu width
              padding: "8px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Settings />
        {/* <MenuItem>
          Theme
          <Switch checked={mode === "dark"} onChange={toggleTheme} />
        </MenuItem>
        <MenuItem>
          Sounds
          <Switch checked={isSoundOn} onChange={toggleSound} />
        </MenuItem>
        <MenuItem>
          Platform
          <Box >
            <FormControl fullWidth>
              <Select value={platform} onChange={handlePlatformChange}>
                <MenuItemSelect value="Pump">Pump/Dexscreener</MenuItemSelect>
                <MenuItemSelect value="Photon">Photon</MenuItemSelect>
                <MenuItemSelect value="BullX">BullX</MenuItemSelect>
                <MenuItemSelect value="Nova">Nova</MenuItemSelect>
              </Select>
            </FormControl>
          </Box>
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
