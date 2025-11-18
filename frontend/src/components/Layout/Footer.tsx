import React, { useRef, useEffect } from "react";
import "./Footer.css";
import { SiteSettings } from "../../services/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  settings: SiteSettings | null;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const publicUrl = import.meta.env.BASE_URL;
  const footerRef = useRef<HTMLElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);

  // Footer animations
  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate top section elements - only if in viewport
      const topSection = topSectionRef.current;
      if (topSection) {
        const brandBox = topSection.querySelector(".footer-brand-box");
        const connectSection = topSection.querySelector(".footer-connect");
        const linksSection = topSection.querySelector(".footer-links-section");
        const contactSection = topSection.querySelector(
          ".footer-contact-section"
        );

        // Ensure elements are visible by default, animate only when scrolling into view
        gsap.set([brandBox, connectSection, linksSection, contactSection], {
          opacity: 1,
          y: 0,
        });

        gsap.from([brandBox, connectSection, linksSection, contactSection], {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: topSection,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        // Animate individual links within sections
        const allLinks = topSection.querySelectorAll(
          ".footer-link, .social-link, .footer-contact-item"
        );

        gsap.set(allLinks, { opacity: 1, x: 0 });

        gsap.from(allLinks, {
          x: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: topSection,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      // Large brand text animation
      const letters = brandTextRef.current?.querySelectorAll(".footer-letter");
      if (letters && letters.length > 0) {
        gsap.set(letters, { yPercent: 0 });

        gsap.from(letters, {
          yPercent: 100,
          duration: 1.8,
          stagger: 0.1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: brandTextRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-top-section" ref={topSectionRef}>
          {/* Brand Box */}
          <div className="footer-brand-box">
            <div className="footer-brand-circle">
              <div className="footer-brand-inner">
                <h2 className="footer-brand-title">Shambala</h2>
                <p className="footer-brand-subtitle">HOMES</p>
              </div>
            </div>
            <p className="footer-brand-description">
              Creating architectural masterpieces that blend vision with
              craftsmanship, transforming dreams into extraordinary living
              spaces across Australia.
            </p>
          </div>

          {/* Connect Section */}
          <div className="footer-connect">
            <h3 className="footer-section-title">Connect</h3>
            <div className="footer-social-grid">
              {settings?.social?.instagram && (
                <a
                  href={settings.social.instagram}
                  className="social-link social-instagram"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span>Instagram</span>
                </a>
              )}
              {settings?.social?.facebook && (
                <a
                  href={settings.social.facebook}
                  className="social-link social-facebook"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span>Facebook</span>
                </a>
              )}
              {settings?.social?.linkedin && (
                <a
                  href={settings.social.linkedin}
                  className="social-link social-linkedin"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span>LinkedIn</span>
                </a>
              )}
              {settings?.social?.youtube && (
                <a
                  href={settings.social.youtube}
                  className="social-link social-youtube"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-section">
            <h3 className="footer-section-title">Explore</h3>
            <div className="footer-links">
              <a href={`${publicUrl}/portfolio`} className="footer-link">
                <span className="link-arrow">→</span>
                Portfolio
              </a>
              <a href={`${publicUrl}/services`} className="footer-link">
                <span className="link-arrow">→</span>
                Services
              </a>
              <a href={`${publicUrl}/about`} className="footer-link">
                <span className="link-arrow">→</span>
                Studio
              </a>
              <a href={`${publicUrl}/blog`} className="footer-link">
                <span className="link-arrow">→</span>
                Blog
              </a>
              <a href={`${publicUrl}/contact`} className="footer-link">
                <span className="link-arrow">→</span>
                Inquire
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-contact-section">
            <h3 className="footer-section-title">Get in Touch</h3>
            <div className="footer-contact-info">
              <div className="contact-item">
                <div className="contact-label">Visit Us</div>
                {settings?.contact?.address ? (
                  <div
                    className="footer-contact-item"
                    dangerouslySetInnerHTML={{
                      __html: settings.contact.address.replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <div className="footer-contact-item">
                    123 Garden Street
                    <br />
                    Melbourne, VIC 3000
                  </div>
                )}
              </div>

              <div className="contact-item">
                <div className="contact-label">Call Us</div>
                <a
                  href={`tel:${settings?.contact?.phone || "+61312345678"}`}
                  className="footer-contact-item"
                >
                  {settings?.contact?.phone || "+61 3 1234 5678"}
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-label">Email Us</div>
                <a
                  href={`mailto:${
                    settings?.contact?.email || "info@shambalahomes.com"
                  }`}
                  className="footer-contact-item"
                >
                  {settings?.contact?.email?.toUpperCase() ||
                    "INFO@SHAMBALAHOMES.COM"}
                </a>
              </div>
            </div>

            <div className="footer-legal">
              <a
                href={`${publicUrl}/privacy`}
                className="footer-link legal-link"
              >
                Privacy Policy
              </a>
              <span className="footer-copyright">
                © 2025 Shambala Homes. All rights reserved.
              </span>
              <p className="footer-developer-credit-inline">
                Designed and developed by Shivdutt Karwa
              </p>
            </div>
          </div>
        </div>

        {/* Large Brand Name at Bottom */}
        <div className="footer-brand-large">
          <h1 className="footer-brand-text" ref={brandTextRef}>
            <div className="footer-mask">
              <span className="footer-letter">S</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">H</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">A</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">M</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">B</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">A</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">L</span>
            </div>
            <div className="footer-mask">
              <span className="footer-letter">A</span>
            </div>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
