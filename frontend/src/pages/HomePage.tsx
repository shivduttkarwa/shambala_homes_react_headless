import React, { useState, useEffect } from "react";
import AnimatedHero from "../components/Home/AnimatedHero";
import MobileHero from "../components/Home/MobileHero";
import {
  EssenceSection,
  PortfolioShowcase,
  FeaturedProperties,
  BenefitsSection,
} from "../components/Home";
import OurVisionSection from "../components/Home/OurVisionSection";
import CTASection from "../components/Home/CTASection";
import ServicesSection from "../components/Home/ServicesSection";
import BlogSection from "../components/Home/BlogSection";
import BodyRenderer from "../components/BodyRenderer";
import { useHome } from "../hooks/useHome";
import { SiteSettings } from "../services/api";

interface HomePageProps {
  settings: SiteSettings | null;
}

const HomePage: React.FC<HomePageProps> = ({ settings: _ }) => {
  const { bodyBlocks } = useHome();
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  console.log("HomePage bodyBlocks:", bodyBlocks);

  return (
    <>
      <div id="hero">{isMobile ? <MobileHero /> : <AnimatedHero />}</div>
      <EssenceSection />
      <div id="services">
        <ServicesSection />
      </div>
      <BenefitsSection />
      <div id="projects">
        <PortfolioShowcase />
      </div>

      <div id="vision">
        <OurVisionSection />
      </div>

      <FeaturedProperties />

      <BlogSection />

      <BodyRenderer blocks={bodyBlocks} />

      <div id="contact">
        <CTASection />
      </div>
    </>
  );
};

export default HomePage;
