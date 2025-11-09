import React, { useEffect, useRef } from 'react';
import './QualityHomes.css';
import { gsap } from '../../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

interface Feature {
  icon: string;
  title: string;
  description: string;
  image: string;
}

interface QualityHomesProps {
  mainTitle?: string;
  features?: Feature[];
  ctaText?: string;
  ctaLink?: string;
}

const publicUrl = import.meta.env.BASE_URL;


const QualityHomes: React.FC<QualityHomesProps> = ({
  mainTitle = "Building quality homes for over 40 years",
  features = [
    {
      icon: "✓",
      title: "Master of design",
      description: "Our homes are designed to celebrate you. This is why we continually strive to create innovative, award-winning designs that help you make the most of your home and the life you live in it.",
  image: `${publicUrl}images/1.jpg`
    },
    {
      icon: "✓",
      title: "Lifetime structural guarantee",
      description: "Every Shambala Homes home is backed by a Lifetime Structural Guarantee*, so you can build with confidence and peace of mind that it will stand the test of time.",
  image: `${publicUrl}images/2.jpg`
    },
    {
      icon: "✓",
      title: "6 stage quality assurance",
      description: "Our homes may have changed over the years but our commitment to excellence hasn't. Our rigorous quality assurance process ensures every Shambala Homes home is built to the highest standard.",
  image: `${publicUrl}images/3.jpg`
    },
    {
      icon: "✓",
      title: "Australia's no.1 home builder",
      description: "We believe no one else designs and builds as well as us and, as Australia's No.1 home builder for the ninth year running, we must be doing something right.",
  image: `${publicUrl}images/4.jpg`
    }
  ],
  ctaText = "Learn more about building with Shambala Homes",
  ctaLink = "#"
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Curtain reveal animation for title
  useEffect(() => {
    if (!titleRef.current || !mainTitle) return;

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
            id: 'quality-curtain-title'
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
        if (st.vars?.id === 'quality-curtain-title') st.kill();
      });
    };
  }, [mainTitle]);

  return (
    <section className="quality-homes">
      <div className="quality-container">
        <div className="quality-header">
          <h2 ref={titleRef} className="quality-main-title" style={{ textAlign: 'center', overflow: 'hidden' }}>
            {mainTitle}
          </h2>
        </div>

        <div className="quality-content">
          <div className="features-section">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-content">
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                  </div>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-image-wrapper">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="feature-image"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {ctaText && (
          <div className="quality-cta">
            <a href={ctaLink} className="quality-button">
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default QualityHomes;
