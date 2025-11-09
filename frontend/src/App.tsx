import './styles/App.css';
import { Header, Footer, Preloader } from './components/Layout';
import { useHome } from './hooks/useHome';
import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';

import {
  MediaComparator,
  QualityHomes,
  DreamHomeJourney,
  BlogSection,
} from './components/Home';
import NewHeroSection from './components/Home/NewHeroSection';
import BodyRenderer from './components/BodyRenderer';

import { defaultHeroData } from './data/defaultData';

function App() {
  // Load Strapi page data (Hero mapped to your component props shape)
  const { loading, heroProps, bodyBlocks } = useHome();

  // Global ScrollTrigger coordination
  useEffect(() => {
    if (!loading && bodyBlocks.length > 0) {
      // Add delay to ensure all components are mounted
      const timer = setTimeout(() => {
        console.log('Refreshing ScrollTrigger after content load');
        ScrollTrigger.refresh();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading, bodyBlocks]);

  // Vite base path for files in /public
  const publicUrl = import.meta.env.BASE_URL || '/';

  // Featured Residential Projects
  const residentialProjects = [
    {
      image: `${publicUrl}images/l3.jpg`,
      title: 'Modern Family Villa',
      subtitle: 'Contemporary 4-bedroom home with open-plan living and premium finishes',
    },
    {
      image: `${publicUrl}images/l1.jpg`,
      title: 'Luxury Estate Home',
      subtitle: 'Expansive 5-bedroom residence with elegant design and landscaped gardens',
    },
    {
      image: `${publicUrl}images/l4.jpg`,
      title: 'Sustainable Smart Home',
      subtitle: 'Eco-friendly 3-bedroom home with solar panels and smart technology',
    },
    {
      image: `${publicUrl}images/hero.jpg`,
      title: 'Heritage Style Manor',
      subtitle: 'Classic 6-bedroom heritage home with traditional charm and modern amenities',
    },
  ];

  // Commercial & Community Projects
  const commercialProjects = [
    {
      image: `${publicUrl}images/hero.jpg`,
      title: 'Corporate Office Complex',
      subtitle: 'Modern 3-story office building with sustainable design and state-of-the-art facilities',
    },
    {
      image: `${publicUrl}images/5.jpg`,
      title: 'Retail Shopping Center',
      subtitle: 'Contemporary shopping complex with mixed-use spaces and community-focused design',
    },
    {
      image: `${publicUrl}images/6.jpg`,
      title: 'Boutique Hotel Resort',
      subtitle: 'Luxury 4-star boutique hotel with spa facilities and stunning architectural elements',
    },
    {
      image: `${publicUrl}images/l4.jpg`,
      title: 'Educational Campus',
      subtitle: 'State-of-the-art educational facility with innovative learning spaces and green technology',
    },
  ];
 

  return (
    <div className="App">
      {/* Keep your preloader; optional: show it while Strapi loads */}
      {loading && <Preloader />}

      <Header />
      <main>
        {/* New hero section */}
        <NewHeroSection />
        
        {/* Render body blocks from Wagtail CMS */}
        <BodyRenderer blocks={bodyBlocks} />

        <QualityHomes />
        <DreamHomeJourney />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
