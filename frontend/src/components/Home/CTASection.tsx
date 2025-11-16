import React, { useState } from 'react';
import './CTASection.css';

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
            
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="cta-email-input"
                required
              />
              <button type="submit" className="cta-submit-button">
                SUBMIT
              </button>
            </form>
            
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