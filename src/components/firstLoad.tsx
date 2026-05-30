"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";


const Fish: React.FC<{ size?: number | string }> = ({ size = 140 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="loading fish"
    
    animate={{ rotate: -360 }}
    transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
    style={{ originX: "50%", originY: "50%" }}
  >

    <defs>
      <linearGradient id="fishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b388ff" />
        <stop offset="50%" stopColor="#8e24aa" />
        <stop offset="100%" stopColor="#6a1b9a" />
      </linearGradient>
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#softShadow)">
      <path
        d="M150 56c-42 0-78 27-90 52-2 4-2 8 0 12 12 25 48 52 90 52 32 0 62-12 84-32l14 16c2 3 6 3 9 0 5-5 9-12 9-20s-4-15-9-20c-3-3-7-3-9 0l-14 16c-22-20-52-32-84-32z"
        fill="url(#fishGradient)"
      />
      
      <circle cx="174" cy="116" r="10" fill="#311b92" />
      <circle cx="178" cy="112" r="4" fill="#fff" />
     
      <path d="M238 84c-14 8-22 20-22 36s8 28 22 36V84z" fill="#7e57c2" />
    
      <path d="M120 84l-24-16 8 26z" fill="#9575cd" />
      <path d="M120 148l-24 16 8-26z" fill="#9575cd" />
    </g>
  </motion.svg>
);


const WaveProgress: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  const theme = useTheme();
  const sky = "#87CEEB";
  return (
    <Box sx={{ width: "100%", position: "relative", height: 18 }} aria-label="loading progress">
   
      <Box sx={{ position: "absolute", inset: 0, borderRadius: 999, bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", overflow: "hidden" }} />
      
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 999 }}>
        <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress}%` }}>
          <svg width="100%" height="100%" viewBox="0 0 100 10" preserveAspectRatio="none">
            <defs>
              <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                <path d="M0,1 C0.2,0.6 0.4,0.6 0.5,0.8 C0.6,1 0.8,1 1,0.7 L1,1 L0,1 Z" />
              </clipPath>
            </defs>
            <rect width="100%" height="100%" clipPath="url(#wave-clip)" fill={sky} />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export type LoadingOverlayProps = {
  visible?: boolean;
  videoSrc?: string;
  onFinish?: () => void;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, videoSrc = "/loadview.mp4", onFinish }) => {
  const [internalVisible, setInternalVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (typeof visible === "boolean") return;
    const start = Date.now();
    const total = 2000; // Reduced from 3000ms to 2000ms
    const raf = () => {
      const t = Date.now() - start;
      const p = Math.min(100, (t / total) * 100);
      setProgress(p);
      if (t < total) requestAnimationFrame(raf);
      else {
        setInternalVisible(false);
        onFinish?.();
      }
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [visible, onFinish]);

 
  useEffect(() => {
    if (typeof visible !== "boolean") return;
   
    let frame: number;
    let p = 0;
    const step = () => {
      p = (p + 1.2) % 100;
      setProgress(p);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  const show = typeof visible === "boolean" ? visible : internalVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          
          <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {show && (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoLoaded(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: videoLoaded ? 1 : 0, transition: "opacity 0.3s" }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,32,0.35)" }} />
          </Box>

     
          <Box sx={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, p: 2 }}>
           
            <Fish />

          
            <Typography
              variant="h4"
              sx={{
                textTransform: "lowercase",
                letterSpacing: 4,
                fontWeight: 800,
                color: "#e0d7ff",
                textShadow: "0 4px 18px rgba(106,27,154,0.65)",
                userSelect: "none",
              }}
            >
              loading..
            </Typography>

          
            <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 24, px: { xs: 3, sm: 6, md: 10 } }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6 }}
              >
                <WaveProgress progress={progress} />
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;


