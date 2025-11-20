import React, { useEffect, useRef, useState, Component } from "react";
import gsap from "gsap";
import "./NewHeroSection.css";
import { useNewHero } from "../../hooks/useHome";
import GlassRainButton from "../UI/GlassRainButton";

const publicUrl = import.meta.env.BASE_URL;

// Error Boundary Component
class HeroErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <section className="hero-section">
          <div>Error loading hero content</div>
        </section>
      );
    }

    return this.props.children;
  }
}

const NewHeroSectionContent: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const { heroData } = useNewHero();

  // Split text into lines with mask - manual split for hero
  const splitTextIntoLines = (lines: string[]) => {
    return lines.map((line, index) => (
      <div key={index} className="mask">
        <div className="line">{line}</div>
      </div>
    ));
  };

  // Hero text animation
  useEffect(() => {
    if (!heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero text animation - starts after preloader is done
      const headingLines = heroHeadingRef.current?.querySelectorAll(".line");
      if (headingLines && headingLines.length > 0) {
        gsap.set(headingLines, { yPercent: 100 });

        // Wait for preloader to complete (3 seconds) then animate
        gsap.to(headingLines, {
          yPercent: 0,
          duration: 1.8,
          stagger: 0.8,
          ease: "power1.out",
          delay: 3.5, // Wait for preloader to finish
        });
      }
    }, heroSectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={heroSectionRef}
        className="hero-section new-hero-section"
        id="new-hero-section"
      >
        {/* Poster image - static image that shows while video loads */}
        <div
          className="image-background video-poster"
          style={{
            backgroundImage: `url(${publicUrl}images/hero_poster.jpg)`,
          }}
        />

        {/* Video - loads over the poster image */}
        {heroData?.background.video_url &&
          (heroData.background.video_url.includes("vimeo.com") ? (
            <iframe
              className="video-background vimeo-iframe"
              style={{
                backgroundColor: "transparent",
              }}
              src={`https://player.vimeo.com/video/${
                heroData.background.video_url.match(/vimeo\.com\/(\d+)/)?.[1]
              }?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&dnt=1&quality=540p&autopause=0&playsinline=1&transparent=0`}
              allow="autoplay; fullscreen"
              loading="eager"
              title="Hero Background Video"
              onLoad={() => {
                // Keep poster visible for 2-3 seconds before showing video
                setTimeout(() => {
                  const poster = document.querySelector(
                    "#new-hero-section .video-poster"
                  );
                  if (poster) {
                    (poster as HTMLElement).style.opacity = "0";
                  }
                }, 2500); // 2.5 seconds delay
              }}
            />
          ) : (
            <video
              className="video-background"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              preload="auto"
              onCanPlay={() => {
                // Keep poster visible for 2-3 seconds before showing video
                setTimeout(() => {
                  const poster = document.querySelector(
                    "#new-hero-section .video-poster"
                  );
                  if (poster) {
                    (poster as HTMLElement).style.opacity = "0";
                  }
                }, 2500); // 2.5 seconds delay
              }}
            >
              <source src={heroData.background.video_url} type="video/mp4" />
            </video>
          ))}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={heroHeadingRef}>
              {splitTextIntoLines(["WE BUILD", "YOUR DREAMS"])}
            </h1>
          </div>

          <div className="hero-cta">
            <GlassRainButton href={heroData?.cta.link || "#contact"}>
              {heroData?.cta.text || "Get a Free Site Visit"}
            </GlassRainButton>
          </div>
        </div>
      </section>
    </>
  );
};

const NewHeroSection: React.FC = () => {
  return (
    <HeroErrorBoundary>
      <NewHeroSectionContent />
    </HeroErrorBoundary>
  );
};

export default NewHeroSection;
