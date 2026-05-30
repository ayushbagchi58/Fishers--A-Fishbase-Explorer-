"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";   
import { useAppDispatch } from "../../Redux/hooks";    
import { fetchFamilies } from "../../Redux/slice/familySlice";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Banner from "../../components/familyBanner";

export default function FamiliesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { list, status, error } = useSelector(
    (state: RootState) => state.families
  );

  useEffect(() => {
    if (status === "idle") {
      console.log("🚀 Dispatching fetchFamilies()");
      dispatch(fetchFamilies());
    }
  }, [dispatch, status]);

  return (
    <>
    <Banner/>
    <Container sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign={{ xs: "center", sm: "left" }}
      >
        Explore Fish Families
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
        textAlign={{ xs: "center", sm: "left" }}
      >
        Browse through global fish families. Click on a family to view its
        species.
      </Typography>

      {status === "loading" && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {status === "failed" && (
        <Typography color="error" textAlign="center">
          {error || "Failed to load families."}
        </Typography>
      )}

      {status === "succeeded" && (
        <Grid container spacing={3}>
          {list.map((family, index) => (
            <Grid
              size={{xs: 12, sm: 6, md: 4, lg: 3}}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{ width: "100%", maxWidth: 300 }}
              >
                <Card
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                    transition: "all 0.3s ease-in-out",
                    ":hover": { boxShadow: 6, transform: "scale(1.03)" },

                  
                    "& .hoverText": {
                      opacity: 0,
                      maxHeight: 0,
                      transition: "all 0.3s ease",
                    },
                    ":hover .hoverText": {
                      opacity: 1,
                      maxHeight: "40px",
                    },

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: 3,
                      padding: "2px",
                      background:
                        "linear-gradient(120deg, #ff3636, #3f9f47, #00a9ff, #ff36c8)",
                      backgroundSize: "300% 300%",
                      animation: "squigglyGlow 6s linear infinite",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      zIndex: 0,
                    },
                  }}
                  onClick={() => {
                    console.log("📌 Navigating to family:", family.family);
                    router.push(`/family/${family.family}`);
                  }}
                >
                  <CardContent sx={{ position: "relative", zIndex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {family.family}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      className="hoverText"
                    >
                      Click to explore species
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

    
      <style>
        {`
          @keyframes squigglyGlow {
            0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
            50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
            100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
          }
        `}
      </style>
    </Container>
    </>
  );
}
