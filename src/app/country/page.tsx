"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/lib/supabaseClient";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Banner from "../../components/countryBanner";

const fishIcon = new L.DivIcon({
  html: `<svg width="32" height="32" viewBox="0 0 64 64" fill="#a855f7" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12c-7 0-13 3-18 7l-8-3 3 8c-2 4-3 8-3 12s1 8 3 12l-3 8 8-3c5 4 11 7 18 7 12 0 22-10 22-22S44 12 32 12zM48 32c0 9-7 16-16 16S16 41 16 32s7-16 16-16 16 7 16 16z"/>
      <circle cx="38" cy="32" r="3" fill="#fff"/>
    </svg>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function LoadingScreen({ country }: { country: string }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="ocean.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 64 64"
          fill="#a855f7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 12c-7 0-13 3-18 7l-8-3 3 8c-2 4-3 8-3 12s1 8 3 12l-3 8 8-3c5 4 11 7 18 7 12 0 22-10 22-22S44 12 32 12zM48 32c0 9-7 16-16 16S16 41 16 32s7-16 16-16 16 7 16 16z"/>
          <circle cx="38" cy="32" r="3" fill="#fff"/>
        </svg>
      </motion.div>

      <Box
        sx={{
          mt: 4,
          width: { xs: "80%", sm: "70%", md: "60%" },
          height: "15px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#3b0764",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, #9333ea, #a855f7, #9333ea)",
          }}
        />
      </Box>

      <Typography
        variant="h6"
        sx={{
          color: "white",
          mt: 3,
          fontWeight: "bold",
          textAlign: "center",
          px: 2,
        }}
      >
        Loading fishes from {country}...
      </Typography>
    </Box>
  );
}

interface Fish {
  id: string;
  common_name: string;
  scientific_name: string;
  family: string;
  country: string;
  biology: string;
  distribution: string;
  image_url?: string;
}

interface CountryCoord {
  name: string;
  lat: number;
  lon: number;
}

export default function CountryPage() {
  const [countries, setCountries] = useState<CountryCoord[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase.from("fish_species").select("country");
      if (error) return;
      const uniqueCountries = Array.from(new Set(data.map((item) => item.country)));
      setCountries(uniqueCountries.map((c) => ({ name: c, lat: 0, lon: 0 })));

      uniqueCountries.forEach(async (country) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(country)}&format=json&limit=1`
          );
          const json = await res.json();
          if (json.length > 0) {
            setCountries((prev) =>
              prev.map((p) =>
                p.name === country ? { ...p, lat: parseFloat(json[0].lat), lon: parseFloat(json[0].lon) } : p
              )
            );
          }
        } catch {}
      });
    };
    fetchCountries();
  }, []);

  const handleCountryClick = async (country: string) => {
    setSelectedCountry(country);
    setLoading(true);
    setFishes([]);
    setCurrentIndex(0);
    const { data, error } = await supabase.from("fish_species").select("*").eq("country", country);
    if (error) return setLoading(false);
    setTimeout(() => {
      setFishes(data || []);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Banner />
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        {loading && selectedCountry && <LoadingScreen country={selectedCountry} />}

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.3rem" } }}
        >
          🌍 Explore Fishes by Country
        </Typography>

        <Box
          sx={{
            height: { xs: 300, sm: 400, md: 450 },
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
            my: { xs: 2, md: 3 },
          }}
        >
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {countries.map(
              (c) =>
                c.lat !== 0 &&
                c.lon !== 0 && (
                  <Marker key={c.name} position={[c.lat, c.lon]} icon={fishIcon} eventHandlers={{ click: () => handleCountryClick(c.name) }}>
                    <Tooltip permanent direction="top" offset={[0, -20]}>
                      {c.name}
                    </Tooltip>
                    <Popup>{c.name}</Popup>
                  </Marker>
                )
            )}
          </MapContainer>
        </Box>

        {fishes.length > 0 && !loading && (
          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 3, md: 4 },
              py: { xs: 3, md: 4 },
              borderRadius: 4,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #1e1e1e, #2a2a2a, #1e1e1e)"
                  : "linear-gradient(135deg, #ede9fe, #f3e8ff, #e0f2fe)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" } }}
            >
              🐟 Fishes from {selectedCountry}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontStyle: "italic",
                color: theme.palette.mode === "dark" ? "#a5b4fc" : "#6b21a8",
                mb: 3,
                fontWeight: 500,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Dive into the unique aquatic life this region has to offer 🌊
            </Typography>

            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 2, sm: 2, md: 2.5 }}
              flexWrap={{ xs: "wrap", sm: "wrap", md: "nowrap" }}
            >
              <IconButton onClick={() => setCurrentIndex((prev) => (prev === 0 ? fishes.length - 1 : prev - 1))}>
                <ArrowBackIosNewIcon />
              </IconButton>

              <Box display="flex" gap={{ xs: 2, sm: 2, md: 2.5 }} flexWrap={{ xs: "wrap", sm: "wrap", md: "nowrap" }} justifyContent="center">
                {[0, 1, 2].map((offset) => {
                  const index = (currentIndex + offset) % fishes.length;
                  const fish = fishes[index];
                  return (
                    <motion.div key={fish.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Card
                        sx={{
                          width: { xs: 230, sm: 250, md: 260 },
                          borderRadius: 3,
                          p: 2,
                          bgcolor: theme.palette.background.paper,
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.03)",
                            boxShadow: "0 12px 30px rgba(147,51,234,0.3)",
                          },
                        }}
                      >
                        {fish.image_url && (
                          <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
                            <Image src={fish.image_url} alt={fish.common_name} width={280} height={180} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }} />
                            <Box
                              className="shine-effect"
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: "-75%",
                                width: "50%",
                                height: "100%",
                                background: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
                                transform: "skewX(-20deg)",
                              }}
                            />
                            <style jsx>{`
                              .shine-effect {
                                transition: left 0.6s ease;
                              }
                              .shine-effect:hover {
                                left: 125%;
                              }
                            `}</style>
                          </Box>
                        )}
                        <CardContent>
                          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.05rem" } }}>
                            {fish.common_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                            <strong>Species:</strong> {fish.scientific_name}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 2,
                              bgcolor: "#9333ea",
                              "&:hover": { bgcolor: "#7e22ce" },
                              fontSize: { xs: "0.8rem", sm: "0.9rem" },
                              px: { xs: 2, sm: 3 },
                            }}
                            onClick={() => router.push(`/fish/${fish.id}`)}
                          >
                            Explore
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </Box>

              <IconButton onClick={() => setCurrentIndex((prev) => (prev + 1) % fishes.length)}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}
