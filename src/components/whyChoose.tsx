"use client";

import * as React from "react";
import { Box, Container, Grid, Typography, Stack, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import CategoryIcon from "@mui/icons-material/Category";
import ScienceIcon from "@mui/icons-material/Science";
import Image from "next/image";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const features = [
  {
    icon: <SearchIcon fontSize="large" sx={{ color: "white" }} />,
    title: "Search Fish",
    desc: "Find fish by common name with scientific details instantly.",
  },
  {
    icon: <PublicIcon fontSize="large" sx={{ color: "white" }} />,
    title: "Species by Country",
    desc: "Explore fish species found across different countries.",
  },
  {
    icon: <CategoryIcon fontSize="large" sx={{ color: "white" }} />,
    title: "Browse by Family",
    desc: "Dive into taxonomy and explore species by family groups.",
  },
  {
    icon: <ScienceIcon fontSize="large" sx={{ color: "white" }} />,
    title: "Detailed Data",
    desc: "Access biology, ecology, and distribution for every species.",
  },
];

export default function WhyChooseUs() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: isDarkMode ? "grey.900" : "white",
        mt: "-40px",
        pb: -1,
        pt: -1,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" wrap="nowrap">
          
          <Grid
            sx={{
              flex: { xs: "0 0 40%", md: "0 0 40%" },
              minWidth: { xs: 120, md: "auto" },
            }}
          >
            <motion.div {...fadeUp(0.2)}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 150, sm: 250, md: 500 },
                }}
              >
                <Image
                  src="/fish1.jpg"
                  alt="Fish Illustration"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </motion.div>
          </Grid>

       
          <Grid sx={{ flex: { xs: "0 0 60%", md: "0 0 60%" } }}>
            <motion.div {...fadeUp(0.3)}>
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  mb: 4,
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  color: isDarkMode ? "white" : "black",
                }}
              >
                Why Choose us?
              </Typography>
            </motion.div>

            <Grid container spacing={3}>
              {features.map((feature, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <motion.div {...fadeUp(0.4 + i * 0.2)}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Paper
                        elevation={3}
                        sx={{
                          bgcolor: "#8d65ff",
                          borderRadius: "50%",
                          width: { xs: 40, sm: 56 },
                          height: { xs: 40, sm: 56 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </Paper>
                      <Box>
                        <Typography
                          fontWeight="bold"
                          fontSize={{ xs: 13, sm: 16 }}
                          sx={{ color: isDarkMode ? "white" : "black" }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          fontSize={{ xs: 12, sm: 14 }}
                          sx={{ color: isDarkMode ? "grey.400" : "text.secondary" }}
                        >
                          {feature.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
