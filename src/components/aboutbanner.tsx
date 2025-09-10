"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
      }}
    >
      
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0, 
        }}
      >
        <source src="ocean2.mp4" type="video/mp4" />  
       
      </video>

    
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

     
      <Container maxWidth="md" sx={{ zIndex: 2, position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="subtitle2"
            sx={{ letterSpacing: 2, mb: 2 ,color:"#8d65ff"}}
          >
            <b>FISHERS</b>
          </Typography>

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Discover Global Fish Species<br />with Data, Insights & Science
          </Typography>

          <Typography
            variant="h6"
            color="rgba(255,255,255,0.85)"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Explore fish biodiversity with real-time data — where every species comes alive with science, taxonomy, and ecological details curated for researchers and enthusiasts.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
