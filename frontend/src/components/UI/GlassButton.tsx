import React from 'react';
import './GlassButton.css';

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  href,
  onClick,
  children,
  className = '',
  target = '_self',
  rel
}) => {
  const buttonContent = (
    <>
      <span className="home-benefits-cta-bg"></span>
      <span className="home-benefits-cta-label">{children}</span>
      <span className="home-benefits-cta-icon">→</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="home-benefits-cta"
        target={target}
        rel={rel}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className="home-benefits-cta"
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default GlassButton;