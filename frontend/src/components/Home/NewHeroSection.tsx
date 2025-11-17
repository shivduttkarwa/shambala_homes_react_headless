import React, { useEffect, useRef, useState, Component } from "react";
import gsap from "gsap";
import "./NewHeroSection.css";
import { useNewHero } from "../../hooks/useHome";
import GlassButton from "../UI/GlassButton";


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
      // Hero text animation - elegant line-by-line reveal
      const headingLines = heroHeadingRef.current?.querySelectorAll(".line");
      if (headingLines && headingLines.length > 0) {
        gsap.set(headingLines, { yPercent: 100 });
        gsap.to(
          headingLines,
          {
            yPercent: 0,
            duration: 1.8,
            stagger: 0.8,
            ease: "power1.out",
            delay: 0.5
          }
        );
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
        {/* Poster image - always show if available, serves as fallback/loading state */}
        {heroData?.background.image && (
          <div
            className={`image-background ${
              heroData?.background.video_url ? "video-poster" : ""
            }`}
            style={{
              backgroundImage: `url(${heroData.background.image.desktop})`,
            }}
          />
        )}


        {/* Video - loads over the poster image */}
        {heroData?.background.video_url &&
          (heroData.background.video_url.includes("vimeo.com") ? (
            <iframe
              className="video-background vimeo-iframe"
              style={{
                backgroundColor: heroData?.background.image?.desktop
                  ? "transparent"
                  : "#1a1a1a",
              }}
              src={`https://player.vimeo.com/video/${
                heroData.background.video_url.match(/vimeo\.com\/(\d+)/)?.[1]
              }?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&dnt=1&quality=540p&autopause=0&playsinline=1&transparent=0`}
              allow="autoplay; fullscreen"
              loading="eager"
              title="Hero Background Video"
onLoad={() => {
                // once iframe loads, hide poster
                setTimeout(() => {
                  const poster = document.querySelector(
                    "#new-hero-section .video-poster"
                  );
                  if (poster) {
                    (poster as HTMLElement).style.opacity = "0";
                  }
                }, 300);
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
                // Hide poster immediately when MP4 video can play
                const poster = document.querySelector(
                  "#new-hero-section .video-poster"
                );
                if (poster) {
                  (poster as HTMLElement).style.opacity = "0";
                }
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
            <GlassButton 
              href={heroData?.cta.link || "#contact"}
            >
              {heroData?.cta.text || "Get a Free Site Visit"}
            </GlassButton>
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
