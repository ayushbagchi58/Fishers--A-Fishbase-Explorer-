"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Facebook,
  LinkedIn,
  Instagram,
  Twitter,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { FaFish } from "react-icons/fa";

const fishAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const shakyHover = {
  transition: "all 0.3s ease",
  "&:hover": {
    animation: "shake 0.3s",
    animationIterationCount: "1",
    color: "#8d65ff",
  },
  "@keyframes shake": {
    "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
    "20%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
    "40%": { transform: "translate(-3px, 0px) rotate(1deg)" },
    "60%": { transform: "translate(3px, 2px) rotate(0deg)" },
    "80%": { transform: "translate(1px, -1px) rotate(1deg)" },
    "100%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
  },
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleSubmit = () => {
    if (email.trim() === "") {
      toast.error("Please enter a valid email");
    } else {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  const hoverIconStyle = {
    backgroundColor: isDark ? "#2a2a2a" : "#f3f0ff",
    transition: "all 0.3s ease",
    color: isDark ? "#fff" : "inherit",
    "&:hover": {
      backgroundColor: "#8d65ff",
      color: "white",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#121212" : "#f9f8ff",
        py: 6,
        position: "relative",
        overflow: "hidden",
        color: isDark ? "#ddd" : "inherit",
      }}
    >
      <motion.img
        src="https://html.vikinglab.agency/fishin/assets/img/shapes/cta3-shape1.png"
        alt="fish"
        width={300}
        style={{ position: "absolute", top: "20px", left: "40px" }}
        {...fishAnimation}
        className="fish-left"
      />
      <motion.img
        src="https://html.vikinglab.agency/fishin/assets/img/shapes/cta3-shape2.png"
        alt="fish"
        width={300}
        style={{ position: "absolute", top: "20px", right: "40px" }}
        {...fishAnimation}
        className="fish-right"
      />

      <Container maxWidth="lg">
        <Box textAlign="center" mb={6} px={{ xs: 2, sm: 0 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign Up and Explore the Depths!
          </Typography>
          <Typography
            variant="body1"
            color={isDark ? "grey.400" : "text.secondary"}
            mb={3}
          >
            Whether you&apos;re a researcher or a curious explorer, Fishers helps you <br />discover global fish species with detailed taxonomy, biology, and distribution data.
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            flexWrap="wrap"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
          >
            <TextField
              variant="outlined"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "280px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: isDark ? "#1e1e1e" : "#f3f0ff",
                  color: isDark ? "#fff" : "inherit",
                  "& fieldset": { border: "none" },
                  "& input": {
                    padding: "10px 18px",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: "50px",
                px: 4,
                fontWeight: "bold",
                background: "#8d65ff",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  background: "#8d65ff",
                },
              }}
            >
              Submit Now <ArrowForward sx={{ fontSize: 18 }} />
            </Button>
          </Box>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{
            px: { xs: 2, sm: 4 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              mb={1}
            >
              <FaFish size={28} style={{ marginRight: "8px", color: "#8d65ff" }} />
              <Typography variant="h6" fontWeight="bold">
                Fishers
              </Typography>
            </Box>
            <Typography variant="body2" color={isDark ? "grey.400" : "text.secondary"} mb={2}>
              Have questions or need assistance? Get in touch with our team — <br />
              we’re here to help you explore the underwater world.
            </Typography>
            <Box display="flex" gap={1} justifyContent={{ xs: "center", md: "flex-start" }}>
              {[
                <Facebook key="facebook" />,
                <LinkedIn key="linkedin" />,
                <Instagram key="instagram" />,
                <Twitter key="twitter" />,
              ].map((icon, i) => (
                <IconButton key={i} sx={hoverIconStyle}>
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Our Services
            </Typography>
            {[
              "Search Fish by Name",
              "Explore by Country",
              "Browse by Family",
              "Taxonomy & Biology Data",
              "Ecology & Distribution",
            ].map((text, i) => (
              <Typography
                key={i}
                variant="body2"
                color={isDark ? "grey.400" : "text.secondary"}
                sx={shakyHover}
                mb={1}
              >
                {text}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            {[
              { label: "Home", href: "/" },
              { label: "About us", href: "/about" },
              { label: "Search", href: "/search" },
              { label: "By Country", href: "/country" },
              { label: "By Family", href: "/family" },
              { label: "Blog", href: "/blog" },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color={isDark ? "grey.400" : "text.secondary"}
                  sx={shakyHover}
                  mb={1}
                  component="span"
                  style={{ display: "block" }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }} mb={2}>
              <IconButton sx={hoverIconStyle}>
                <Phone />
              </IconButton>
              <Typography variant="body2" ml={1}>
                +919123990356
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }} mb={2}>
              <IconButton sx={hoverIconStyle}>
                <Email />
              </IconButton>
              <Typography variant="body2" ml={1}>
                infofishers@gmail.com
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }}>
              <IconButton sx={hoverIconStyle}>
                <LocationOn />
              </IconButton>
              <Typography variant="body2" ml={1}>
                55 Street, e-block, 3rd Floor <br />
                Kolkata, India
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={6}>
          <Box
            component="hr"
            sx={{
              border: "none",
              borderTop: isDark ? "1px solid #333" : "1px solid #e0c3fc",
              mb: 3,
            }}
          />
          <Typography textAlign="center" variant="body2" color={isDark ? "grey.500" : "text.secondary"}>© Copyright 2025 · Fishers. All Rights Reserved</Typography>
        </Box>
      </Container>

      <style jsx>{`
        @media (max-width: 600px) {
          .fish-left,
          .fish-right {
            display: none;
          }
        }
      `}</style>
    </Box>
  );
};

export default Footer;