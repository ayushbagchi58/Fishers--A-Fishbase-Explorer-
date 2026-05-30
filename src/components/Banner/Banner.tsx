"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Move animation objects outside component to prevent recreation
const fadeUp = (delay = 0) => ({
  initial: { y: 24, opacity: 0 },
  whileInView: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const, delay },
  },
  viewport: { once: true, amount: 0.2 },
});

const float = (distance = 10, duration = 3) => ({
  animate: {
    y: [0, -distance, 0],
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration,
      ease: [0.4, 0, 0.6, 1] as const,
    },
  },
});

function HeroBanner() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: { main: "#6C5CE7" },
          secondary: { main: "#FF7A00" },
          background: {
            default: prefersDarkMode ? "#0f1115" : "#f9f8fe",
            paper: prefersDarkMode ? "#1c1f26" : "#ffffff",
          },
        },
        shape: { borderRadius: 18 },
        typography: {
          fontFamily: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "Noto Sans",
            "sans-serif",
          ].join(","),
          h1: { fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.05 },
        },
      }),
    [prefersDarkMode]
  );

  const theme = useTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.default",
          color: "text.primary",
          pt: { xs: 6, sm: 8, md: 12 },
          pb: { xs: 6, sm: 8, md: 12 },
          mt: { xs: "-16px", sm: "-24px", md: "-40px" },
          transition: "background-color 0.3s ease",
        }}
      >
        
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
            backgroundPosition: "0 0, 20px 20px",
            backgroundSize: "40px 40px",
            opacity: 0.04,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative" }}>
          
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ mb: { xs: 2, sm: 3 } }}
          >
            <motion.div {...fadeUp(0)}>
              <Chip
                icon={<span style={{ fontSize: 16 }}>🐟</span>}
                label="Top #1 Fishes In The World"
                color="default"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: 11, sm: 13, md: 14 },
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.12)",
                }}
              />
            </motion.div>
          </Stack>

          
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={{ xs: 4, sm: 6, md: 8 }}
          >
            
            <Box flex={1} maxWidth={{ md: 700 }}>
              <motion.div {...fadeUp(0.05)}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: 28, sm: 40, md: 56, lg: 72 },
                    mt: { xs: "-16px", sm: "-20px", md: "-50px" },
                  }}
                >
                  Explore global{" "}
                  <span style={{ color: "#8d65ff" }}>Fishes</span>
                  <br /> of the world
                </Typography>
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    color: "text.secondary",
                    maxWidth: 620,
                    lineHeight: 1.6,
                    fontSize: { xs: 13, sm: 15, md: 18 },
                  }}
                >
                  <i>
                    Whether you’re a marine expert or just beginning to explore
                    the underwater world, the realm of global fishes offers
                    fascinating diversity, unique adaptations, and unforgettable
                    encounters.
                  </i>
                </Typography>
              </motion.div>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 4, width: "100%" }}
                component={motion.div}
                {...fadeUp(0.25)}
              >
                <Button
                  component={Link}
                  href="#start"
                  size="large"
                  fullWidth={true}
                  variant="contained"
                  sx={{
                    backgroundColor: "#8d65ff",
                  }}
                >
                  Start Your Journey
                </Button>
                <Button
                  component={Link}
                  href="/about"
                  size="large"
                  fullWidth={true}
                  variant="outlined"
                  sx={{
                    color: "#8d65ff",
                    borderColor: "#8d65ff",
                  }}
                  endIcon={<span>➜</span>}
                >
                  Discover More
                </Button>
              </Stack>
            </Box>

         
            <Box
              flex={1}
              sx={{
                position: "relative",
                minHeight: { xs: 260, sm: 360, md: 480, lg: 520 },
                width: "100%",
              }}
            >
              <Box
                component={motion.div}
                {...fadeUp(0.05)}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
               
                <Box
                  component={motion.div}
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const }}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 180, sm: 220, md: 300, lg: 320 },
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 4,
                    border: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  <Image
                    alt="Angler holding a fish"
                    src="https://plus.unsplash.com/premium_photo-1747953374165-cde63ae6ff19?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Box>

               
                <Box
                  component={motion.div}
                  initial={{ x: 40, y: 40, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const, delay: 0.1 }}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 180, sm: 220, md: 300, lg: 320 },
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 4,
                    border: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  <Image
                    alt="Friends fishing in a boat"
                    src="https://images.unsplash.com/photo-1716118537867-14a6bd598877?fm=jpg&q=60&w=1200"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>

            
              <Box
                component={motion.div}
                {...float(10, 4)}
                sx={{
                  position: "absolute",
                  left: -10,
                  top: 60,
                  width: { xs: 60, sm: 80, md: 100, lg: 120 },
                  height: { xs: 60, sm: 80, md: 100, lg: 120 },
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  opacity: 0.15,
                  filter: "blur(10px)",
                }}
              />
              <Box
                component={motion.div}
                {...float(14, 3.4)}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: -20,
                  width: { xs: 40, sm: 50, md: 60, lg: 70 },
                  height: { xs: 40, sm: 50, md: 60, lg: 70 },
                  borderRadius: "50%",
                  bgcolor: "secondary.main",
                  opacity: 0.18,
                  filter: "blur(6px)",
                }}
              />

          
              <Stack
                direction="row"
                spacing={1.2}
                component={motion.div}
                {...fadeUp(0.35)}
                sx={{
                  position: "absolute",
                  left: 12,
                  bottom: { xs: -24, sm: -20, md: -10 },
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xs: 16, sm: 22, md: 28, lg: 36 },
                    height: { xs: 16, sm: 22, md: 28, lg: 36 },
                    borderRadius: "50%",
                    bgcolor: "secondary.main",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: 10, sm: 12, md: 14, lg: 18 },
                    height: { xs: 10, sm: 12, md: 14, lg: 18 },
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>

      
        <Box
          component={motion.svg}
          {...float(8, 5)}
          viewBox="0 0 600 180"
          preserveAspectRatio="none"
          sx={{
            position: "absolute",
            bottom: -8,
            left: { xs: -40, md: -10 },
            width: { xs: "140%", sm: "120%", md: "70%" },
            height: { xs: 80, sm: 120, md: 160, lg: 180 },
            opacity: 0.08,
          }}
        >
          <path
            d="M5 150 C 120 60, 220 210, 340 120 S 540 70, 595 145"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default React.memo(HeroBanner);
