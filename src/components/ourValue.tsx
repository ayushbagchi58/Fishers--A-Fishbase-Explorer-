"use client";

import React from "react";
import Image from "next/image";
import { Box, Container, Grid, Typography, Button, Tabs, Tab } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function FishSection(): JSX.Element {
  const [tab, setTab] = React.useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0f172a" : "white",
        py: { xs: 6, md: 12 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
         
          <Grid item size={{xs:12, md:6}}>
            <MotionBox
              initial={{ opacity: 0, x: -40, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 12px 30px rgba(255,255,255,0.1)"
                    : "0 12px 30px rgba(13,18,25,0.08)",
              }}
            >
              <Box
                className="image-wrapper"
                sx={{
                  position: "relative",
                  width: "650px",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1593974595229-2fe505c273b5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Fishing"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
               
                <Box
                  className="shine"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "-75%",
                    height: "100%",
                    width: "50%",
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)",
                    transform: "skewX(-25deg)",
                  }}
                />
              </Box>
            </MotionBox>
          </Grid>

       
          <Grid item size={{xs:12, md:6}}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(141,101,255,0.12)",
                    color: "#8d65ff",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 13,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Our Value
                </Box>
              </Box>

              <Typography
                component="h2"
                variant="h3"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.5px",
                  mb: 2,
                  color: (theme) => theme.palette.mode === "dark" ? "white" : "#111827",
                  fontSize: { xs: 28, md: 40 },
                }}
              >
                Fishers
              </Typography>

              <Typography
                sx={{
                  color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155",
                  mb: 3,
                }}
              >
                A application that allows users to search, view, and explore detailed information about global fish species using the FishBase API. FishBase Explorer is a user-friendly interface to explore fish species from around the world. It connects to the open FishBase API to fetch scientific and ecological data, allowing users to search by common name, explore species distribution by country, and view detailed taxonomy and biological data.
              </Typography>

             
              <Box
                sx={{
                  height: 1,
                  width: "100%",
                  bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(13,18,25,0.06)",
                  mb: 2,
                }}
              />

              
              <Tabs
                value={tab}
                onChange={handleTabChange}
                sx={{
                  mb: 2,
                  "& .MuiTabs-flexContainer": { gap: 3 },
                  "& .MuiTab-root": {
                    minWidth: 0,
                    p: 0,
                    textTransform: "none",
                    fontWeight: 700,
                    color: (theme) => theme.palette.mode === "dark" ? "#e2e8f0" : "#0f172a",
                  },
                }}
              >
                <Tab label="Our Vision" />
                <Tab label="Our Mission" />
                <Tab label="Why Choose Us" />
              </Tabs>

           
              <Box sx={{ mt: 1 }}>
                {tab === 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontWeight: 700, mb: 1, color: (theme) => theme.palette.mode === "dark" ? "white" : "inherit" }}>Vision:</Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      🧭 To become the go-to, authoritative hub for global fish biodiversity information — trusted by researchers, educators, and hobbyists alike.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      🔗 To bridge the gap between scientific data and the public by connecting researchers, citizen scientists, and conservationists through accessible tools.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155" }}>
                      📱 To leverage modern web technology and interactive visualizations so anyone can explore, learn, and contribute to marine conservation.
                    </Typography>
                  </Box>
                )}

                {tab === 1 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontWeight: 700, mb: 1, color: (theme) => theme.palette.mode === "dark" ? "white" : "inherit" }}>Mission:</Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      🌊 To empower researchers, students, and nature lovers by giving them quick access to reliable fish species data from around the globe.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      📊 To promote awareness about marine biodiversity through user-friendly visualization and interactive tools.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155" }}>
                      🌍 To support conservation initiatives by making scientific information open and accessible to everyone.
                    </Typography>
                  </Box>
                )}

                {tab === 2 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontWeight: 700, mb: 1, color: (theme) => theme.palette.mode === "dark" ? "white" : "inherit" }}>Why Choose Us:</Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      ✅ Direct integration with the trusted <b>FishBase API</b> ensures accurate and up-to-date species information.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      🎯 Clean, modern, and responsive design that makes exploring scientific data simple for everyone.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155", mb: 1 }}>
                      🔍 Advanced search and filter options — find fish by name, family, country, or distribution.
                    </Typography>
                    <Typography sx={{ color: (theme) => theme.palette.mode === "dark" ? "#cbd5e1" : "#334155" }}>
                      🌟 A platform built not just for research, but also for learning, conservation, and curiosity-driven discovery.
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#8d65ff",
                    borderRadius: 6,
                    px: 3.5,
                    py: 1.1,
                    textTransform: "none",
                    boxShadow: "0 8px 20px rgba(141,101,255,0.24)",
                    fontWeight: 700,
                    fontSize: 15,
                    "&:hover": { bgcolor: "#734be6" },
                  }}
                  href="/"
                >
                  Get Started
                </Button>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      <style jsx>{`
        .image-wrapper:hover .shine {
          animation: shineEffect 1s forwards;
        }

        @keyframes shineEffect {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
      `}</style>
    </Box>
  );
}
