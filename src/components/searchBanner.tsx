"use client";

import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";

const Banner = () => {
  return (
    <Box
      component="section"
      sx={{
        width: "100vw", 
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw", 
        marginRight: "-50vw",
        height: { xs: "200px", sm: "250px", md: "320px", lg: "380px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1693283802856-f94371ad0c79?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000')", // Fish background
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)", 
        },
      }}
    >
     
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem", lg: "3rem" },
          }}
        >
          Search
        </Typography>
        <Breadcrumbs
          sx={{
            justifyContent: "center",
            display: "flex",
            mt: 1,
            color: "#fff",
          }}
        >
          <Link component={NextLink} href="/" color="inherit" underline="hover">
            Home
          </Link>
          <Typography color="#8d65ff">Search</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  );
};

export default Banner;
