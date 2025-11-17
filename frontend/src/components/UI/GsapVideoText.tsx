import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GsapVideoText.css";

gsap.registerPlugin(ScrollTrigger);

interface GsapVideoTextProps {
  leftText?: string;
  rightText?: string;
  videoSrc?: string;
  backgroundColor?: string;
}

const GsapVideoText: React.FC<GsapVideoTextProps> = ({
  leftText = "OUR",
  rightText = "VISION",
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  backgroundColor = "var(--light-bg)",
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !videoContainerRef.current || !textLeftRef.current || !textRightRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".gsap-video-content",
          pinSpacing: true,
        },
      });

      // Animation starts at 0%, reaches full bleed at 60%, then pauses until 100%
      tl.to(videoContainerRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power2.inOut",
        duration: 0.6,
      })
        .to(
          textLeftRef.current,
          {
            x: -500,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        )
        .to(
          textRightRef.current,
          {
            x: 500,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0
        )
        // Reduced pause duration
        .to({}, { duration: 0.4 });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="gsap-video-wrapper"
      style={{ backgroundColor }}
    >
      <div className="gsap-video-content">
        <div className="gsap-text-container">
          <div ref={textLeftRef} className="gsap-text-left">
            {leftText}
          </div>
          <div ref={textRightRef} className="gsap-text-right">
            {rightText}
          </div>
        </div>
        <div ref={videoContainerRef} className="gsap-video-container">
          <video autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default GsapVideoText;