import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedProperties.css";
import GlassButton from "../UI/GlassButton";

interface PropertySlide {
  id: number;
  category: string;
  title: string;
  leftImage: string;
  rightImage: string;
  tabletImage: string;
  subtitle: string;
  description: string;
  link: string;
}

const defaultProperties: PropertySlide[] = [
  {
    id: 1,
    category: "",
    title: "OUR\nVISION\n& MISSION",
    leftImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=1600&fit=crop&q=90",
    rightImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=1600&fit=crop&q=90",
    tabletImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=800&fit=crop&q=90",
    subtitle: "Creating exceptional living spaces",
    description:
      "Building tomorrow's homes today.\n\nOur vision is to transform how Australians live by creating homes that harmonize with nature, embrace sustainability, and foster community connections. Every Shambala home is designed to enhance your lifestyle while respecting the environment.",
    link: "#",
  },
  {
    id: 2,
    category: "",
    title: "OUR\nVISION\n& MISSION",
    leftImage:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=1600&fit=crop&q=90",
    rightImage:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=1600&fit=crop&q=90",
    tabletImage:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=800&fit=crop&q=90",
    subtitle: "Sustainable design philosophy",
    description:
      "Innovation meets responsibility.\n\nWe believe in building homes that give back to the environment. Our sustainable design philosophy incorporates renewable materials, energy-efficient systems, and water conservation technologies to create homes that care for our planet.",
    link: "#",
  },
  {
    id: 3,
    category: "",
    title: "OUR\nVISION\n& MISSION",
    leftImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=1600&fit=crop&q=90",
    rightImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=1600&fit=crop&q=90",
    tabletImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=800&fit=crop&q=90",
    subtitle: "Community-centered approach",
    description:
      "Building connections, not just homes.\n\nOur vision extends beyond individual homes to creating vibrant communities. We design neighborhoods that encourage interaction, promote wellbeing, and foster lasting relationships between residents and their environment.",
    link: "#",
  },
  {
    id: 4,
    category: "",
    title: "OUR\nVISION\n& MISSION",
    leftImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=1600&fit=crop&q=90",
    rightImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=1600&fit=crop&q=90",
    tabletImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=800&fit=crop&q=90",
    subtitle: "Excellence in craftsmanship",
    description:
      "Where quality meets artistry.\n\nOur commitment to excellence drives everything we do. From initial concept to final handover, we maintain the highest standards of craftsmanship, ensuring every Shambala home is a testament to quality, durability, and timeless design.",
    link: "#",
  },
];

interface FeaturedPropertiesProps {
  properties?: PropertySlide[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties = defaultProperties,
}) => {
  const swiperRef = useRef<any>(null);

  return (
    <section id="home_accommodation">
      <div className="swiper accommodation_swipe">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          speed={1000}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="swiper"
        >
          <div className="swiper-wrapper">
            {properties.map((property) => (
              <SwiperSlide key={property.id} className="swiper-slide">
                <div className="left">
                  {property.category && <p>{property.category}</p>}
                  <h2>{property.title}</h2>
                  <div className="left-navigation">
                    <button className="nav-btn swiper-button-prev">
                      <div className="btn-outline btn-outline-1"></div>
                      <div className="btn-outline btn-outline-2"></div>
                      <div className="arrow-container">
                        <svg
                          width="30"
                          height="12"
                          viewBox="0 0 30 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M30 6H1M1 6L6 1M1 6L6 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                    <button className="nav-btn swiper-button-next">
                      <div className="btn-outline btn-outline-1"></div>
                      <div className="btn-outline btn-outline-2"></div>
                      <div className="arrow-container">
                        <svg
                          width="30"
                          height="12"
                          viewBox="0 0 30 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 6H29M29 6L24 1M29 6L24 11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="image">
                    <img src={property.leftImage} alt={property.subtitle} />
                    <img
                      className="image-tablet"
                      src={property.tabletImage}
                      alt={property.subtitle}
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="image">
                    <img src={property.rightImage} alt={property.subtitle} />
                  </div>
                  <div className="content-wrapper">
                    <h4>{property.subtitle}</h4>
                    <div className="text">
                      <p>{property.description}</p>
                    </div>
                    <GlassButton href={property.link}>Discover</GlassButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProperties;
