import { motion } from 'motion/react';
import React from 'react';

interface TextAnimateProps {
  children: string;
  by?: 'word' | 'character';
  variants: {
    hidden: Record<string, any>;
    show: (i: number) => Record<string, any>;
    exit?: (i: number) => Record<string, any>;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  by = 'character',
  variants,
  className = '',
  style = {}
}) => {
  const splitText = by === 'character' 
    ? children.split('').map((char) => char === ' ' ? '\u00A0' : char) // Replace spaces with non-breaking spaces
    : children.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: by === 'character' ? 0.05 : 0.1,
      }
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: by === 'character' ? 0.05 : 0.1,
      }
    }
  };

  return (
    <motion.span
      className={className}
      style={{ 
        display: 'inline-block',
        overflow: 'hidden',
        ...style 
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      {splitText.map((item, index) => (
        <motion.span
          key={index}
          style={{ 
            display: 'inline-block',
            overflow: 'hidden'
          }}
          variants={{
            hidden: variants.hidden,
            show: variants.show(index),
            exit: variants.exit ? variants.exit(index) : variants.hidden
          }}
        >
          {item}
          {by === 'word' && index !== splitText.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextAnimate;