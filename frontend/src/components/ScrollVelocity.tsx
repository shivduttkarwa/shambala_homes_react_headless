import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import './ScrollVelocity.css';

function useElementWidth(ref: React.RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    
    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
      updateWidth();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return width;
}

interface ScrollVelocityProps {
  text: string;
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: [number, number]; output: [number, number] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

interface VelocityTextProps extends ScrollVelocityProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  text,
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
  scrollContainerRef
}) => {
  function VelocityText({
    children,
    baseVelocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    // Reset animation when text changes
    useEffect(() => {
      baseX.set(0);
    }, [children, baseX]);

    function wrap(min: number, max: number, v: number) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      if (copyWidth === 0) return; // Don't animate until we have width

      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    // Generate spans with proper key that includes children to force re-render on text change
    const textKey = typeof children === 'string' ? children : String(children);
    const spans = [];
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span className={className} key={`${textKey}-${i}`} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;•&nbsp;
        </span>
      );
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div 
          className={scrollerClassName} 
          style={{ x, ...scrollerStyle }}
          key={textKey} // Force re-render on text change
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      <VelocityText
        className={className}
        baseVelocity={velocity}
        scrollContainerRef={scrollContainerRef}
        damping={damping}
        stiffness={stiffness}
        numCopies={numCopies}
        velocityMapping={velocityMapping}
        parallaxClassName={parallaxClassName}
        scrollerClassName={scrollerClassName}
        parallaxStyle={parallaxStyle}
        scrollerStyle={scrollerStyle}
      >
        {text}
      </VelocityText>
    </section>
  );
};

export default ScrollVelocity;