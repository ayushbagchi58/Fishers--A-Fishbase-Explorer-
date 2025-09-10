"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store/store";
import { setCountry, setFamily } from "../Redux/slice/fishSlice"; // Removed setSearch and fetchFish
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  useTheme,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FaFish } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchSec() {
  const dispatch = useDispatch<AppDispatch>();
  const { search, country, family } = useSelector((state: RootState) => state.fish); // Only using these
  const [localSearch, setLocalSearch] = useState(search);
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleSearchClick = () => {
    router.push("/search");
  };

  const handleCountryClick = (c: string) => {
    dispatch(setCountry(c));
  };

  const handleFamilyClick = (f: string) => {
    dispatch(setFamily(f));
  };

  const countries = ["Canada", "Egypt", "UK", "India", "Australia"];
  const families = ["Salmonidae", "Esocidae", "Cichlidae", "Gadidae", "Cyprinidae", "Latidae"];

  const showHint = !localSearch && !country && !family;

  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: isDarkMode ? "white" : "black" }}
      >
        <FaFish size={28} style={{ marginRight: "8px", color: "#8d65ff" }} />
        Explore various fishes
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ mb: 4, color: isDarkMode ? "grey.400" : "text.secondary" }}
      >
        Use filters or search to see fishes
      </Typography>

      <Box display="flex" justifyContent="center" mb={4} gap={2}>
        <TextField
          placeholder="Search Fishes.."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          sx={{
            width: "300px",
            height: "50px",
            background: isDarkMode ? "grey.800" : "#f6f3ff",
            borderRadius: "50px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              height: "50px",
              color: isDarkMode ? "white" : "black",
            },
            "& .MuiInputBase-input": {
              height: "50px",
              padding: "0 14px",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          sx={{
            borderRadius: "50px",
            height: "50px",
            px: 4,
            bgcolor: "#8b5cf6",
            textTransform: "none",
            "&:hover": { bgcolor: "#7c3aed" },
          }}
        >
          Search →
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={3}>
        <Button
          variant="outlined"
          disabled
          sx={{
            borderRadius: "50px",
            borderColor: "#8b5cf6",
            color: "#8b5cf6",
            backgroundColor: isDarkMode ? "grey.900" : "#fff",
            "&.Mui-disabled": {
              borderColor: "#8b5cf6",
              color: "#8b5cf6",
              backgroundColor: isDarkMode ? "grey.900" : "#fff",
            },
          }}
        >
          <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
          Country
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleCountryClick("")}
          sx={{
            borderRadius: "50px",
            borderColor: "#8b5cf6",
            color: country === "" ? "#fff" : "#8b5cf6",
            backgroundColor: country === "" ? "#8b5cf6" : isDarkMode ? "grey.900" : "#fff",
            "&:hover": { backgroundColor: "#8b5cf6", color: "#fff" },
          }}
        >
          All
        </Button>

        {countries.map((c) => (
          <Button
            key={c}
            variant="outlined"
            onClick={() => handleCountryClick(c)}
            sx={{
              borderRadius: "50px",
              borderColor: "#8b5cf6",
              color: country === c ? "#fff" : "#8b5cf6",
              backgroundColor: country === c ? "#8b5cf6" : isDarkMode ? "grey.900" : "#fff",
              "&:hover": { backgroundColor: "#8b5cf6", color: "#fff" },
            }}
          >
            {c}
          </Button>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={6}>
        <Button
          variant="outlined"
          disabled
          sx={{
            borderRadius: "50px",
            borderColor: "#8b5cf6",
            color: "#8b5cf6",
            backgroundColor: isDarkMode ? "grey.900" : "#fff",
            "&.Mui-disabled": {
              borderColor: "#8b5cf6",
              color: "#8b5cf6",
              backgroundColor: isDarkMode ? "grey.900" : "#fff",
            },
          }}
        >
          <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
          Family
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleFamilyClick("")}
          sx={{
            borderRadius: "50px",
            borderColor: "#8b5cf6",
            color: family === "" ? "#fff" : "#8b5cf6",
            backgroundColor: family === "" ? "#8b5cf6" : isDarkMode ? "grey.900" : "#fff",
            "&:hover": { backgroundColor: "#8b5cf6", color: "#fff" },
          }}
        >
          All
        </Button>

        {families.map((f) => (
          <Button
            key={f}
            variant="outlined"
            onClick={() => handleFamilyClick(f)}
            sx={{
              borderRadius: "50px",
              borderColor: "#8b5cf6",
              color: family === f ? "#fff" : "#8b5cf6",
              backgroundColor: family === f ? "#8b5cf6" : isDarkMode ? "grey.900" : "#fff",
              "&:hover": { backgroundColor: "#8b5cf6", color: "#fff" },
            }}
          >
            {f}
          </Button>
        ))}
      </Box>

      {showHint && (
        <Typography variant="body1" sx={{ mt: 3, color: isDarkMode ? "grey.400" : "gray" }}>
          🔍 Start searching or select a filter, then click Search to see results
        </Typography>
      )}
    </Container>
  );
}