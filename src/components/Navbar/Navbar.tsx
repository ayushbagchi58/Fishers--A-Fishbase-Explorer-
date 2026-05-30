"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { FaFish } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeMode } from "../theme-provider";

// Move navLinks outside component to prevent recreation
const navLinks = [
  { href: "/", label: "Home", drop: false },
  { href: "/about", label: "About Us", drop: false },
  { href: "/search", label: "Search", drop: false },
  { href: "/country", label: "By Country", drop: false },
  { href: "/family", label: "By Family", drop: false },
];

export default function Navbar() {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ position: "sticky", top: 0, zIndex: 1100 }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          px: 2,
          pt: scrolled ? "6px" : "18px",
          pb: 0,
          bgcolor: scrolled
            ? isDark
              ? "rgba(20,20,26,0.72)"
              : "rgba(255,255,255,0.92)"
            : theme.palette.background.default,
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(255,255,255,.06)"
              : "1px solid rgba(0,0,0,.06)"
            : "none",
          boxShadow: scrolled
            ? isDark
              ? "0 2px 10px rgba(0,0,0,.35)"
              : "0 2px 10px rgba(0,0,0,.06)"
            : "none",
          transition:
            "padding .28s ease, background .28s ease, box-shadow .28s ease, border-color .28s ease",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: "1320px",
            mx: "auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            columnGap: "24px",
            bgcolor: scrolled
              ? "transparent"
              : isDark
              ? "rgba(255,255,255,.06)"
              : "#f4f1fe",
            border: scrolled
              ? "none"
              : isDark
              ? "1px solid rgba(255,255,255,.12)"
              : "1px solid rgba(117,77,255,.08)",
            borderRadius: scrolled ? 0 : "56px",
            py: scrolled ? "10px" : "16px",
            px: scrolled ? "8px" : "26px",
            boxShadow: scrolled ? "none" : "0 1px 0 rgba(0,0,0,.02) inset",
            transition: "all .28s ease",
          }}
        >
          <Link
            href="/"
            prefetch
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              gap: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <FaFish
              size={scrolled ? 24 : 28}
              style={{ marginRight: "8px", color: "#8d65ff" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: scrolled ? "1.1rem" : "1.25rem",
                letterSpacing: ".2px",
                transition: "font-size .28s ease",
                color: isDark ? "#fff" : "#111",
              }}
            >
              Fishers
            </Typography>
          </Link>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4.25}
            sx={{
              transition: "gap .28s ease",
              display: { xs: "none", md: "flex" },
            }}
          >
            {navLinks.map(({ href, label, drop }) => (
              <Link
                key={href}
                href={href}
                prefetch
                style={{
                  textDecoration: "none",
                  color: isDark ? "#fff" : "#111",
                  fontWeight: 600,
                  fontSize: scrolled ? "0.95rem" : "1.02rem",
                  lineHeight: 1,
                  opacity: 0.92,
                  transition:
                    "color .28s ease, opacity .2s ease, font-size .28s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8d65ff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isDark ? "#fff" : "#111")
                }
              >
                {label}
                {drop && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "0.8rem",
                      opacity: 0.7,
                    }}
                  >
                    ▾
                  </span>
                )}
              </Link>
            ))}
          </Stack>

          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: isDark ? "#fff" : "#111",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            onClick={toggleMode}
            aria-label="Toggle dark mode"
            sx={{
              fontSize: scrolled ? "1.16rem" : "1.28rem",
              color: "inherit",
              "&:hover": {
                background: "transparent",
                transform: "scale(1.06)",
                opacity: 1,
              },
              "&:focus-visible": {
                outline: "2px solid currentColor",
                outlineOffset: "3px",
              },
              transition: "transform .18s ease, opacity .18s ease",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            bgcolor: "#f8f9ff",
            borderTopLeftRadius: "18px",
            borderBottomLeftRadius: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,.12)",
            display: "flex",
            flexDirection: "column",
            p: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2, color: "#111", px: 1 }}
        >
          Menu
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ flexGrow: 1 }}>
          {navLinks.map(({ href, label, drop }) => (
            <ListItem key={href} disablePadding>
              <Link
                href={href}
                prefetch
                style={{ width: "100%", textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemButton
                  sx={{
                    borderRadius: "10px",
                    mb: 1,
                    "&:hover": {
                      bgcolor: "rgba(141, 101, 255, 0.08)",
                    },
                  }}
                >
                  <ListItemText
                    primary={`${label}${drop ? " ▾" : ""}`}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#111",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </motion.div>
  );
}