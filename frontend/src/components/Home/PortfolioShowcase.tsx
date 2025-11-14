import React, { useEffect } from "react";

interface Project {
  id: string;
  title: string;
  tags: string[];
  backgroundImage: string;
  previewImage: string;
  link: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Blueberry Hill ADU",
    tags: ["ADU", "Sleeping Loft", "1 Bath", "<500 Sqft"],
    backgroundImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    previewImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    link: "#",
  },
  {
    id: "2",
    title: "Break House",
    tags: ["Big Bar", "2 Bed", "3 Bath", "1,000-1,500 Sqft", "Hybrid Home"],
    backgroundImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80",
    previewImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    link: "#",
  },
  {
    id: "3",
    title: "Mountain View Meadow",
    tags: [
      "Big L",
      "3 Bed",
      "2.5 Bath",
      "1,500-2,000 Sqft",
      "Investment Property",
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
    previewImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    link: "#",
  },
];

const PortfolioShowcase: React.FC = () => {
  useEffect(() => {
    // Ensure body can scroll
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    return () => {
      // Cleanup if needed
    };
  }, []);
  return (
    <section className="project-feature">
      <style>{`
       :root {
          --grid-column-count: 12;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #0c310a;
        }
       

        #root {
          width: 100%;
          min-height: 100vh;
        }

        .hidden {
          display: none !important;
        }

        .noscroll {
          overflow: hidden;
        }

        section.project-feature {
          z-index: 0;
          padding-top: clamp(3rem, 3.38028vw + 2.20775rem, 5.25rem);
          padding-bottom: clamp(3rem, 3.38028vw + 2.20775rem, 5.25rem);
          position: relative;
          width: 100%;
          overflow: visible;
        }

        section.project-feature div.block-text {
          width: calc(
            (
                100vw -
                  (
                    clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem) * 2 +
                      clamp(1rem, 0.751174vw + 0.823944rem, 1.5rem) *
                      (var(--grid-column-count) - 1)
                  )
              ) / var(--grid-column-count) * 8 +
              clamp(1rem, 0.751174vw + 0.823944rem, 1.5rem) * 7 +
              clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem) * 0
          );
          text-align: center;
          margin-bottom: clamp(2rem, 2.25352vw + 1.47183rem, 3.5rem);
          margin-left: auto;
          margin-right: auto;
        }

        section.project-feature div.block-text h3 {
          color: #fffdf6;
          font-size: clamp(1.5rem, 2vw, 2.5rem);
          font-weight: 500;
        }

        section.project-feature div.projects-wrapper a.project {
          height: 100vh;
          min-height: 600px;
          display: block;
          position: relative;
          overflow: clip;
          text-decoration: none;
        }

        section.project-feature div.projects-wrapper a.project figure {
          width: 100%;
          height: 100%;
        }

        section.project-feature div.projects-wrapper a.project figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        section.project-feature div.projects-wrapper a.project div.content {
          z-index: 2;
          height: 300vh;
          position: absolute;
          top: -100vh;
          left: 0;
          right: 0;
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky {
          height: 100vh;
          padding: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
          justify-content: space-between;
          align-items: center;
          display: flex;
          position: sticky;
          top: 0;
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.info-wrapper {
          width: calc(
            (
                100vw -
                  (
                    clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem) * 2 +
                      clamp(1rem, 0.751174vw + 0.823944rem, 1.5rem) *
                      (var(--grid-column-count) - 1)
                  )
              ) / var(--grid-column-count) * 5 +
              clamp(1rem, 0.751174vw + 0.823944rem, 1.5rem) * 4 +
              clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem) * 0
          );
          flex-direction: column;
          row-gap: 1.5rem;
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.info-wrapper
          h2 {
          text-wrap: balance;
          color: #fffdf6;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 600;
          margin: 0;
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.info-wrapper
          div.tag-wrapper {
          flex-flow: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 0.5rem;
          display: flex;
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.info-wrapper
          div.tag-wrapper
          span.tag {
          display: block;
          padding: 0.5rem 1rem;
          background: rgba(255, 253, 246, 0.2);
          color: #fffdf6;
          border-radius: 20px;
          font-size: 0.875rem;
          backdrop-filter: blur(10px);
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.image-wrapper {
          width: calc(
            (
                100vw -
                  (
                    clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem) * 2 +
                      clamp(1rem, 0.751174vw + 0.823944rem, 1.5rem) *
                      (var(--grid-column-count) - 1)
                  )
              ) / var(--grid-column-count) * 5 +
              clamp(1rem, 0.751174vw + 0.823944rem, 1.5rem) * 4 +
              clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem) * 0
          );
          aspect-ratio: 16/9;
          border-radius: 16px;
          flex-shrink: 0;
          overflow: clip;
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.image-wrapper
          figure {
          width: 100%;
          height: 100%;
          margin: 0;
        }

        section.project-feature
          div.projects-wrapper
          a.project
          div.content
          div.sticky
          div.image-wrapper
          figure
          img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        section.project-feature div.projects-wrapper :first-child div.content {
          top: 0 !important;
        }

        section.project-feature div.projects-wrapper :first-child div.content,
        section.project-feature div.projects-wrapper :last-child div.content {
          height: 200vh !important;
        }

        section.project-feature div.cta-wrapper {
          padding-left: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
          padding-right: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
          justify-content: center;
          margin-top: 2.5rem;
          display: flex;
        }

        .button {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: #fffdf6;
          color: #0c310a;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 500;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .button:hover {
          transform: scale(1.05);
        }

        @media not (min-width: 58.75rem) {
          section.project-feature div.block-text {
            width: 100%;
            padding-left: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
            padding-right: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
          }

          section.project-feature div.projects-wrapper a.project div.content {
            top: 0;
          }

          section.project-feature
            div.projects-wrapper
            a.project
            div.content
            div.sticky {
            padding-left: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
            padding-right: clamp(1.5rem, 3.75587vw + 0.619718rem, 4rem);
            flex-direction: column;
            align-items: start;
            padding-top: 7rem;
            padding-bottom: 3.5rem;
            position: static;
          }

          section.project-feature
            div.projects-wrapper
            a.project
            div.content
            div.sticky
            div.info-wrapper {
            width: 100%;
          }

          section.project-feature
            div.projects-wrapper
            a.project
            div.content
            div.sticky
            div.image-wrapper {
            width: 100%;
            max-height: 33vh;
          }
        }
      `}</style>

      <div className="block-text">
        <div className="block-text-col">
          <h3>...and we work with you to make it yours.</h3>
        </div>
      </div>

      <div className="projects-wrapper">
        {projects.map((project) => (
          <a href={project.link} className="project" key={project.id}>
            <figure>
              <img
                src={project.backgroundImage}
                alt={`${project.title} Background`}
              />
            </figure>
            <div className="content">
              <div className="sticky">
                <div className="info-wrapper">
                  <h2>{project.title}</h2>
                  <div className="tag-wrapper">
                    {project.tags.map((tag, index) => (
                      <span className="tag" key={index}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="image-wrapper">
                  <figure>
                    <img
                      src={project.previewImage}
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
        <a href="#" className="button">
          <span>See More Projects</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
