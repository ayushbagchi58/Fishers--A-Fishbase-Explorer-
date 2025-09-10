"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Link as MUILink,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";
import Banner from "@/components/fishDetailBanner";

type FishDetails = {
  id: string;
  common_name: string | null;
  scientific_name: string | null;
  species: string | null;
  genus: string | null;
  family: string | null;
  country: string | null;
  image_url: string | null;
  biology: string | null;
  taxonomy: string | null;
  distribution: string | null;
  ecology: string | null;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const FishSVG = ({ size = 40, color = "#a855f7" }: { size?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} fill={color}>
    <path d="M32 12c-7 0-13 3-18 7l-8-3 3 8c-2 4-3 8-3 12s1 8 3 12l-3 8 8-3c5 4 11 7 18 7 12 0 22-10 22-22S44 12 32 12zM48 32c0 9-7 16-16 16S16 41 16 32s7-16 16-16 16 7 16 16z" />
    <circle cx="38" cy="32" r="3" fill="#fff" />
  </svg>
);

export default function FishDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;
  const [data, setData] = useState<FishDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!id) return;
        setLoading(true);
        
      
        const { data: fishData, error } = await supabase
          .from<FishDetails>("fish_species") 
          .select(
            `
              id, common_name, scientific_name, species, genus, family,
              country, image_url, biology, taxonomy, distribution, ecology
            `
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        if (mounted) setData(fishData); 
      } catch (e: unknown) {
        if (e instanceof Error) {
          setErr(e.message);
        } else {
          setErr("Failed to load");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const title = useMemo(() => data?.common_name ?? data?.scientific_name ?? "Fish Details", [data]);

  if (loading) {
    return (
      <Container sx={{ py: 8, minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (err || !data) {
    return (
      <Container sx={{ py: 8 }}>
        <MUILink
          component="button"
          onClick={() => router.back()}
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            mb: 3,
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { color: "text.secondary" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" sx={{ mr: 1 }} /> back to list
        </MUILink>
        <Typography variant="h5" color="error" gutterBottom>
          Couldn’t load this fish.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {err ?? "Unknown error"}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Banner />
      <Container sx={{ py: { xs: 3, sm: 4, md: 8 } }}>
        <MUILink
          component="button"
          onClick={() => router.back()}
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            mb: { xs: 2, sm: 3 },
            color: "text.secondary",
            "&:hover": { color: "text.secondary" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" sx={{ mr: 1 }} /> back to list
        </MUILink>

        <motion.div {...fadeUp(0)}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 1, fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}
          >
            FISH PROFILE
          </Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom fontSize={{ xs: 24, sm: 32, md: 38 }}>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 3, md: 6 }, maxWidth: 820, fontSize: { xs: 14, sm: 16 } }}
          >
            Dive into a concise biological profile—taxonomy, distribution, ecology, and more—curated for quick research and exploration.
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              boxShadow: "0 10px 30px rgba(16,24,40,0.06)",
              position: "relative",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, #a855f7, #7e22ce)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(168,85,247,0.6)",
                zIndex: 5,
              }}
            >
              <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <FishSVG size={30} color="#e9d5ff" />
              </motion.div>
            </motion.div>

            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                position: "relative",
                minHeight: { xs: 260, sm: 320, md: 500 },
                background: theme.palette.mode === "dark"
                  ? "linear-gradient(180deg, rgba(40,40,40,0.9) 0%, rgba(50,50,50,0.95) 40%, rgba(30,30,30,1) 100%)"
                  : "linear-gradient(180deg, rgba(239,236,255,0.9) 0%, rgba(238,241,255,0.95) 40%, rgba(245,248,255,1) 100%)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: { xs: "-6%", sm: "-8%", md: "-12%" },
                  width: { xs: "120%", sm: "130%", md: "120%" },
                  height: { xs: "36%", sm: "40%", md: "48%" },
                  borderRadius: "50%",
                  background: "radial-gradient(closest-side, rgba(139,92,246,0.12), rgba(139,92,246,0.06) 40%, transparent 60%)",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: { xs: "75%", sm: "70%", md: "75%" },
                  height: { xs: "75%", sm: "70%", md: "78%" },
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Image
                  src={data.image_url ?? "https://via.placeholder.com/900x900?text=No+Image"}
                  alt={data.common_name ?? "Fish"}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width:1200px) 50vw, 45vw"
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))",
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                backgroundColor: theme.palette.background.paper,
                p: { xs: 2, sm: 3, md: 4 },
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <CardContent sx={{ p: 0, width: "100%" }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                  <Chip label="CATALOG" size="small" color="secondary" variant="filled" />
                  {data.family && <Chip label={`Family: ${data.family}`} size="small" variant="outlined" />}
                  {data.country && <Chip label={data.country} size="small" variant="outlined" />}
                </Stack>

                <Typography variant="h4" fontWeight={800} sx={{ mb: 1, fontSize: { xs: 20, sm: 24, md: 28 } }}>
                  {data.common_name ?? "Unnamed Fish"}
                </Typography>
                {data.scientific_name && (
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", mb: 2, fontSize: { xs: 14, sm: 16 } }}
                  >
                    {data.scientific_name}
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {[
                    { label: "Species", value: data.species },
                    { label: "Genus", value: data.genus },
                    { label: "Family", value: data.family },
                  ].map(
                    (row) =>
                      row.value && (
                        <Grid key={row.label} item xs={12} sm="auto">
                          <Chip
                            icon={<CheckCircleIcon />}
                            label={`${row.label}: ${row.value}`}
                            variant="outlined"
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                          />
                        </Grid>
                      )
                  )}
                </Grid>

                {(data.biology || data.ecology || data.distribution) && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                      Description:
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {data.biology && <li><Typography variant="body2">{data.biology}</Typography></li>}
                      {data.ecology && <li><Typography variant="body2">{data.ecology}</Typography></li>}
                      {data.distribution && <li><Typography variant="body2">{data.distribution}</Typography></li>}
                    </Box>
                  </Box>
                )}

                <Section title="Biology" text={data.biology} delay={0.2} />
                <Section title="Taxonomy" text={data.taxonomy} delay={0.25} />
                <Section title="Distribution" text={data.distribution} delay={0.3} />
                <Section title="Ecology" text={data.ecology} delay={0.35} />
              </CardContent>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </>
  );
}

function Section({ title, text, delay = 0 }: { title: string; text: string | null; delay?: number }) {
  if (!text) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      style={{ marginTop: 16 }}
    >
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
        {title}:
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 14, sm: 15 } }}>
        {text}
      </Typography>
      <Divider sx={{ mt: 2 }} />
    </motion.div>
  );
}