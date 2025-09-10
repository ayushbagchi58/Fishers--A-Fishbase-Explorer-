"use client";

import { useState, useEffect } from "react";
import LoadingOverlay from "./firstLoad";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingOverlay visible={loading} videoSrc="/loadview.mp4" />
      {!loading && <Navbar />}
      {!loading && children}
      {!loading && <Footer />}
    </>
  );
}
