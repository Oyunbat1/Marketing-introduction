"use client"
import { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Lenis from 'lenis'
import AboutSection from "./components/AboutUs";
import FAQ from "./components/FAQ";
import Service from "./components/Service";
import Testimonials from "./components/Testimonials";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    // Expose Lenis to window for use in Header component
    (window as any).lenis = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, [])

  return (
    <div>
      <Header />
      <HeroSection />
      <FAQ />
      <AboutSection />
      <Service />
      <Testimonials />
    </div>
  );
}
