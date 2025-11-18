import React, { useEffect, useRef } from "react";
import "./PortfolioShowcase.css";
import GlassButton from "../UI/GlassButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Modern Zen Retreat",
    bg: `${publicUrl}images/prs1.jpg`,
    thumb: `${publicUrl}images/port1.jpg`,
    tags: ["3 Bed", "2 Bath", "1,800 Sqft", "Garden View"],
  },
  {
    title: "Luxury Villa Estate",
    bg: `${publicUrl}images/l8.jpg`,
    thumb: `${publicUrl}images/port2.jpg`,
    tags: ["4 Bed", "3.5 Bath", "2,500 Sqft", "Pool", "Premium"],
  },
  {
    title: "Cozy Family Home",
    bg: `${publicUrl}images/port2.jpg`,
    thumb: `${publicUrl}images/project2.jpg`,
    tags: ["2 Bed", "2 Bath", "1,200 Sqft", "Family Friendly", "Affordable"],
  },
];

const PortfolioShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

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
    const featureSection = sectionRef.current;
    if (!featureSection) return;

    // Add class to body to allow overflow for sticky behavior
    document.body.classList.add("portfolio-active");

    // PARALLAX – fully scoped to .project-feature
    const parallaxImages = featureSection.querySelectorAll<HTMLImageElement>(
      ".project > figure > img[data-speed]"
    );

    // Performance optimization variables
    let ticking = false;
    let lastScrollY = 0;
    const _isMobile = window.innerWidth < 940;

    function handleParallax() {
      if (!parallaxImages.length) return;

      const currentScrollY = window.scrollY;

      // Skip if scroll change is minimal (reduces calculations)
      if (Math.abs(currentScrollY - lastScrollY) < 2) return;
      lastScrollY = currentScrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight;

          parallaxImages.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const imgCenter = rect.top + rect.height / 2;
            const distanceFromCenter = imgCenter - viewportHeight / 2;

            const speed = parseFloat(img.dataset.speed || "0.25");

            // Convert distance to a translate percentage for smoother feeling
            const translateY =
              (-distanceFromCenter / viewportHeight) * 100 * speed;

            // Use hardware acceleration
            img.style.transform = `translate3d(0, ${translateY}%, 0) scale(1.05)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    }

    // Use passive listeners for better scroll performance
    window.addEventListener("scroll", handleParallax, { passive: true });
    window.addEventListener("load", handleParallax);
    window.addEventListener("resize", handleParallax);

    // Initial run
    handleParallax();

    // Animate title
    const titleLines = titleRef.current?.querySelectorAll(".line");
    if (titleLines && titleLines.length > 0) {
      gsap.set(titleLines, { yPercent: 100 });
      gsap.to(titleLines, {
        yPercent: 0,
        duration: 1.8,
        stagger: 0.8,
        ease: "power1.out",
        scrollTrigger: {
          trigger: featureSection,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      // Remove class from body
      document.body.classList.remove("portfolio-active");

      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("load", handleParallax);
      window.removeEventListener("resize", handleParallax);
    };
  }, []);

  return (
    <section className="project-feature" ref={sectionRef}>
      <div className="block-text">
        <div className="block-text-col">
          <h3 ref={titleRef}>{splitTextIntoLines("OUR LATEST PROJECTS")}</h3>
        </div>
      </div>

      <div className="projects-wrapper">
        {projects.map((project) => (
          <a href="#" className="project" key={project.title}>
            <figure>
              <img
                src={project.bg}
                alt={`${project.title} Background`}
                data-speed="0.25"
              />
            </figure>
            <div className="content">
              <div className="sticky">
                <div className="info-wrapper">
                  <h2>{project.title}</h2>
                  <div className="tag-wrapper">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="image-wrapper">
                  <figure>
                    <img
                      src={project.thumb}
                      alt={`${project.title} Interior`}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="cta-wrapper">
        <GlassButton href="#">See More Projects</GlassButton>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
