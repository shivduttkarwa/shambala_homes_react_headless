import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./PortfolioSection.css";

gsap.registerPlugin(ScrollTrigger);
Swiper.use([Navigation]);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
}

interface PortfolioSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  projects?: Project[];
}

const publicUrl = import.meta.env.BASE_URL;

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  tagline = "DESIGN, ARCHITECTURE, INTERIOR DESIGN",
  heading = "PORTFOLIO",
  description = "We create refined, functional spaces where aesthetics meet purpose. Each project is a dialogue between form and feeling — crafted with precision, shaped by context, and inspired by timeless design principles.",
  ctaText = "VIEW ALL",
  ctaHref = "#projects",
  projects = [
    {
      id: 1,
      title: "CASA RAVELLO",
      subtitle: "High Pines Miami",
      description: "High Pines Miami",
      image: `${publicUrl}images/14.jpg`,
    },
    {
      id: 2,
      title: "CASA PALAZZO",
      subtitle: "Coral Gables",
      description: "Coral Gables",
      image: `${publicUrl}images/15.jpg`,
    },
    {
      id: 3,
      title: "MODERN VILLA",
      subtitle: "Palm Beach",
      description: "Palm Beach",
      image: `${publicUrl}images/16.jpg`,
    },
  ],
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const swiperRef = useRef<Swiper | null>(null);

  // Split text into characters
  const splitTextIntoChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char">
        {char}
      </span>
    ));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initialize Swiper
    const swiperEl = document.querySelector(".portfolio-swiper");
    if (swiperEl && !swiperRef.current) {
      swiperRef.current = new Swiper(".portfolio-swiper", {
        slidesPerView: 1.6,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        centeredSlides: false,
        navigation: {
          nextEl: ".portfolio-button-next",
          prevEl: ".portfolio-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 1.6,
            spaceBetween: 20,
          },
        },
      });
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      const taglineChars = taglineRef.current?.querySelectorAll(".char");
      const headingChars = headingRef.current?.querySelectorAll(".char");

      // Set initial states
      if (taglineChars && taglineChars.length > 0) {
        gsap.set(taglineChars, {
          opacity: 0,
          y: 20,
        });
      }
      if (headingChars && headingChars.length > 0) {
        gsap.set(headingChars, {
          opacity: 0,
          y: 30,
        });
      }
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, {
          opacity: 0,
          y: 20,
        });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Tagline animation
      if (taglineChars && taglineChars.length > 0) {
        tl.to(
          taglineChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: "power2.out",
          },
          0
        );
      }

      // Heading animation
      if (headingChars && headingChars.length > 0) {
        tl.to(
          headingChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.out",
          },
          0.2
        );
      }

      // Description animation
      if (descriptionRef.current) {
        tl.to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.5
        );
      }

      // CTA button animation
      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.7
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, []);

  return (
    <section className="portfolio-section" ref={sectionRef}>
      <div className="portfolio-container">
        <div className="portfolio-layout">
          {/* Left side: Content */}
          <div className="portfolio-content">
            <div className="portfolio-tagline" ref={taglineRef}>
              {splitTextIntoChars(tagline)}
            </div>

            <h2 className="portfolio-heading" ref={headingRef}>
              {splitTextIntoChars(heading)}
            </h2>

            <p className="portfolio-description" ref={descriptionRef}>
              {description}
            </p>

            <a href={ctaHref} className="portfolio-cta" ref={ctaRef}>
              {ctaText}
            </a>
          </div>

          {/* Right side: Slider */}
          <div className="portfolio-slider-wrapper">
            <div className="portfolio-label">CURRENT PROJECTS</div>

            <div className="swiper portfolio-swiper">
              <div className="swiper-wrapper">
                {projects.map((project) => (
                  <div key={project.id} className="swiper-slide">
                    <div className="portfolio-slide">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="portfolio-slide-image"
                      />
                      <div className="portfolio-slide-overlay"></div>
                      <div className="portfolio-slide-content">
                        <h3 className="portfolio-slide-title">
                          {project.title}
                        </h3>
                        <p className="portfolio-slide-subtitle">
                          {project.subtitle}
                        </p>
                        {project.description && (
                          <p className="portfolio-slide-description">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="portfolio-navigation">
              <button className="portfolio-button-prev" aria-label="Previous">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M15 18l-6-6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="portfolio-button-next" aria-label="Next">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M9 18l6-6-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
