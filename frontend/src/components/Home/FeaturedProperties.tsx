import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedProperties.css";
import GlassButton from "../UI/GlassButton";

const publicUrl = import.meta.env.BASE_URL;

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
    title: '"WHERE VISION\nMEETS\nDREAMS"',
    leftImage: `${publicUrl}images/l4.jpg`,
    rightImage: `${publicUrl}images/zz.jpg`,
    tabletImage: `${publicUrl}images/zz.jpg`,
    subtitle: "Creating exceptional living spaces",
    description:
      "Building tomorrow's homes today.\n\nOur vision is to transform how Australians live by creating homes that harmonize with nature, embrace sustainability, and foster community connections. Every Shambala home is designed to enhance your lifestyle while respecting the environment.",
    link: "#",
  },
  {
    id: 2,
    category: "",
    title: '"SUSTAINABLE\nDESIGN\nTOMORROW"',
    leftImage: `${publicUrl}images/pexels-asphotography-94818.jpg`,
    rightImage: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
    tabletImage: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
    subtitle: "Sustainable design philosophy",
    description:
      "Innovation meets responsibility.\n\nWe believe in building homes that give back to the environment. Our sustainable design philosophy incorporates renewable materials, energy-efficient systems, and water conservation technologies to create homes that care for our planet.",
    link: "#",
  },
  {
    id: 3,
    category: "",
    title: '"COMMUNITY\nCENTERED\nLIVING"',
    leftImage: `${publicUrl}images/pexels-expect-best-79873-323780.jpg`,
    rightImage: `${publicUrl}images/pr1.jpg`,
    tabletImage: `${publicUrl}images/pr1.jpg`,
    subtitle: "Community-centered approach",
    description:
      "Building connections, not just homes.\n\nOur vision extends beyond individual homes to creating vibrant communities. We design neighborhoods that encourage interaction, promote wellbeing, and foster lasting relationships between residents and their environment.",
    link: "#",
  },
  {
    id: 4,
    category: "",
    title: '"EXCELLENCE\nIN EVERY\nDETAIL"',
    leftImage: `${publicUrl}images/pexels-jvdm-1457842.jpg`,
    rightImage: `${publicUrl}images/pr2.jpg`,
    tabletImage: `${publicUrl}images/pr2.jpg`,
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
      {/* Navigation buttons positioned to overlay exactly where they were */}
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
