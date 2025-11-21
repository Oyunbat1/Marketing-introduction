"use client"
import { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Lenis from 'lenis'
import AboutSection from "./components/AboutUs";
import FAQ from "./components/FAQ";
import Service from "./components/Service";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [])

  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <FAQ />
      <Service />
    </div>
  );
}
