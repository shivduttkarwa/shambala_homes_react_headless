import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MobileHero.css";

gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL;

const MobileHero: React.FC = () => {
  const videoSpaceRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Split text into character spans
  const splitTextToChars = (element: HTMLElement) => {
    const text = element.textContent || "";
    element.innerHTML = "";
    
    const chars = text.split("");
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      element.appendChild(span);
    });
    
    return element.querySelectorAll("span");
  };

  // Initial hero text animation (ChangingText style)
  const animateHeroTextAppearing = () => {
    if (!heroTextRef.current) return;

    // Get all text lines
    const textLines = heroTextRef.current.querySelectorAll(".mobile-text-line");
    
    textLines.forEach((line, lineIndex) => {
      const chars = splitTextToChars(line as HTMLElement);
      
      // Set initial state
      gsap.set(chars, { 
        opacity: 0, 
        y: 20, 
        filter: "blur(10px)" 
      });
      
      // Animate in with stagger
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        delay: lineIndex * 0.3, // Stagger each line
      });
    });
  };

  useEffect(() => {
    if (!wrapperRef.current || !videoSpaceRef.current || !heroTextRef.current || !contentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial text animation
      setTimeout(() => {
        animateHeroTextAppearing();
      }, 500);

      // Video expansion animation - EXACT copy from GsapVideoText
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          pin: contentRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Video expansion to fullscreen
      tl.to(videoSpaceRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        zIndex: 1000,
        opacity: 1,
        x: () => {
          const rect = videoSpaceRef.current!.getBoundingClientRect();
          return (window.innerWidth / 2) - (rect.left + rect.width / 2);
        },
        y: () => {
          const rect = videoSpaceRef.current!.getBoundingClientRect();
          return (window.innerHeight / 2) - (rect.top + rect.height / 2);
        },
        ease: "power2.inOut",
        duration: 0.6,
      })
      // Fade out text during expansion with sliding animation
      const line1 = heroTextRef.current!.querySelector(".mobile-line-1") as HTMLElement;
      const line2 = heroTextRef.current!.querySelector(".mobile-line-2") as HTMLElement;
      const line4 = heroTextRef.current!.querySelector(".mobile-line-4") as HTMLElement;
      const line5 = heroTextRef.current!.querySelector(".mobile-line-5") as HTMLElement;

      tl.to(line1, {
          y: -400,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )
      .to(line2, {
          y: -300,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )
      .to(line4, {
          y: 300,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )
      .to(line5, {
          y: 400,
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
    <section ref={wrapperRef} className="mobile-hero-section" id="mobile-hero-section">
      <div ref={contentRef} className="mobile-hero-container">
        {/* Hero Text */}
        <div ref={heroTextRef} className="mobile-hero-text">
          <div className="mobile-text-line mobile-line-1">DESIGN</div>
          <div className="mobile-text-line mobile-line-2">BEYOND</div>
          
          {/* Line 3 - Empty space for video positioning */}
          <div className="mobile-video-line">
            <div className="mobile-video-placeholder"></div>
          </div>
          
          <div className="mobile-text-line mobile-line-4">THE</div>
          <div className="mobile-text-line mobile-line-5">ORDINARY</div>
        </div>

        {/* Video - separate from text container */}
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
    </section>
  );
};

export default MobileHero;