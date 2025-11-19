import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css";
import GlassButton from "../UI/GlassButton";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
  ctaText?: string;
  ctaLink?: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  services?: ServiceCard[];
}

const defaultServices: ServiceCard[] = [
  {
    id: "1",
    title: "New Home Construction",
    description:
      "From concept to completion, we build bespoke homes tailored to your lifestyle and vision.",
    imageSrc: `${publicUrl}images/sm1.jpg`,
    alt: "New Home Construction",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "2",
    title: "Complete Renovations",
    description:
      "Transform your existing home with our comprehensive renovation and remodeling services.",
    imageSrc: `${publicUrl}images/sm2.jpg`,
    alt: "Home Renovations",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "3",
    title: "Extensions & Upgrades",
    description:
      "Expand your living space with expertly designed extensions that blend seamlessly with your home.",
    imageSrc: `${publicUrl}images/sm3.jpg`,
    alt: "Home Extensions",
    ctaText: "Learn More",
    ctaLink: "#",
  },
  {
    id: "4",
    title: "Downsizing Solutions",
    description:
      "Thoughtful designs that maximize comfort and functionality in smaller, more efficient spaces.",
    imageSrc: `${publicUrl}images/sm4.jpg`,
    alt: "Downsizing Solutions",
    ctaText: "Learn More",
    ctaLink: "#",
  },
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "BUILDING EXCELLENCE ACROSS AUSTRALIA",
  subtitle = "",
  description = "Shambala Homes delivers comprehensive construction services from new home builds to complete renovations. With decades of experience and unwavering commitment to quality, we transform architectural visions into lasting realities.",
  ctaText = "View All Services",
  ctaLink = "#",
  services = defaultServices,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Get all cards
      const cards = gsap.utils.toArray(".service-card");

      // Set initial state for all cards
      gsap.set(cards, {
        opacity: 0,
        x: 150,
        y: 100,
        rotation: -16,
        transformOrigin: "center center",
      });

      // Animate each card on scroll with stagger
      cards.forEach((card, index) => {
        gsap.to(card as gsap.TweenTarget, {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: card as gsap.DOMTarget,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        });
      });

      // Parallax effect on images
      cards.forEach((card) => {
        const img = (card as Element).querySelector(".service-card-image");
        if (img) {
          gsap.to(img, {
            yPercent: -1,
            ease: "linear",
            scrollTrigger: {
              trigger: card as gsap.DOMTarget,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // Fade in content elements on desktop only
      if (window.innerWidth > 1024) {
        gsap.from(".services-title", {
          scrollTrigger: {
            trigger: ".services-content",
            start: "top 70%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "linear",
        });

        gsap.from(".services-description", {
          scrollTrigger: {
            trigger: ".services-content",
            start: "top 70%",
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.4,
          ease: "linear",
        });

        // Button animation - simple fade in
        gsap.from(".services-content .home-benefits-cta", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          delay: 0.6,
          ease: "linear",
          scrollTrigger: {
            trigger: ".services-content",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-layout">
          {/* Left side - Service Cards */}
          <div className="services-cards">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                data-card={service.id}
              >
                <img
                  src={service.imageSrc}
                  alt={service.alt}
                  className="service-card-image"
                />
                <div className="service-overlay">
                  <div>
                    <div className="service-title">{service.title}</div>
                    <div className="service-description">
                      {service.description}
                    </div>
                  </div>
                  <GlassButton href={service.ctaLink || "#"}>
                    {service.ctaText || "Learn More"}
                  </GlassButton>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky Content */}
          <div className="services-content">
            <h2 className="services-title">
              {title}
              <br />
              {subtitle}
            </h2>
            <p className="services-description">{description}</p>
            <GlassButton href={ctaLink}>{ctaText}</GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
