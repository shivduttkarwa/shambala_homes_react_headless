import React, { useEffect, useRef } from "react";
import "./PortfolioShowcase.css";

const projects = [
  {
    title: "Modern Zen Retreat",
    bg: "/shambala_homes/images/project1.jpg",
    thumb: "/shambala_homes/images/2.jpg",
    tags: ["3 Bed", "2 Bath", "1,800 Sqft", "Garden View"],
  },
  {
    title: "Luxury Villa Estate",
    bg: "/shambala_homes/images/project2.jpg",
    thumb: "/shambala_homes/images/11.jpg",
    tags: ["4 Bed", "3.5 Bath", "2,500 Sqft", "Pool", "Premium"],
  },
  {
    title: "Cozy Family Home",
    bg: "/shambala_homes/images/project3.jpg",
    thumb: "/shambala_homes/images/3.jpg",
    tags: ["2 Bed", "2 Bath", "1,200 Sqft", "Family Friendly", "Affordable"],
  },
];

const PortfolioShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const featureSection = sectionRef.current;
    if (!featureSection) return;

    // Add class to body to allow overflow for sticky behavior
    document.body.classList.add("portfolio-active");

    // PARALLAX – fully scoped to .project-feature
    const parallaxImages = featureSection.querySelectorAll<HTMLImageElement>(
      ".project > figure > img[data-speed]"
    );

    function handleParallax() {
      if (!parallaxImages.length) return;

      const viewportHeight = window.innerHeight;

      parallaxImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imgCenter = rect.top + rect.height / 2;
        const distanceFromCenter = imgCenter - viewportHeight / 2;

        const speed = parseFloat(img.dataset.speed || "0.8");

        const translateY = (-distanceFromCenter / viewportHeight) * 100 * speed;

        img.style.transform = `translate3d(0, ${translateY}%, 0) scale(1.2)`;
      });
    }

    window.addEventListener("scroll", handleParallax);
    window.addEventListener("load", handleParallax);
    window.addEventListener("resize", handleParallax);

    // Initial run
    handleParallax();

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
          <h3>Discover Your Dream Home</h3>
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
