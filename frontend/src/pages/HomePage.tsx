import NewHeroSection from '../components/Home/NewHeroSection';
import { EssenceSection, PortfolioSection } from '../components/Home';
import BodyRenderer from '../components/BodyRenderer';
import { useHome } from '../hooks/useHome';
import { SiteSettings } from '../services/api';

interface HomePageProps {
  settings: SiteSettings | null;
}

const HomePage: React.FC<HomePageProps> = ({ settings: _ }) => {
  const { bodyBlocks } = useHome();

  return (
    <>
      <NewHeroSection />
      <EssenceSection />
      <PortfolioSection />
      <BodyRenderer blocks={bodyBlocks} />
    </>
  );
};

export default HomePage;
