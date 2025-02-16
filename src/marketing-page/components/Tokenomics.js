import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";
import CheckIcon from "@mui/icons-material/Check";

const Tokenomics = () => {
  const theme = useTheme();

  const tiers = [
    {
      title: "Public Access",
      icon: <CheckCircleIcon sx={{ color: "#4CAF50" }} />,
      features: ["Realtime Trades", "Wallet Holdings", "Token PnL"],
      color: "#4CAF50",
    },
    {
      title: "Tier 1",
      icon: <StarIcon sx={{ color: "#2196F3" }} />,
      features: [
        "Realtime Token Tracker",
        "Advanced Analytics",
        "Priority Support",
      ],
      requirement: "100k+ $KOLSCAN",
      color: "#2196F3",
    },
    {
      title: "Tier 2",
      icon: <DiamondIcon sx={{ color: "#9c27b0" }} />,
      features: ["AI Trading Signals", "Custom Alerts", "VIP Community"],
      requirement: "420k+ $KOLSCAN",
      color: "#9c27b0",
    },
  ];

  return (
    <Box>
      {tiers.map((tier, index) => (
        <Grid item xs={12} key={index}>
          <Card elevation={0} sx={{ background: "rgb(224, 250, 242) !important", borderRadius:0,p:1}}>
            <Box sx={{ display: "flex", alignItems: "center", pl: "20%" }}>
              <ListItemIcon sx={{ minWidth: 30 }}>{tier.icon}</ListItemIcon>
              <Typography
                variant="h6"
                fontWeight="500"
                color={tier.color}
                sx={{ fontSize: "1.25rem" }}
              >
                {tier.title}
              </Typography>
            </Box>

            <List
              dense
              sx={{ py: 0, display: "flex", flexDirection: "column" }}
            >
              {tier.features.map((feature, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 0.5,
                    pl: "20%",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckIcon sx={{ color: "red" }}/>
                  </ListItemIcon>
                  <ListItemText
                    primary={feature}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: 'black',
                        fontSize: "1rem",
                      },
                    }}
                  />
                </Box>
              ))}
            </List>

            {tier.requirement && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 1,
                  color: tier.color,
                  fontWeight: 600,
                  pl: "20%",
                }}
              >
                Required: {tier.requirement}
              </Typography>
            )}
          </Card>
        </Grid>
      ))}
    </Box>
  );
};

export default Tokenomics;
