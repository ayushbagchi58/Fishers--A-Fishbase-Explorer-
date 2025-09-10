"use client";
import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CounterSection: React.FC = () => {
  const theme = useTheme();

  const staticCounts = {
    fishes: 50,
    species: 45,
    countries: 5,
    families: 30,
  };

  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f9f8fe",
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Grid container spacing={4} justifyContent="center">
        {[
          { label: "Total Fishes", value: staticCounts.fishes },
          { label: "Total Species", value: staticCounts.species },
          { label: "Countries", value: staticCounts.countries },
          { label: "Families", value: staticCounts.families },
        ].map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#8d65ff",
                }}
              >
                {item.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: theme.palette.text.secondary,
                }}
              >
                {item.label}
              </Typography>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CounterSection;