import React from "react";
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Link,
  alpha 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from '@mui/material/styles';

const Faqs = () => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "How do I contact customer support if I have a question or issue?",
      answer: "You can reach our customer support team by emailing support@email.com or calling our toll-free number. We're here to assist you promptly.",
      link: "support@email.com"
    },
    {
      question: "Can I return the product if it doesn't meet my expectations?",
      answer: "Absolutely! We offer a hassle-free return policy. If you're not completely satisfied, you can return the product within [number of days] days for a full refund or exchange."
    },
    {
      question: "What makes your product stand out from others in the market?",
      answer: "Our product distinguishes itself through its adaptability, durability, and innovative features. We prioritize user satisfaction and continually strive to exceed expectations in every aspect."
    },
    {
      question: "Is there a warranty on the product, and what does it cover?",
      answer: "Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance."
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
          elevation={0}
          sx={{
            width: '100%',
            background: 'transparent',
            '&:not(:last-child)': {
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  transition: 'transform 0.3s ease',
                  transform: expanded === `panel${index + 1}` ? 'rotate(180deg)' : 'rotate(0deg)',
                }} 
              />
            }
            aria-controls={`panel${index + 1}d-content`}
            id={`panel${index + 1}d-header`}
            sx={{
              px: { xs: 1, sm: 2 },
              py: 2,
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.05),
              },
              '&.Mui-expanded': {
                background: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Typography 
              component="h3" 
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem' },
                fontWeight: 600,
                color: expanded === `panel${index + 1}` 
                  ? theme.palette.primary.main 
                  : theme.palette.text.primary,
                transition: 'color 0.3s ease',
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              px: { xs: 1, sm: 2 },
              py: 2,
              background: alpha(theme.palette.background.paper, 0.4),
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
                maxWidth: { sm: "100%", md: "90%" },
                mb: faq.link ? 1 : 0,
              }}
            >
              {faq.answer}
            </Typography>
            {faq.link && (
              <Link
                href={`mailto:${faq.link}`}
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-block',
                  mt: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {faq.link}
              </Link>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faqs;
