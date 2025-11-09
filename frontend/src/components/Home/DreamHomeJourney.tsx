import React, { useEffect, useRef } from 'react';
import './DreamHomeJourney.css';
import { gsap } from '../../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);


const publicUrl = import.meta.env.BASE_URL;


interface DreamHomeJourneyProps {
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

const DreamHomeJourney: React.FC<DreamHomeJourneyProps> = ({
  title = "Begin your dream home journey with Shambala Homes",
  description = "Discover modern house designs and packages to turn your vision into reality — from open living spaces to stunning alfresco homes.",
  primaryCta = {
    text: "Explore designs",
    link: "#"
  },

  secondaryCta = {
    text: "Explore house & land packages",
    link: "#"
  },
  backgroundImage = `${publicUrl}images/wooden-bg.jpg`
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
            color: '#ffffff' // White color for dark background
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
                color: '#ffffff'
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
                color: '#ffffff'
              });
              gsap.to(splitText.chars, {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.03,
                ease: 'power2.out'
              });
            },
            id: 'dream-curtain-title'
          });
        }
      } catch (error) {
        console.warn('SplitText curtain effect failed:', error);
        // Fallback to visible title
        gsap.set(titleElement, { opacity: 1, color: '#ffffff' });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars?.id === 'dream-curtain-title') st.kill();
      });
    };
  }, [title]);

  return (
    <section 
      className="dream-journey" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="dream-overlay"></div>
      <div className="dream-container">
        <h2 ref={titleRef} className="dream-title" style={{ textAlign: 'center', overflow: 'hidden' }}>
          {title}
        </h2>
        <p className="dream-description">{description}</p>
        <div className="dream-ctas">
          <a href={primaryCta.link} className="dream-button dream-button-primary">
            {primaryCta.text}
          </a>
          <a href={secondaryCta.link} className="dream-button dream-button-secondary">
            {secondaryCta.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DreamHomeJourney;
