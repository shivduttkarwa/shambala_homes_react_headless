import React, { useState } from 'react';
import './CTASection.css';
import GlassButton from '../UI/GlassButton';

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            On the <em>Inside</em>
          </h2>
          
          <div className="cta-form-wrapper">
            <p className="cta-description">
              Receive exclusive insights, inspiration and studio updates.
            </p>
            
            <div className="cta-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="cta-email-input"
                required
              />
              <GlassButton onClick={handleSubmit}>
                SUBMIT
              </GlassButton>
            </div>
            
            {isSubmitted && (
              <div className="cta-success-message">
                You're in!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;