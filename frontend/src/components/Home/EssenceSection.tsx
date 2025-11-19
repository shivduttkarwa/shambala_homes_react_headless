import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EssenceSection.css";
import GlassButton from "../UI/GlassButton";
import FallingTextVideoComponent from "../UI/FallingTextVideoComponent";

gsap.registerPlugin(ScrollTrigger);

interface EssenceSectionProps {
  logo?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: {
    src: string;
    desktop?: string;
    tablet?: string;
    mobile?: string;
    alt: string;
  };
  videoUrl?: string;
}

const publicUrl = import.meta.env.BASE_URL;

const EssenceSection: React.FC<EssenceSectionProps> = ({
  logo,
  tagline: _tagline = "WHY SHAMBALA HOMES?",
  heading = "WE SHAPE THE ESSENCE OF LIVING",
  description = "We envision spaces that are not just lived in, but felt — where every element has been curated to inspire connection, serenity, and belonging.",
  ctaText = "VIEW OUR DESIGNS",
  ctaHref = "#house-designs",
  image = {
    src: `${publicUrl}images/ess.jpg`,
    alt: "Modern architectural design",
  },
  videoUrl = `${publicUrl}images/hero1.mp4`,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);

  // Split text into characters for tagline
  const _splitTextIntoChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char">
        {char}
      </span>
    ));
  };

  // Split text into lines with mask
  const splitTextIntoLines = (text: string) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      if (testLine.length > 30 && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.map((line, index) => (
      <div key={index} className="mask">
        <div className="line">{line}</div>
      </div>
    ));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const taglineChars = taglineRef.current?.querySelectorAll(".char");
      const headingLines = headingRef.current?.querySelectorAll(".line");

      // Set initial states (prevents layout shift)
      if (taglineChars && taglineChars.length > 0) {
        gsap.set(taglineChars, {
          opacity: 0,
          y: 20,
        });
      }
      if (headingLines && headingLines.length > 0) {
        gsap.set(headingLines, {
          yPercent: 100,
        });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      // Single timeline for all animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Tagline chars - simple fade up
      if (taglineChars && taglineChars.length > 0) {
        tl.to(
          taglineChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.out",
          },
          0
        );
      }

      // Heading lines - slide up
      if (headingLines && headingLines.length > 0) {
        tl.to(
          headingLines,
          {
            yPercent: 0,
            duration: 1.8,
            stagger: 0.8,
            ease: "power1.out",
          },
          0.2
        );
      }

      // CTA button
      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.6
        );
      }

      // Image reveal - separate ScrollTrigger
      if (imageOverlayRef.current) {
        gsap.to(imageOverlayRef.current, {
          scaleX: 0,
          duration: 2.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageOverlayRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section className="essence-section" ref={sectionRef}>
      {/* Main Content Section */}
      <div className="essence-container">
        <div className="essence-layout">
          {/* Left side: Content with beige background */}
          <div className="essence-content">
            {logo && (
              <div className="essence-logo">
                <img src={logo} alt="Logo" />
              </div>
            )}

            <h2 className="essence-heading" ref={headingRef}>
              {splitTextIntoLines(heading)}
            </h2>

            <p className="essence-description">{description}</p>

            <div ref={ctaRef} className="essence-cta-desktop">
              <GlassButton href={ctaHref}>{ctaText}</GlassButton>
            </div>
          </div>

          {/* Right side: Large image */}
          <div className="essence-image">
            <img
              src={image.src}
              srcSet={
                image.mobile && image.tablet && image.desktop
                  ? `${image.mobile} 700w, ${image.tablet} 1000w, ${image.desktop} 1200w`
                  : undefined
              }
              sizes={
                image.mobile && image.tablet && image.desktop
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  : undefined
              }
              alt={image.alt}
              className="essence-img"
            />
            {/* Image reveal overlay */}
            <div className="essence-image-overlay" ref={imageOverlayRef}></div>
          </div>

          {/* Mobile CTA - only visible on mobile after image */}
          <div className="essence-cta-mobile">
            <GlassButton href={ctaHref}>{ctaText}</GlassButton>
          </div>
        </div>
      </div>

      {/* Video Text Animation Section */}
      {videoUrl && (
        <FallingTextVideoComponent
          leftText="SERVICES"
          rightText="PROJETS"
          videoSrc={videoUrl}
          backgroundColor="var(--light-bg)"
          bottomLeftText="Design"
          bottomRightText="purpose"
        />
      )}
    </section>
  );
};

export default EssenceSection;
