"use client";

import * as React from "react";
import { Box, Container, Typography, IconButton, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1625369708811-65ebfc5ca632?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
    name: "Goldfish",
  },
  {
    src: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    name: "Clownfish",
  },
  {
    src: "https://images.unsplash.com/photo-1657989571629-24607c622627?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
    name: "Betta Fish",
  },
  {
    src: "https://images.unsplash.com/photo-1548425923-a7d6c37d7f18?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0",
    name: "Discus",
  },
  {
    src: "https://cdn.britannica.com/02/117202-050-62267C8B/Guppy.jpg",
    name: "Guppy",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Queen_Angelfish.jpg/1200px-Queen_Angelfish.jpg",
    name: "Angelfish",
  },
];

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

export default function FishGallery() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleOpen = (index: number) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : prev
    );
  const handleNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : prev
    );

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? "grey.900" : "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 5,
            textTransform: "uppercase",
            color: isDarkMode ? "white" : "black",
          }}
        >
          Fish Gallery
        </Typography>

       
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {images.map((item, index) => (
            <motion.div key={index} {...fadeUp(index * 0.2)}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "zoom-in",
                  width: { xs: "100%", sm: "280px", md: "300px" },
                  height: { xs: "200px", sm: "220px", md: "250px" },
                  mx: "auto",
                }}
                onClick={() => handleOpen(index)}
              >
               
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />

             
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: isDarkMode
                      ? "rgba(0,0,0,0.4)"
                      : "rgba(255,255,255,0.3)",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "#8d65ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Maximize2 color="white" size={28} />
                  </Box>
                </Box>

             
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  <Typography variant="body2">Fish</Typography>
                  <Typography variant="h6">{item.name}</Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

      
        {selectedIndex !== null && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              bgcolor: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000,
              flexDirection: "column",
              px: 2,
            }}
          >
          
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "white",
              }}
            >
              <X size={30} />
            </IconButton>

          
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 10,
                color: "white",
              }}
            >
              <ChevronLeft size={40} />
            </IconButton>

          
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", maxWidth: "900px" }}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].name}
                width={900}
                height={600}
                style={{
                  objectFit: "contain",
                  maxHeight: "80vh",
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
            </motion.div>

           
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 10,
                color: "white",
              }}
            >
              <ChevronRight size={40} />
            </IconButton>

            <Typography
              variant="body2"
              sx={{ color: "white", mt: 2, fontSize: "16px" }}
            >
              {selectedIndex + 1} / {images.length}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
