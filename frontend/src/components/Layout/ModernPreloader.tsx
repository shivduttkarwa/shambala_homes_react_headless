import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './ModernPreloader.css';

interface ModernPreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum time to show preloader (in ms)
}

const ModernPreloader: React.FC<ModernPreloaderProps> = ({ 
  onComplete,
  minDuration = 2000 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let minDurationTimer: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;
    
    // Animate progress from 0 to 100 gradually
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    // Ensure minimum duration
    minDurationTimer = setTimeout(() => {
      setProgress(100);
      
      // Complete after progress reaches 100 and minimum duration
      completionTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 300);
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minDurationTimer);
      clearTimeout(completionTimer);
    };
  }, [minDuration, onComplete]);

  const logoVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${Math.min(progress, 100)}%`,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="modern-preloader"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Background with subtle gradient */}
          <div className="preloader-bg" />
          
          {/* Animated particles */}
          <div className="particles">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [-20, -100, -20],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 12}%`,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="preloader-content">
            {/* Logo/Brand area */}
            <motion.div 
              className="preloader-logo"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              {/* Animated circles */}
              <div className="logo-container">
                <motion.div 
                  className="logo-circle outer-circle"
                  variants={circleVariants}
                  animate="animate"
                />
                <motion.div 
                  className="logo-circle inner-circle"
                  animate={{
                    rotate: -360,
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                />
                <div className="logo-center">
                  <span className="logo-text">S</span>
                </div>
              </div>
              
              <motion.h1 
                className="brand-name"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.8, duration: 0.6 }
                }}
              >
                Shambala Homes
              </motion.h1>
              
              <motion.p 
                className="brand-tagline"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 1.2, duration: 0.6 }
                }}
              >
                Crafting Dream Spaces
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div 
              className="progress-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 1.5, duration: 0.6 }
              }}
            >
              <div className="progress-container">
                <div className="progress-track">
                  <motion.div 
                    className="progress-fill"
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <div className="progress-percentage">
                  {Math.round(Math.min(progress, 100))}%
                </div>
              </div>
              
              <motion.div 
                className="loading-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading your experience...
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="decorative-lines">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="decorative-line"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: 1,
                  transition: { 
                    delay: 2 + i * 0.2, 
                    duration: 1,
                    ease: "easeOut"
                  }
                }}
                style={{ top: `${30 + i * 20}%` }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModernPreloader;