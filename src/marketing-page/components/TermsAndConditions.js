import React from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";
import { alpha, useTheme } from '@mui/material/styles';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BlockIcon from '@mui/icons-material/Block';
import CancelIcon from '@mui/icons-material/Cancel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HandshakeIcon from '@mui/icons-material/Handshake';

const TermsAndConditions = () => {
  const theme = useTheme();

  const sections = [
    {
      icon: <HandshakeIcon sx={{ fontSize: 32 }} />,
      title: "Acceptance of Terms",
      content: [
        "By accessing KolScan, you agree to these terms",
        "Terms apply to all services and features",
        "Updates to terms will be notified",
        "Continued use implies acceptance of changes"
      ]
    },
    {
      icon: <AccountCircleIcon sx={{ fontSize: 32 }} />,
      title: "User Responsibilities",
      content: [
        "Maintain account security and confidentiality",
        "Provide accurate and updated information",
        "Comply with applicable laws and regulations",
        "Report unauthorized account access"
      ]
    },
    {
      icon: <BlockIcon sx={{ fontSize: 32 }} />,
      title: "Prohibited Activities",
      content: [
        "No fraudulent or deceptive practices",
        "No unauthorized data collection",
        "No interference with platform operations",
        "No violation of intellectual property rights"
      ]
    },
    {
      icon: <CancelIcon sx={{ fontSize: 32 }} />,
      title: "Termination",
      content: [
        "Right to suspend or terminate accounts",
        "Immediate termination for terms violation",
        "Data retention after termination",
        "Appeal process for terminated accounts"
      ]
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 32 }} />,
      title: "Contact & Support",
      content: [
        "Email: support@kolscan.com",
        "24/7 customer support available",
        "Response within 24 hours",
        "Dedicated support for premium users"
      ]
    }
  ];

  return (
    <Box
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0A1929 0%, #111827 50%, #1E1E1E 100%)'
          : 'linear-gradient(135deg, #F5F9FF 0%, #F0F6FF 50%, #EBF3FF 100%)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.8)
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.15)
              : alpha('#E3ECFF', 0.8)}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GavelIcon 
              sx={{ 
                fontSize: 48,
                color: theme.palette.primary.main,
                opacity: 0.8
              }} 
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              textAlign: 'center',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #60A5FA 30%, #93C5FD 90%)'
                : 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            Terms and Conditions
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              color: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.7)
                : alpha(theme.palette.common.black, 0.7),
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Welcome to KolScan. These Terms and Conditions outline the rules and regulations
            for using our platform. Please read carefully before proceeding.
          </Typography>
        </Paper>

        {/* Terms Sections */}
        {sections.map((section, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 4,
              background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.8)
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.15)
                : alpha('#E3ECFF', 0.8)}`,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mr: 2,
                }}
              >
                {section.icon}
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.9)
                    : alpha(theme.palette.common.black, 0.9),
                }}
              >
                {section.title}
              </Typography>
            </Box>
            
            <Box sx={{ pl: 7 }}>
              {section.content.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'relative',
                    mb: 2,
                    '&:last-child': { mb: 0 },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: -20,
                      top: '50%',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: theme.palette.primary.main,
                      transform: 'translateY(-50%)',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.7)
                        : alpha(theme.palette.common.black, 0.7),
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}

        {/* Footer Section */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 4,
            color: theme.palette.mode === 'dark'
              ? alpha(theme.palette.common.white, 0.5)
              : alpha(theme.palette.common.black, 0.5),
          }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
