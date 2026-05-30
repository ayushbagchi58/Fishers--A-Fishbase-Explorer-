"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Stack,
  Paper,
  Rating,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.2 },
});

const testimonials = [
  {
    id: 1,
    name: "Dr. Marina Aquila",
    role: "Marine Biologist & Researcher",
    text: "Fishers is an incredible tool for marine enthusiasts like me. I searched fish by country and learned so much about species I had never heard of. The taxonomy details and distribution maps are simply amazing. A must-use for students and researchers alike.",
    image:
      "https://images.unsplash.com/photo-1643734291066-de0aed8a7413?auto=format&fit=crop&w=300&h=300&q=80",
    avatar:
      "https://images.unsplash.com/photo-1643734291066-de0aed8a7413?auto=format&fit=crop&w=300&h=300&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "John Fisher",
    role: "Wildlife Photographer",
    text: "The Explorer helped me identify fish species I captured on camera. Having taxonomy and distribution info side-by-side makes my job much easier and more enjoyable.",
    image:
      "https://images.unsplash.com/photo-1583902340491-88025f47f15d?auto=format&fit=crop&w=500&h=500&q=80",
    avatar:
      "https://images.unsplash.com/photo-1583902340491-88025f47f15d?auto=format&fit=crop&w=500&h=500&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Waters",
    role: "Ecology Student",
    text: "As a student, I find Fishers to be the most engaging way to study marine biodiversity. The UI is intuitive, and I can explore families and species effortlessly.",
    image:
      "https://plus.unsplash.com/premium_photo-1661964243390-4a108c3d5c01?auto=format&fit=crop&w=300&h=300&q=80",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661964243390-4a108c3d5c01?auto=format&fit=crop&w=300&h=300&q=80",
    rating: 4,
  },
];

export default function FeedbackSection() {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 10, bgcolor: isDark ? "#121212" : "#f8f9ff" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" textAlign="center" mb={6}>
          <motion.div {...fadeUp(0.1)}>
            <Typography
              variant="overline"
              sx={{
                bgcolor: isDark ? "rgba(141,101,255,0.15)" : "#f0edff",
                color: "#8d65ff",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              🐟 Testimonial
            </Typography>
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <Typography
              variant="h4"
              fontWeight={700}
              color={isDark ? "white" : "text.primary"}
            >
              Real Explorers, Real Feedback
            </Typography>
          </motion.div>

          <motion.div {...fadeUp(0.3)}>
            <Typography
              color={isDark ? "grey.400" : "text.secondary"}
              maxWidth="sm"
            >
              The Fishers makes discovering fish species effortless. The data is
              reliable, the UI is smooth, and exploring marine life feels like
              an adventure.
            </Typography>
          </motion.div>
        </Stack>

       
        <Grid container spacing={4} alignItems="center" justifyContent="center">
         
          <Grid size={{xs: 12, md: 3}}>
            <motion.div
              key={testimonial.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  mx: "auto",
                  width: { xs: "250px", sm: "300px" },
                  bgcolor: isDark ? "#1e1e1e" : "white",
                }}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={300}
                  height={300}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>

          
          <Grid size={{xs: 12, md: 6}}>
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: "16px",
                  height: { xs: "auto", md: "300px" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  maxWidth: { xs: "100%", md: "600px" },
                  mx: "auto",
                  position: "relative",
                  bgcolor: isDark ? "#1e1e1e" : "white",
                  color: isDark ? "grey.200" : "text.primary",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: "40px",
                    color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  }}
                >
                  ❝❞
                </Box>

                <Stack spacing={2}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    sx={{
                      "& .MuiRating-icon": {
                        backgroundColor: "rgba(141, 101, 255, 0.08)",
                        borderRadius: "8px",
                        margin: "0 4px",
                        padding: "6px",
                      },
                      "& .MuiRating-iconFilled": {
                        color: "#8d65ff",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "#8d65ff",
                        opacity: 0.3,
                      },
                    }}
                  />

                  <Typography
                    variant="body1"
                    color={isDark ? "grey.300" : "text.secondary"}
                  >
                    “{testimonial.text}”
                  </Typography>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      color={isDark ? "white" : "text.primary"}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={isDark ? "grey.400" : "text.secondary"}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>

      
          <Grid size={{xs: 12, md: 2}}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Stack
                direction={{ xs: "row", md: "column" }}
                spacing={2}
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
              >
                {testimonials.map((t, index) => (
                  <Avatar
                    key={t.id}
                    src={t.avatar}
                    sx={{
                      width: 70,
                      height: 70,
                      border:
                        current === index
                          ? "3px solid #8d65ff"
                          : `2px solid ${isDark ? "#444" : "#ddd"}`,
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onClick={() => setCurrent(index)}
                  />
                ))}
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
