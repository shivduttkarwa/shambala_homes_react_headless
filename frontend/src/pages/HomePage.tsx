import NewHeroSection from "../components/Home/NewHeroSection";
import { EssenceSection, PortfolioShowcase, FeaturedProperties, BenefitsSection } from "../components/Home";
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

  console.log("HomePage bodyBlocks:", bodyBlocks);

  return (
    <>
      <div id="hero">
        <NewHeroSection />
      </div>
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
