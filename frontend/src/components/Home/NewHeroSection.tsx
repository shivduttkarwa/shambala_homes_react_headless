import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import './NewHeroSection.css';

interface NewHeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  heroImages?: string[];
}

const NewHeroSection: React.FC<NewHeroSectionProps> = ({
  title = "Building Dreams Into Reality",
  subtitle = "Expert craftsmanship meets innovative design for your perfect outdoor sanctuary.",
  ctaText = "Start Your Project",
  ctaLink = "#contact",
  heroImages = [
    "/images/hero.jpg",
    "/images/l1.jpg", 
    "/images/l2.jpg"
  ]
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const timeline = gsap.timeline({
      delay: 0.3,
      ease: "power2.out"
    });

    // Simple, smooth animations - no complex effects
    timeline
      .fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(".hero-image",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.8"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="new-hero" ref={heroRef} id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              {title}
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
              {subtitle}
            </p>
            <a 
              ref={ctaRef}
              href={ctaLink} 
              className="hero-cta"
            >
              {ctaText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          
          <div className="hero-images">
            {heroImages.map((image, index) => (
              <div key={index} className={`hero-image hero-image-${index + 1}`}>
                <img 
                  src={image} 
                  alt={`Landscaping project ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;