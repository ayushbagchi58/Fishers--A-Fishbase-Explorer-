"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid"; 
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIphoneIcon from "@mui/icons-material/LocalPhone";
import { motion } from "framer-motion";
import FishSection from "../../components/ourValue";
import CounterSection from "../../components/counter";
import FAQSection from "../../components/faq";
import HeroBanner from "../../components/aboutbanner";

const MotionBox = motion(Box);

const AboutSection: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <HeroBanner />
      <Box
        component="section"
        sx={{
          backgroundColor: isDark ? "#121212" : "#f9f8fe",
          py: { xs: 6, md: 12 },
          minHeight: { md: 620 },
          marginRight: "-90px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
          
            <Grid size={{xs:12, md:6}}>
              <Box sx={{ position: "relative", height: { xs: 380, md: 560 } }}>
              
                <Box
                  className="image-wrapper"
                  sx={{ position: "relative", display: "inline-block" }}
                >
                  <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    src="https://html.vikinglab.agency/fishin/assets/img/about/about-sec-image1.png"
                    alt="fishing reel"
                    style={{
                      width: "96%",
                      height: "360px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 12px 34px rgba(13,38,59,0.08)",
                      display: "block",
                      marginLeft: "auto",
                    }}
                  />
                  <Box
                    className="shine"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "-75%",
                      width: "50%",
                      height: "100%",
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
                      transform: "skewX(-20deg)",
                    }}
                  />
                </Box>

              
                <Box
                  className="image-wrapper"
                  sx={{
                    position: "absolute",
                    left: { xs: 0, md: -24 },
                    bottom: { xs: -20, md: -16 },
                  }}
                >
                  <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.12 }}
                    src="https://html.vikinglab.agency/fishin/assets/img/about/about-sec-image2.png"
                    alt="two people fishing"
                    style={{
                      width: "72%",
                      height: "320px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 12px 34px rgba(13,38,59,0.08)",
                    }}
                  />
                  <Box
                    className="shine"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "-75%",
                      width: "50%",
                      height: "100%",
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
                      transform: "skewX(-20deg)",
                    }}
                  />
                </Box>
              </Box>
            </Grid>

           
            <Grid size={{xs:12, md:6}}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    bgcolor: isDark ? "rgba(141,101,255,0.2)" : "#e7f2ff",
                    color: isDark ? "#bbdefb" : "#074a6f",
                    px: 2,
                    py: 0.6,
                    borderRadius: "999px",
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    About Fishers
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.9rem", md: "2.6rem" },
                    lineHeight: 1.05,
                    color: isDark ? "#fff" : "#07202a",
                    mb: 2,
                  }}
                >
                  Fishers
                  <br />
                  Explore the World of Fish
                </Typography>

                <Typography
                  sx={{
                    mb: 4,
                    maxWidth: 540,
                    fontSize: { xs: 14, md: 15 },
                    color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary",
                  }}
                >
                  Fishers is a user-friendly interface to explore fish species
                  from around the world. It connects to the open FishBase API to
                  fetch scientific and ecological data—search by common name,
                  explore distribution by country, and view detailed taxonomy,
                  biology, and ecology.
                </Typography>

                {/* Feature Grid */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {[
                    {
                      percent: "95%",
                      title: "Comprehensive Species Data",
                      desc: "A broad dataset covering taxonomy, biology, and distribution info.",
                    },
                    {
                      percent: "99%",
                      title: "Accurate Taxonomy & Distribution",
                      desc: "Curated from authoritative sources to ensure reliable species records.",
                    },
                  ].map((item, i) => (
                    <Grid size={{xs: 6}} key={i}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            border: `3px solid ${"#8d65ff"}`,
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                            color: "#8d65ff",
                            background: isDark ? "#1e1e1e" : "#fff",
                          }}
                        >
                          <Typography sx={{ fontSize: 18 }}>
                            {item.percent}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 15,
                              color: isDark ? "#fff" : "inherit",
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              mt: 0.5,
                              color: isDark
                                ? "rgba(255,255,255,0.7)"
                                : "text.secondary",
                            }}
                          >
                            {item.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

               
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: "#8d65ff",
                      textTransform: "none",
                      px: 3,
                      py: 1.2,
                      borderRadius: 8,
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#7545ea" },
                    }}
                    href="/"
                  >
                    Get Started
                  </Button>

                  <Box
                    sx={{
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      bgcolor: isDark ? "#1e1e1e" : "#fff",
                      borderRadius: 20,
                      px: 2,
                      py: 0.8,
                      boxShadow: "0 6px 20px rgba(13,38,59,0.04)",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: isDark ? "#2a2a2a" : "#eaf5ff",
                        width: 36,
                        height: 36,
                      }}
                    >
                      <PhoneIphoneIcon sx={{ color: "#74a8d1" }} />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: isDark
                            ? "rgba(255,255,255,0.7)"
                            : "text.secondary",
                        }}
                      >
                        Hotline 24/7
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: isDark ? "#fff" : "inherit",
                        }}
                      >
                        +1 (555) 123-4567
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <FishSection />
      <CounterSection />
      <FAQSection />
    </>
  );
};

export default AboutSection;
