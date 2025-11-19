import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ArchScrollReveal.css";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const ArchScrollReveal: React.FC = () => {
  useEffect(() => {
    // Set z-index for images
    document
      .querySelectorAll(".arch__right .arch-img-wrapper")
      .forEach((element) => {
        const order = element.getAttribute("data-index");
        if (order !== null) {
          (element as HTMLElement).style.zIndex = order;
        }
      });

    // Mobile layout handler (only handle order)
    function handleMobileLayout() {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const leftItems = gsap.utils.toArray(".arch__left .arch__info") as Element[];
      const rightItems = gsap.utils.toArray(".arch__right .arch-img-wrapper") as Element[];

      if (isMobile) {
        // Interleave items using order
        leftItems.forEach((item, i) => {
          (item as HTMLElement).style.order = (i * 2).toString();
        });
        rightItems.forEach((item, i) => {
          (item as HTMLElement).style.order = (i * 2 + 1).toString();
        });
      } else {
        // Clear order for desktop
        leftItems.forEach((item) => {
          (item as HTMLElement).style.order = "";
        });
        rightItems.forEach((item) => {
          (item as HTMLElement).style.order = "";
        });
      }
    }

    // Debounce resize for performance
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 100);
    };

    window.addEventListener("resize", handleResize);

    // Run on initial load
    handleMobileLayout();

    const imgs = gsap.utils.toArray(".arch-img-wrapper img") as Element[];
    const bgColors = ["#f9ffe7", "#EDF9FF", "#FFECF2", "#FFE8DB"]; // 4 colors for 4 images

    // GSAP Animation with Media Query - EXACT COPY FROM ORIGINAL
    ScrollTrigger.matchMedia({
      "(min-width: 769px)": function () {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".arch",
            start: "top top",
            end: "bottom bottom",
            pin: ".arch__right",
            scrub: true,
          },
        });

        gsap.set(imgs, {
          clipPath: "inset(0)",
          objectPosition: "0px 0%",
        });

        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(
                ".arch-scroll-section",
                {
                  backgroundColor: bgColors[index],
                  duration: 1.5,
                  ease: "power2.inOut",
                },
                0
              )
              .to(
                currentImage,
                {
                  clipPath: "inset(0px 0px 100%)",
                  objectPosition: "0px 60%",
                  duration: 1.5,
                  ease: "none",
                },
                0
              )
              .to(
                nextImage,
                {
                  objectPosition: "0px 40%",
                  duration: 1.5,
                  ease: "none",
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      },

      "(max-width: 768px)": function () {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: "0px 60%",
        });

        imgs.forEach((image, index) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top-=70% top+=50%",
              end: "bottom+=200% bottom",
              scrub: true,
            },
          });

          innerTimeline
            .to(image, {
              objectPosition: "0px 30%",
              duration: 5,
              ease: "none",
            })
            .to(".arch-scroll-section", {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: "power2.inOut",
            });

          mbTimeline.add(innerTimeline);
        });
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="arch-scroll-section">
      <div className="arch-container">
        <div className="arch-spacer"></div>

        <div className="arch">
          <div className="arch__left">
            <div className="arch__info" id="sustainable-arch">
              <div className="arch-content">
                <h2 className="arch-header">Sustainable Living</h2>
                <p className="arch-desc">
                  Eco-friendly homes designed with renewable energy systems, 
                  smart water management, and sustainable materials that reduce 
                  environmental footprint while maximizing comfort.
                </p>
                <a className="arch-link" href="#" style={{ backgroundColor: 'var(--accent, #5b7c4f)' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="var(--cream, #faf8f3)"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>
                  <span>Explore Green Homes</span>
                </a>
              </div>
            </div>

            <div className="arch__info" id="modern-arch">
              <div className="arch-content">
                <h2 className="arch-header">Modern Architecture</h2>
                <p className="arch-desc">
                  Contemporary designs featuring clean lines, open spaces, and 
                  innovative use of natural light. Our modern homes blend 
                  functionality with aesthetic appeal for the discerning homeowner.
                </p>
                <a className="arch-link" href="#" style={{ backgroundColor: '#4a6b3e' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="var(--cream, #faf8f3)"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>
                  <span>View Designs</span>
                </a>
              </div>
            </div>

            <div className="arch__info" id="luxury-arch">
              <div className="arch-content">
                <h2 className="arch-header">Luxury Interiors</h2>
                <p className="arch-desc">
                  Premium finishes and bespoke interior design solutions that 
                  reflect your personal style. From custom millwork to curated 
                  furnishings, every detail is crafted to perfection.
                </p>
                <a className="arch-link" href="#" style={{ backgroundColor: '#d4462a' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="var(--cream, #faf8f3)"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>
                  <span>Interior Gallery</span>
                </a>
              </div>
            </div>

            <div className="arch__info" id="smart-arch">
              <div className="arch-content">
                <h2 className="arch-header">Smart Home Technology</h2>
                <p className="arch-desc">
                  Integrated home automation systems that enhance security, 
                  energy efficiency, and convenience. Control lighting, climate, 
                  and entertainment systems seamlessly from anywhere.
                </p>
                <a className="arch-link" href="#" style={{ backgroundColor: '#f4a845' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="none"
                  >
                    <path
                      fill="var(--text, #2c2c2c)"
                      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                    />
                  </svg>
                  <span>Tech Features</span>
                </a>
              </div>
            </div>
          </div>

          <div className="arch__right">
            <div className="arch-img-wrapper" data-index="4">
              <img
                src={`${publicUrl}images/hero_poster.jpg`}
                alt="Sustainable Living"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/sm1.jpg`;
                }}
              />
            </div>

            <div className="arch-img-wrapper" data-index="3">
              <img
                src={`${publicUrl}images/sm2.jpg`}
                alt="Modern Architecture"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/sm1.jpg`;
                }}
              />
            </div>

            <div className="arch-img-wrapper" data-index="2">
              <img
                src={`${publicUrl}images/sm3.jpg`}
                alt="Luxury Interiors"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/sm1.jpg`;
                }}
              />
            </div>

            <div className="arch-img-wrapper" data-index="1">
              <img
                src={`${publicUrl}images/sm4.jpg`}
                alt="Smart Home Technology"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${publicUrl}images/sm1.jpg`;
                }}
              />
            </div>
          </div>
        </div>

        <div className="arch-spacer"></div>
      </div>
    </section>
  );
};

export default ArchScrollReveal;