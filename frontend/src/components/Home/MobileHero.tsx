import React, { useRef } from "react";
import GlassRainButton from "../UI/GlassRainButton";
import "./MobileHero.css";

const publicUrl = import.meta.env.BASE_URL;

const MobileHero: React.FC = () => {
  const videoSpaceRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="mobile-hero-section" id="mobile-hero-section">
      <div className="mobile-hero-container">
        {/* Hero Text */}
        <div className="mobile-hero-text">
          <div className="mobile-text-line mobile-line-1">DESIGN</div>
          <div className="mobile-text-line mobile-line-2">BEYOND</div>
          
          {/* Line 3 - Video */}
          <div className="mobile-video-line">
            <div ref={videoSpaceRef} className="mobile-video-space">
              <video autoPlay muted loop playsInline>
                <source src={`${publicUrl}images/hero1.mp4`} type="video/mp4" />
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          
          <div className="mobile-text-line mobile-line-4">THE</div>
          <div className="mobile-text-line mobile-line-5">ORDINARY</div>
        </div>

      </div>
    </section>
  );
};

export default MobileHero;