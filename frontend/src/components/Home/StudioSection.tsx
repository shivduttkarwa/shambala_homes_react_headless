import React, { useEffect, useRef } from 'react';
import './StudioSection.css';
import { gsap } from '../../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

interface StudioSectionProps {
  title?: string;
  subtitle?: string;
  description?: string[];
  images?: {
    src: string;
    desktop?: string;
    tablet?: string;
    mobile?: string;
    alt: string;
  }[];
  ctaText?: string;
  ctaHref?: string;
}


const publicUrl = import.meta.env.BASE_URL;


const StudioSection: React.FC<StudioSectionProps> = ({
  title = "Bring your dream home to life",
  subtitle,
  description = [
    "Transform your outdoor space into a breathtaking sanctuary with our expert landscaping services. We specialize in creating stunning gardens that reflect your unique style and enhance your property's value.",
    "Our experienced team combines artistic vision with horticultural expertise to design and implement landscapes that thrive in every season. From concept to completion, we're committed to exceeding your expectations.",
    "Schedule a consultation today and discover how we can bring your dream outdoor space to life."
  ],
  images = [
    {
      src: `${publicUrl}images/l2.jpg`,
      alt: "Beautiful landscaped garden"
    },
    {
      src: `${publicUrl}images/l5.jpg`,
      alt: "Modern outdoor design"
    }
  ],
  ctaText = "Get Started",
  ctaHref = "#contact"
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Curtain reveal animation for title
  useEffect(() => {
    if (!titleRef.current || !title) return;

    const titleElement = titleRef.current;

    // Clean up any existing animations
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === titleElement) st.kill();
    });

    const timer = setTimeout(() => {
      try {
        // Split text into characters
        const splitText = new GSAPSplitText(titleElement, {
          type: 'chars',
          charsClass: 'curtain-char'
        });

        if (splitText.chars && splitText.chars.length > 0) {
          // Make original text transparent but keep layout
          titleElement.style.color = 'transparent';
          titleElement.style.opacity = '1';
          
          // Set each character to be visible with proper color and hidden below
          gsap.set(splitText.chars, {
            yPercent: 100,
            opacity: 0,
            color: 'var(--text-color, #111827)'
          });

          // Create curtain reveal animation
          ScrollTrigger.create({
            trigger: titleElement,
            start: 'top 85%',
            end: 'bottom 20%',
            onEnter: () => {
              // Reset and play animation on scroll down
              gsap.set(splitText.chars, {
                yPercent: 100,
                opacity: 0,
                color: 'var(--text-color, #111827)'
              });
              gsap.to(splitText.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.03,
                ease: 'power2.out'
              });
            },
            onLeave: () => {
              // Hide characters immediately when leaving the area
              gsap.set(splitText.chars, {
                yPercent: 100,
                opacity: 0
              });
            },
            onLeaveBack: () => {
              // Hide characters when scrolling up past the section  
              gsap.set(splitText.chars, {
                yPercent: 100,
                opacity: 0
              });
            },
            onEnterBack: () => {
              // Reset and play animation when scrolling back up into view
              gsap.set(splitText.chars, {
                yPercent: 100,
                opacity: 0,
                color: 'var(--text-color, #111827)'
              });
              gsap.to(splitText.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.03,
                ease: 'power2.out'
              });
            },
            id: 'studio-curtain-title'
          });
        }
      } catch (error) {
        console.warn('SplitText curtain effect failed:', error);
        // Fallback to visible title
        gsap.set(titleElement, { opacity: 1, color: 'inherit' });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars?.id === 'studio-curtain-title') st.kill();
      });
    };
  }, [title]);

  return (
    <section className="studio-section">
      <div className="studio-container">
        <div className="studio-layout">
          {/* Left side: Image 1 - half width, full height */}
          <div className="left-image">
            <img 
              src={images[0].desktop || images[0].src}
              alt={images[0].alt} 
              className="studio-image"
              loading="lazy"
            />
          </div>
          
          {/* Right side: Content and Image 2 */}
          <div className="right-content">
            {/* Content area: 60% height */}
            <div className="content-area">
              <h2 ref={titleRef} className="studio-title" style={{ textAlign: 'center', overflow: 'hidden' }}>
                {title}
              </h2>
              {subtitle && <h3 className="studio-subtitle">{subtitle}</h3>}
              <div className="studio-description">
                {description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <a href={ctaHref} className="studio-cta">
                {ctaText}
              </a>
            </div>
            
            {/* Image 2: 40% height */}
            <div className="right-image">
              <img 
                src={images[1].desktop || images[1].src}
                alt={images[1].alt} 
                className="studio-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
