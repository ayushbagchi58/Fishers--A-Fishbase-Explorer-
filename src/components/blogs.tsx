"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const blogPosts = [
  {
    id: 1,
    date: "5/9/2025",
    author: "Ritin Mandal",
    title: "Discovering the Depths: Your Guide to Exploring Global Fish Species",
    desc: "Dive into Fishers to uncover scientific names, habitats, and unique traits of fish from across the world.",
    img: "https://plus.unsplash.com/premium_photo-1667239351402-de393eee0f67?q=80&w=468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    date: "13/3/2025",
    author: "Ayush Bagchi",
    title: "Taxonomy Made Simple: Understanding Fish Families & Species",
    desc: "Learn how families like Cichlidae and Cyprinidae are structured and how Fishers helps simplify taxonomy.please explore it clearly.",
    img: "https://images.unsplash.com/photo-1677128351038-317386ffbc6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    date: "8/6/2025",
    author: "Subhajit Das",
    title: "From Rivers to Oceans: Mapping Fish Distribution by Country",
    desc: "Use Fishers to track species distribution, discover local diversity, and explore habitats worldwide.please explore everyone its throughly.",
    img: "https://plus.unsplash.com/premium_photo-1747953372900-b9b7246787b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function BlogSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
       
        <motion.div {...fadeUp(0)}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            flexWrap="wrap"
            spacing={2}
          >
           
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  display: "inline-flex",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(123, 47, 247, 0.15)"
                      : "rgba(123, 47, 247, 0.05)",
                  color: "#7b2ff7",
                  px: 2,
                  py: 0.5,
                  borderRadius: 5,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                <RssFeedIcon sx={{ fontSize: 16 }} />
                Our Blog
              </Stack>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mt: 2,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Celebrating Your Fish Discoveries
              </Typography>
            </Box>

  
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", md: 500 },
                textAlign: { xs: "left", md: "right" },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 2,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                At Fishers, we dive deeper than the surface—bringing you insights
                about global species, taxonomy, and the ecosystems fish call home.
              </Typography>

              <Link href="/blog">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    background: "linear-gradient(90deg, #7b2ff7, #a855f7)",
                    textTransform: "none",
                    px: { xs: 2, md: 3 },
                    fontWeight: 600,
                    fontSize: { xs: "0.8rem", md: "0.95rem" },
                    "&:hover": {
                      background: "linear-gradient(90deg, #6a1fbf, #9333ea)",
                    },
                  }}
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
                >
                  View More
                </Button>
              </Link>
            </Box>
          </Stack>
        </motion.div>

        
        <Box
          sx={{
            mt: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {blogPosts.map((post, index) => (
            <motion.div key={post.id} {...fadeUp(index * 0.2)}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "0.3s",
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": { boxShadow: 6 },
                }}
              >
               
                <Box
                  className="image-wrapper"
                  sx={{ position: "relative", overflow: "hidden" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.img}
                      alt={post.title}
                      sx={{ objectFit: "cover" }}
                    />
                  </motion.div>

                  
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
                      transform: "skewX(-25deg)",
                      pointerEvents: "none",
                    }}
                  />
                </Box>

                
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1,
                      fontSize: "0.85rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <CalendarTodayIcon sx={{ fontSize: 16 }} /> {post.date}
                    <PersonIcon sx={{ fontSize: 16 }} /> {post.author}
                  </Stack>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      transition: "color 0.3s",
                      "&:hover": { color: "#8d65ff" },
                      fontSize: { xs: "0.95rem", md: "1rem" },
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: theme.palette.text.secondary,
                      fontSize: { xs: "0.8rem", md: "0.9rem" },
                    }}
                  >
                    {post.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
