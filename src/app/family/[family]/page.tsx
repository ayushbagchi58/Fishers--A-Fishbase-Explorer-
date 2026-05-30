"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { fetchSpeciesByFamily } from "../../../Redux/slice/fishSlice";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import Banner from "@/components/familyDetailsBanner";

export default function FamilyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const familyName = params?.family 
    ? decodeURIComponent(Array.isArray(params.family) ? params.family[0] : params.family) 
    : "";
  const dispatch = useAppDispatch();

  const { species, loading, error } = useAppSelector((state) => state.fish);

  useEffect(() => {
    if (familyName) {
      dispatch(fetchSpeciesByFamily(familyName));
    }
  }, [dispatch, familyName]);

  return (
    <>
      <Banner />
      <Container sx={{ py: { xs: 4, sm: 5, md: 6 } }}>
        {/* Heading */}
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" }, 
          }}
        >
          {familyName} Family Species
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          mb={4}
          textAlign="center"
          sx={{
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.15rem" },
            px: { xs: 2, sm: 6, md: 12 }, 
          }}
        >
          Discover fascinating species belonging to the <b>{familyName}</b> family.
          Click on any species to explore its details.
        </Typography>

        {loading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}

       
        {!loading && (
          <>
            {species.length > 0 ? (
              <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
                justifyContent="center"
              >
                {species.map((fish, index) => (
                  <Grid size={{xs: 12, sm: 6, md: 4}} key={fish.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card
                        sx={{
                          position: "relative",
                          borderRadius: 3,
                          overflow: "hidden",
                          boxShadow: 3,
                          textAlign: "center",
                          transition: "all 0.4s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: 8,
                          },
                          "&:hover .overlay": {
                            opacity: 1,
                            transform: "translateY(0%)",
                          },
                        }}
                      >
                       
                        {fish.image_url ? (
                          <CardMedia
                            component="img"
                            height="200"
                            image={fish.image_url}
                            alt={fish.common_name}
                            sx={{
                              objectFit: "cover",
                              height: { xs: 160, sm: 200, md: 220 },
                            }}
                          />
                        ) : (
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              textAlign="center"
                            >
                              No image available
                            </Typography>
                          </CardContent>
                        )}

                    
                        <Box
                          className="overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(135deg, rgba(168,85,247,0.85), rgba(126,34,206,0.85))",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            px: { xs: 2, sm: 3 },
                            opacity: 0,
                            transform: "translateY(100%)",
                            transition: "all 0.4s ease-in-out",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                            }}
                          >
                            {fish.common_name || "Unknown Species"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 2,
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            }}
                          >
                            {fish.scientific_name}
                          </Typography>

                          <Button
                            variant="contained"
                            onClick={() => router.push(`/fish/${fish.id}`)}
                            sx={{
                              background: "white",
                              color: "#6b21a8",
                              fontWeight: "bold",
                              borderRadius: 2,
                              px: { xs: 2, sm: 3 },
                              py: { xs: 0.5, sm: 1 },
                              fontSize: { xs: "0.75rem", sm: "0.9rem" },
                              textTransform: "none",
                              "&:hover": {
                                background: "#f3e8ff",
                              },
                            }}
                          >
                            Explore
                          </Button>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : error ? (
              <Typography color="error" textAlign="center" mt={3}>
                {error || "Failed to load species."}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{
                  width: "100%",
                  mt: 4,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  px: { xs: 2, sm: 6 },
                }}
              >
                No species found for the <b>{familyName}</b> family.
              </Typography>
            )}
          </>
        )}
      </Container>
    </>
  );
}
