"use client"
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store/store";
import { fetchFish } from "../../Redux/slice/fishSlice";
import {
  Container,
  Grid,
  Card,
  Typography,
  CircularProgress,
  Button,
  Box,
  IconButton,
  Modal,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Banner from "../../components/searchBanner";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FilterList } from "@mui/icons-material";

interface Fish {
  id: string;
  common_name: string;
  scientific_name: string;
  family: string;
  country: string;
  image_url?: string | null;
}

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, search, country, family} = useSelector(
    (state: RootState) => state.fish
  );



  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleOpenPreview = (fish: Fish) => {
    setSelectedFish(fish);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
    setTimeout(() => setSelectedFish(null), 300);
  };

  useEffect(() => {
    dispatch(fetchFish());
  }, [search, country, family, dispatch]);

  const sortedItems = useMemo(() => {
    if (!items) return [];
    if (!sortOrder) return items;
    return [...items].sort((a: Fish, b: Fish) => {
      const nameA = (a.common_name || "").toLowerCase();
      const nameB = (b.common_name || "").toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [items, sortOrder]);

  return (
    <>
      <Banner />
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Search Results
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontStyle: "italic",
            fontSize: "1rem",
          }}
        >
          Explore diverse species with scientific details and origins
        </Typography>

        <Box sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            onClick={() => setSortOrder("asc")}
            sx={{
              borderRadius: "999px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              border: "1.5px solid",
              borderColor: "#8b5cf6",
              color: sortOrder === "asc" ? "#fff" : "#8b5cf6",
              background:
                sortOrder === "asc"
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "transparent",
              boxShadow:
                sortOrder === "asc"
                  ? "0 6px 18px rgba(124,58,237,0.25)"
                  : "none",
              "&:hover": {
                background:
                  sortOrder === "asc"
                    ? "linear-gradient(90deg,#7c3aed,#8b5cf6)"
                    : "rgba(139,92,246,0.06)",
                borderColor: "#7c3aed",
              },
            }}
            variant="outlined"
          >
            A-Z
          </Button>

          <Button
            disabled
            sx={{
              borderRadius: "999px",
              px: 4,
              textTransform: "none",
              fontWeight: 700,
              border: "1.5px solid",
              borderColor: "#8b5cf6",
              color: "#8b5cf6",
              background: "transparent",
              "&.Mui-disabled": {
                borderColor: "#8b5cf6",
                color: "#8b5cf6",
                opacity: 1,
              },
            }}
            variant="outlined"
            startIcon={<FilterList />}
          >
            FILTER
          </Button>

          <Button
            onClick={() => setSortOrder("desc")}
            sx={{
              borderRadius: "999px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              border: "1.5px solid",
              borderColor: "#8b5cf6",
              color: sortOrder === "desc" ? "#fff" : "#8b5cf6",
              background:
                sortOrder === "desc"
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "transparent",
              boxShadow:
                sortOrder === "desc"
                  ? "0 6px 18px rgba(124,58,237,0.25)"
                  : "none",
              "&:hover": {
                background:
                  sortOrder === "desc"
                    ? "linear-gradient(90deg,#7c3aed,#8b5cf6)"
                    : "rgba(139,92,246,0.06)",
                borderColor: "#7c3aed",
              },
            }}
            variant="outlined"
          >
            Z-A
          </Button>
        </Box>

        {!search && !country && !family && items.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 3, color: "gray" }}>
            🔍 Start searching or select a filter, then click Search to see
            results
          </Typography>
        ) : loading ? (
          <CircularProgress />
        ) : items && items.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 3 }}>
            Results not found
          </Typography>
        ) : (
          <Grid container spacing={8} justifyContent="center" alignItems="stretch">
            {sortedItems?.map((fish: Fish) => (
              <Grid size={{xs: 12, sm: 6, md: 4}} key={fish.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Card
                    sx={{
                      width: 250,
                      height: 320,
                      borderRadius: 4,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      backgroundColor: isDark ? "#1e1e1e" : "transparent",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.03)",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        fish.image_url ||
                        "https://via.placeholder.com/320x200?text=No+Image"
                      }
                      alt={fish.common_name ?? "Fish"}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 3,
                        display: "block",
                        transition: "all 0.5s ease",
                        "&:hover": {
                          filter: "brightness(1.2)",
                          boxShadow: "0 0 25px 8px rgba(255,255,255,0.9)",
                        },
                      }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.src =
                          "  https://via.placeholder.com/320x200?text=No+Image";
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0))",
                        borderRadius: 3,
                        pointerEvents: "none",
                      }}
                    />
                  </Card>

                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      bottom: -35,
                      left: "18px",
                      transform: "translateX(-50%)",
                      width: "85%",
                      minHeight: "130px",
                      background: isDark
                        ? "linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 100%)"
                        : "linear-gradient(180deg, #ffffff 0%, #f7f7f8 100%)",
                      borderRadius: 16,
                      padding: "14px 16px",
                      textAlign: "center",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                      zIndex: 5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 0.75,
                        fontSize: { xs: "0.65rem", sm: "0.8rem" },
                      }}
                    >
                      {fish.country ?? "Unknown"}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: "0.95rem", sm: "1.1rem" },
                        mb: 0.5,
                        color: isDark ? "#fff" : "inherit",
                      }}
                    >
                      {fish.common_name ?? "Unnamed Fish"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 0.25,
                        fontSize: { xs: "0.65rem", sm: "0.8rem" },
                      }}
                    >
                      {fish.scientific_name
                        ? `Scientific: ${fish.scientific_name}`
                        : "Scientific: Unknown"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 0.25,
                        fontSize: { xs: "0.65rem", sm: "0.8rem" },
                      }}
                    >
                      {`Family: ${fish.family ?? "Unknown"}`}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Link href={`/fish/${fish.id}`} passHref>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            borderRadius: "50px",
                            textTransform: "none",
                            bgcolor: "#8b5cf6",
                            px: { xs: 2, sm: 2.5 },
                            fontSize: { xs: "0.6rem", sm: "0.7rem" },
                            backgroundImage:
                              "linear-gradient(90deg, #8b5cf6, #7c3aed)",
                            transition: "all 0.35s ease",
                            "&:hover": {
                              transform: "translateY(-3px) scale(1.05)",
                              backgroundImage:
                                "linear-gradient(90deg, #7c3aed, #8b5cf6)",
                              boxShadow:
                                "0 6px 18px rgba(124,58,237,0.4)",
                            },
                          }}
                        >
                          Read More
                        </Button>
                      </Link>

                      <IconButton
                        onClick={() => handleOpenPreview(fish)}
                        sx={{
                          borderRadius: "50px",
                          border: "2px solid transparent",
                          color: "#8b5cf6",
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "#fff",
                            borderColor: "rgba(124,58,237,0.7)",
                            color: "#7c3aed",
                          },
                        }}
                      >
                        <FaEye />
                      </IconButton>
                    </Box>
                  </motion.div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        <AnimatePresence>
          {openPreview && selectedFish && (
            <Modal
              open={openPreview}
              onClose={handleClosePreview}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  width: "90%",
                  maxWidth: "850px",
                  background: isDark ? "#1e1e1e" : "white",
                  borderRadius: "20px",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
                  display: "flex",
                  flexDirection: "row",
                  overflow: "hidden",
                  color: isDark ? "#fff" : "#000",
                }}
              >
                <IconButton
                  onClick={handleClosePreview}
                  sx={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    color: "#fff",
                    bgcolor: "rgba(0,0,0,0.6)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    zIndex: 10,
                  }}
                >
                  <IoClose size={22} />
                </IconButton>

                <Box
                  sx={{
                    flex: "0 0 40%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <motion.img
                    src={
                      selectedFish.image_url ||
                      "  https://via.placeholder.com/400x500?text=No+Image"
                    }
                    alt={selectedFish.common_name}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    flex: "1",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "left",
                    background: isDark
                      ? "linear-gradient(to right, rgba(30,30,30,0.9) 0%, rgba(40,40,40,0.9) 100%)"
                      : "linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(243,232,255,0.9) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow:
                      "inset 0 4px 12px rgba(255,255,255,0.1)",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#8b5cf6" }}
                  >
                    {selectedFish.common_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: isDark ? "#e5e5e5" : "#4b5563" }}
                  >
                    <strong style={{ color: "#7c3aed" }}>Scientific:</strong>{" "}
                    {selectedFish.scientific_name || "Unknown"}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: isDark ? "#e5e5e5" : "#4b5563" }}
                  >
                    <strong style={{ color: "#7c3aed" }}>Family:</strong>{" "}
                    {selectedFish.family || "Unknown"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: isDark ? "#e5e5e5" : "#4b5563" }}
                  >
                    <strong style={{ color: "#7c3aed" }}>Country:</strong>{" "}
                    {selectedFish.country || "Unknown"}
                  </Typography>
                </Box>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}