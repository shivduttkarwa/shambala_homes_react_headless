import React, { useEffect, useRef, useState } from 'react';
import './LiquidTextAnimate.css';

interface LiquidTextAnimateProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}

const LiquidTextAnimate: React.FC<LiquidTextAnimateProps> = ({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 0.4
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const characters = children.split('').map((char) => 
    char === ' ' ? '\u00A0' : char
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay]);

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" 
              result="gooey" 
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>

      <span
        ref={containerRef}
        className={`liquid-text ${className}`}
        style={{
          display: 'inline-block',
          perspective: '1000px',
          filter: 'url(#gooey-liquid)',
          ...style
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className={`liquid-char ${isVisible ? 'animate' : ''}`}
            style={{
              display: 'inline-block',
              transformOrigin: 'center bottom',
              transformStyle: 'preserve-3d',
              animationDelay: isVisible ? `${index * 0.03}s` : 'none',
              animationDuration: `${duration}s`
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
};

export default LiquidTextAnimate;