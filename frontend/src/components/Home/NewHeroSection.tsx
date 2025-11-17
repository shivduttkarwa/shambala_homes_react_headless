import React, { useEffect, useRef, useState, Component } from "react";
import gsap from "gsap";
import "./NewHeroSection.css";
import { useNewHero } from "../../hooks/useHome";

import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from "swiper/modules";

// Register Swiper modules
Swiper.use([Navigation, Pagination, Autoplay, EffectCreative]);
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

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
  const swiperRef = useRef<Swiper | null>(null);
  // heading playback tracking removed — hero text will be static
  const [isHeroReady, setIsHeroReady] = useState(false);
  const { heroData } = useNewHero();
  // Fullscreen functionality removed for simplicity

  useEffect(() => {
    // Make sure header is hidden immediately while the hero preloader is active
    document.documentElement.classList.add("hero-preloading");
    // Safety fallback: ensure header is visible again after a short delay even if
    // the preloader hasn't cleared (prevents header staying hidden indefinitely)
    // reduced to 2.5s to improve responsiveness
    const preloaderSafetyTimer = setTimeout(() => {
      try {
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("hero-preloading");
        }
      } catch (e) {}
    }, 2500);
    return () => {
      document.documentElement.classList.remove("hero-preloading");
      clearTimeout(preloaderSafetyTimer);
    };
  }, []);

  useEffect(() => {
    // Skip if no data
    // Skip if no data
    if (!heroData) return;

    let isComponentMounted = true;

    // Fallback: Hide poster after maximum wait time to prevent indefinite loading
    const maxWaitTimer = setTimeout(() => {
      if (isComponentMounted) {
        const poster = document.querySelector(
          "#new-hero-section .video-poster"
        );
        if (poster && (poster as HTMLElement).style.opacity !== "0") {
          (poster as HTMLElement).style.opacity = "0";
        }
        // ensure loader gets removed even if assets take too long
        setIsHeroReady(true);
      }
    }, 2500); // reduced: Give Vimeo more time - 2.5 seconds max

    // Wait for content to be loaded and DOM to be ready
    const initializeSwiper = () => {
      if (!isComponentMounted) return;

      const swiperElement = document.querySelector(
        "#new-hero-section .heroSwiper"
      );

      if (!swiperElement || swiperRef.current) return;

      // Check if we have slides
      const slides = swiperElement.querySelectorAll(".swiper-slide");

      if (slides.length === 0) {
        return;
      }

      try {
        // HERO SWIPER - use specific selector
        swiperRef.current = new Swiper("#new-hero-section .heroSwiper", {
          loop: slides.length > 1, // Only loop if we have multiple slides
          speed: 900,
          effect: "creative",
          creativeEffect: {
            prev: { translate: ["-20%", 0, -1], opacity: 0 },
            next: { translate: ["100%", 0, 0], opacity: 0 },
          },
          navigation: {
            nextEl: "#new-hero-section #rs-next",
            prevEl: "#new-hero-section #rs-prev",
          },
          autoplay:
            heroData?.settings.autoplay_enabled !== false
              ? {
                  delay: heroData?.settings.autoplay_delay || 5000,
                  disableOnInteraction: false,
                }
              : false,
          on: {
            autoplayTimeLeft(swiper, _time, progress) {
              const activeSlide = swiper.slides[
                swiper.activeIndex
              ] as HTMLElement;
              const bar = activeSlide?.querySelector(
                ".slide-progress-fill"
              ) as HTMLElement;
              if (bar) bar.style.width = `${(1 - progress) * 100}%`;
            },
            slideChange() {
              document
                .querySelectorAll("#new-hero-section .slide-progress-fill")
                .forEach((b: Element) => {
                  (b as HTMLElement).style.width = "0%";
                });
            },
            init() {},
          },
        });
      } catch (error) {}
    };

    // Initialize with proper timing - increased delays to ensure DOM is ready
    const swiperTimer = setTimeout(initializeSwiper, 300);

    // Add a class to the root element so we can hide the header/menu while the preloader is active
    document.documentElement.classList.add("hero-preloading");

    return () => {
      isComponentMounted = false;

      // Cleanup timers
      clearTimeout(maxWaitTimer);
      clearTimeout(swiperTimer);

      // Cleanup Swiper
      if (swiperRef.current) {
        try {
          swiperRef.current.destroy(true, true);
          swiperRef.current = null;
        } catch (error) {}
      }
      document.documentElement.classList.remove("hero-preloading");
    };
  }, [heroData]);

  // Track hero background load (image or video) and mark hero ready
  useEffect(() => {
    if (!heroData) return;

    let canceled = false;
    // If there's a video, wait briefly for the iframe or video to trigger readiness
    if (heroData.background.video_url) {
      // Give fallback delays similar to existing handlers (reduced to 1s)
      const timer = setTimeout(() => {
        if (!canceled) setIsHeroReady(true);
      }, 1000);
      return () => {
        canceled = true;
        clearTimeout(timer);
      };
    }

    // If only an image exists, load it via Image() so we get onload
    if (heroData.background.image?.desktop) {
      try {
        // Add a preload hint to the document head to prioritize hero image loading
        const href = heroData.background.image.desktop;
        if (typeof document !== "undefined") {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = href;
          // add a data attribute to be able to remove it later if needed
          link.dataset.preload = "hero-bg";
          document.head.appendChild(link);
        }
      } catch (e) {}
      const img = new Image();
      img.src = heroData.background.image.desktop;
      img.onload = () => {
        if (!canceled) setIsHeroReady(true);
      };
      // fallback in 2 seconds in case of slow networks (reduced)
      const fallback = setTimeout(() => {
        if (!canceled) setIsHeroReady(true);
      }, 2000);
      // remove any preload links on cleanup
      const removePreload = () => {
        try {
          if (typeof document !== "undefined") {
            const existing = document.querySelectorAll(
              "link[data-preload=hero-bg]"
            );
            existing.forEach((l) => l.remove());
          }
        } catch (e) {}
      };
      return () => {
        canceled = true;
        img.onload = null;
        clearTimeout(fallback);
        removePreload();
      };
    }
  }, [heroData]);

  // One-time sequence that runs when hero assets are loaded (preloader -> curtain -> reveal)
  useEffect(() => {
    if (!isHeroReady) return;
    if (!heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // We no longer animate hero heading lines; keep curtain & preloader animations
      gsap.set(".new-hero-section .hero-curtain .left", { xPercent: 0 });
      gsap.set(".new-hero-section .hero-curtain .right", { xPercent: 0 });

      // Curtain opens (slower and smoother)
      tl.to(
        ".new-hero-section .hero-curtain .left",
        { xPercent: -100, duration: 0.9, ease: "power3.inOut" },
        0
      );
      tl.to(
        ".new-hero-section .hero-curtain .right",
        { xPercent: 100, duration: 0.9, ease: "power3.inOut" },
        0
      );

      // Fade preloader out
      // Fade preloader out after curtain has moved most of the way
      tl.to(
        ".new-hero-section .hero-preloader",
        { opacity: 0, duration: 0.35, ease: "power2.out" },
        0.9
      );
      tl.set(".new-hero-section .hero-preloader", { display: "none" }, ">");
      // Ensure the global preloading class is removed when the animation completes
      tl.eventCallback("onComplete", () => {
        try {
          if (typeof document !== "undefined") {
            document.documentElement.classList.remove("hero-preloading");
          }
        } catch (e) {}
      });

      // Fade the dark overlay slightly so hero background becomes visible
      // Fade overlay slightly after the curtain is moving to reveal the background
      tl.to(
        ".new-hero-section .hero-overlay",
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        1.0
      );

      // Modern hero text animation (play after curtain & preloader)
      const heroLines = gsap.utils.toArray(
        ".new-hero-section .hero-text .block"
      ) as HTMLElement[];

      if (heroLines && heroLines.length > 0) {
        // Set initial state: below baseline and slightly skewed for a modern slide
        gsap.set(heroLines, {
          yPercent: 100,
          skewY: 6,
          scale: 0.995,
          transformOrigin: "left center",
        });

        // Add a subtle breathing pop and de-skew; no opacity change to keep text crisp
        tl.to(
          heroLines,
          {
            yPercent: 0,
            skewY: 0,
            scale: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
          },
          ">-0.05"
        );
      }
    }, heroSectionRef);

    return () => {
      ctx.revert();
    };
  }, [isHeroReady]);

  // When hero becomes ready remove the preloading class so header reappears
  useEffect(() => {
    if (isHeroReady) {
      document.documentElement.classList.remove("hero-preloading");
    }
    return () => {
      // nothing to cleanup here
    };
  }, [isHeroReady]);

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

        {/* Preloader + Curtain: shown until hero assets are loaded */}
        <div
          className={`hero-preloader ${isHeroReady ? "is-done" : ""}`}
          aria-hidden={isHeroReady}
        >
          <div className="preloader-inner">
            <div className="preloader-logo">SHAMBALA</div>
            <div className="preloader-bars" aria-hidden>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>

        <div className="hero-curtain" aria-hidden={isHeroReady}>
          <div className="curtain-panel left" />
          <div className="curtain-panel right" />
        </div>

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
                // once iframe loads, hide poster and set hero ready quickly
                setTimeout(() => {
                  const poster = document.querySelector(
                    "#new-hero-section .video-poster"
                  );
                  if (poster) {
                    (poster as HTMLElement).style.opacity = "0";
                    setIsHeroReady(true);
                  }
                }, 300); // short wait for iFrame to spin up
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
                  setIsHeroReady(true);
                }
              }}
            >
              <source src={heroData.background.video_url} type="video/mp4" />
            </video>
          ))}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="hero-text-line-1 block">WE BUILD</span>
              <span className="hero-text-line-2 block">YOUR DREAMS</span>
            </h1>
          </div>

          <div className="hero-bottom">
            <div className="discover-box">
              <a href={heroData?.cta.link || "#contact"} className="cta-link">
                <span
                  className="cta-text"
                  data-text={heroData?.cta.text || "Get a Free Site Visit"}
                >
                  <span>{heroData?.cta.text || "Get a Free Site Visit"}</span>
                </span>
                <span className="arrow">→</span>
              </a>
            </div>

            <div className="slider-container">
              <div className="c-carousel-news_controls">
                <button
                  className="c-button -icon c-carousel_news_button -next"
                  id="rs-next"
                  aria-label="Next"
                >
                  <span className="c-button_inner">
                    <span className="u-screen-reader-text">Next</span>
                    <span className="c-button_icon">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M8 4l8 8-8 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
                <button
                  className="c-button -icon c-carousel_news_button -prev"
                  id="rs-prev"
                  aria-label="Previous"
                >
                  <span className="c-button_inner">
                    <span className="u-screen-reader-text">Previous</span>
                    <span className="c-button_icon">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M16 4L8 12l8 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              <div className="swiper heroSwiper">
                <div className="swiper-wrapper">
                  {heroData?.slides &&
                  heroData.slides.length > 0 &&
                  heroData.slides.some((slide) => slide.image?.desktop) ? (
                    heroData.slides
                      .filter((slide) => slide.image?.desktop)
                      .map((slide) => (
                        <div key={slide.id} className="swiper-slide">
                          <div className="slide-wrapper">
                            <img
                              className="slide-image"
                              src={slide.image.desktop}
                              srcSet={`${slide.image.mobile} 700w, ${slide.image.tablet} 1000w, ${slide.image.desktop} 1200w`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                              alt={slide.image.alt || slide.title}
                              loading="lazy"
                              key={`${slide.id}-${Date.now()}`}
                            />
                            <div className="slide-progress-bar">
                              <div className="slide-progress-fill"></div>
                            </div>
                            <div className="slide-content">
                              <h3 className="slide-title">{slide.title}</h3>
                              {slide.button && (
                                <a
                                  href={slide.button.url}
                                  className="slide-link"
                                  target={
                                    slide.button.is_external
                                      ? "_blank"
                                      : "_self"
                                  }
                                  rel={
                                    slide.button.is_external
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                >
                                  {slide.button.text}{" "}
                                  <span className="arrow">→</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    // Fallback slides if no data
                    <>
                      <div className="swiper-slide">
                        <div className="slide-wrapper">
                          <img
                            className="slide-image"
                            src={`${import.meta.env.BASE_URL}images/1.jpg`}
                            alt="Garden Design"
                            loading="lazy"
                          />
                          <div className="slide-progress-bar">
                            <div className="slide-progress-fill"></div>
                          </div>
                          <div className="slide-content">
                            <h3 className="slide-title">
                              Garden Design & Installation
                            </h3>
                            <a href="#" className="slide-link">
                              Read more <span className="arrow">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="slide-wrapper">
                          <img
                            className="slide-image"
                            src={`${import.meta.env.BASE_URL}images/2.jpg`}
                            alt="Landscaping Project"
                            loading="lazy"
                          />
                          <div className="slide-progress-bar">
                            <div className="slide-progress-fill"></div>
                          </div>
                          <div className="slide-content">
                            <h3 className="slide-title">
                              Outdoor Living Spaces
                            </h3>
                            <a href="#" className="slide-link">
                              Read more <span className="arrow">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="slide-wrapper">
                          <img
                            className="slide-image"
                            src={`${import.meta.env.BASE_URL}images/3.jpg`}
                            alt="Sustainable Landscaping"
                            loading="lazy"
                          />
                          <div className="slide-progress-bar">
                            <div className="slide-progress-fill"></div>
                          </div>
                          <div className="slide-content">
                            <h3 className="slide-title">
                              Sustainable Eco-Friendly Gardens
                            </h3>
                            <a href="#" className="slide-link">
                              Read more <span className="arrow">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
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
