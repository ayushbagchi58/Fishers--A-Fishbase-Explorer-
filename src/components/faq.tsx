"use client";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";


const CustomAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: "16px !important",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff", 
  "&:hover": {
    boxShadow: theme.palette.mode === "dark"
      ? "0 6px 16px rgba(255, 255, 255, 0.1)"
      : "0 6px 16px rgba(0, 0, 0, 0.15)"
  },
  "&:before": {
    display: "none" 
  }
}));


const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f9f9f9" 
}));

const faqs = [
  {
    question: "How do I search for fish species?",
    answer: "Use the search bar on the home page to find fish species by their common name. Results will display scientific names, taxonomy, and distribution details."
  },
  {
    question: "How can I explore fish species by country?",
    answer: "Go to the 'Species by Country' page, select a country, and browse the fish species found in that region."
  },
  {
    question: "Where can I view detailed information about a fish?",
    answer: "Click on any fish name in the search results or country list to access its detailed page with taxonomy, biology, and distribution data."
  },
  {
    question: "What if no data is found for my search?",
    answer: "An error message will appear with suggestions, such as checking spelling or trying a different common name."
  }
];

export default function FAQSection() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color={theme.palette.text.secondary} 
          sx={{ mb: 4 }}
        >
          Answers to common questions about exploring fish species using FishBase Explorer.
        </Typography>
      </motion.div>

      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <CustomAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <CustomAccordionDetails>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {faq.answer}
              </Typography>
            </CustomAccordionDetails>
          </CustomAccordion>
        </motion.div>
      ))}
    </Container>
  );
}
