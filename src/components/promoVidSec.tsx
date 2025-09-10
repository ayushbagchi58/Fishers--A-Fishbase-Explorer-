"use client";

import * as React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
});

export default function VideoShowcase() {
  const [play, setPlay] = React.useState(false);

  return (
    <Box sx={{ bgcolor: "#0b021f", py: { xs: 6, md: 10 }, color: "white" }}>
      <Container maxWidth="lg">
        
        <motion.div {...fadeUp(0.1)}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0px 10px 40px rgba(0,0,0,0.6), 0 0 20px rgba(255,255,255,0.6)",
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              aspectRatio: { xs: "16/9", md: "16/9" },
              mb: { xs: 4, md: 6 },
            }}
          >
            {play ? (
              <iframe
                src="https://www.youtube.com/embed/hS4Mso8gvNU?autoplay=1&rel=0&modestbranding=1&showinfo=0"
                title="Explore world Fishes, Fishing & Camping"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src="/thumbnail.png"
                  alt="Fishing Thumbnail"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "rgba(0,0,0,0.35)",
                    px: 2,
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    onClick={() => setPlay(true)}
                    sx={{
                      width: { xs: 60, sm: 80, md: 90 },
                      height: { xs: 60, sm: 80, md: 90 },
                      borderRadius: "50%",
                      bgcolor: "white",
                      color: "#6C63FF",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                      mb: 2,
                      "&:hover": { bgcolor: "#eee" },
                    }}
                  >
                    <Play size={35} />
                  </IconButton>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "white",
                      textShadow: "0px 2px 10px rgba(0,0,0,0.8)",
                      fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    Explore world Fishes, Fishing & Camping
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </motion.div>

       
        <motion.div {...fadeUp(0.2)}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              mb: { xs: 3, md: 4 },
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            More Than 5K+ Brands With Work Fishers
          </Typography>
        </motion.div>

     
        <motion.div {...fadeUp(0.3)}>
          <Box sx={{ mt: { xs: 2, md: 4 }, textAlign: "center" }}>
            <Image
              src="/logos.png"
              alt="Brands Banner"
              width={900}
              height={200}
              style={{
                borderRadius: "12px",
                objectFit: "contain",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
