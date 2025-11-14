import React, { useEffect, useRef } from "react";
import "./PortfolioShowcase.css";

const projects = [
  {
    title: "Blueberry Hill ADU",
    bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    thumb:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    tags: ["ADU", "Sleeping Loft", "1 Bath", "<500 Sqft"],
  },
  {
    title: "Break House",
    bg: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80",
    thumb:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    tags: ["Big Bar", "2 Bed", "3 Bath", "1,000-1,500 Sqft", "Hybrid Home"],
  },
  {
    title: "Mountain View Meadow",
    bg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    thumb:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    tags: [
      "Big L",
      "3 Bed",
      "2.5 Bath",
      "1,500-2,000 Sqft",
      "Investment Property",
    ],
  },
];

const PortfolioShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const featureSection = sectionRef.current;
    if (!featureSection) return;

    const parallaxImages = featureSection.querySelectorAll<HTMLImageElement>(
      ".project > figure > img[data-speed]"
    );

    if (!parallaxImages.length) return;

    const handleParallax = () => {
      const viewportHeight = window.innerHeight;

      parallaxImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imgCenter = rect.top + rect.height / 2;
        const distanceFromCenter = imgCenter - viewportHeight / 2;

        const speedAttr = img.getAttribute("data-speed");
        const speed = speedAttr ? parseFloat(speedAttr) : 0.8;

        const translateY = (-distanceFromCenter / viewportHeight) * 100 * speed;

        img.style.transform = `translate3d(0, ${translateY}%, 0) scale(1.2)`;
      });
    };

    // initial run
    handleParallax();

    window.addEventListener("scroll", handleParallax);
    window.addEventListener("resize", handleParallax);

    return () => {
      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("resize", handleParallax);
    };
  }, []);

  return (
    <section className="project-feature" ref={sectionRef}>
      <div className="block-text">
        <div className="block-text-col">
          <h3>...and we work with you to make it yours.</h3>
        </div>
      </div>

      <div className="projects-wrapper">
        {projects.map((project, index) => (
          <a href="#" className="project" key={project.title}>
            <figure>
              <img
                src={project.bg}
                alt={`${project.title} Background`}
                data-speed="0.8"
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
        <a href="#" className="pf-button">
          <span>See More Projects</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
