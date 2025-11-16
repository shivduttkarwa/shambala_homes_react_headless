import React from 'react';
import './BenefitsSection.css';

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  sectionTitle?: string;
  benefits?: Benefit[];
  ctaText?: string;
  ctaLink?: string;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  sectionTitle = "Find your perfect home journey",
  benefits = [
    {
      id: 1,
      title: "Build my first home",
      description: "Transform your vision into reality with expert guidance through every step of your first home building experience."
    },
    {
      id: 2,
      title: "Upgrade to a bigger home",
      description: "Discover spacious designs that grow with your family's evolving needs and lifestyle aspirations."
    },
    {
      id: 3,
      title: "Build an investment property",
      description: "Create lasting wealth through strategic property development with our proven investment-focused approach."
    },
    {
      id: 4,
      title: "Downsize to a smaller home",
      description: "Embrace efficient living with thoughtfully designed homes that maximize comfort and minimize maintenance."
    }
  ],
  ctaText = "Start Your Journey Today",
  ctaLink = "#"
}) => {
  return (
    <section data-block-type="blockBenefits">
      {/* SECTION TITLE - INSIDE SECTION, BEFORE STICKY CONTEXT */}
      <div className="benefits-inside-title">
        <h1 className="benefits-section-title">
          {sectionTitle}
        </h1>
      </div>
      
      <div className="benefits-overflow-clip benefits-px-8">
        <div className="benefits-relative benefits-isolate benefits-size-full">
          {/* Background & Cards */}
          <div className="benefits-bg-base-stone-20">
            {/* Desktop Layout */}
            <div className="benefits-hidden benefits-lg-grid benefits-desktop-grid">
              {/* Column 1 */}
              <div className="benefits-w-full">
                <div className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[0].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[0].title}
                    </h2>
                  </span>
                </div>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
              </div>

              {/* Column 2 */}
              <div className="benefits-w-full">
                <div className="benefits-spacer"></div>
                <div className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[1].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[1].title}
                    </h2>
                  </span>
                </div>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
              </div>

              {/* Column 3 */}
              <div className="benefits-w-full">
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <div className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[2].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[2].title}
                    </h2>
                  </span>
                </div>
                <div className="benefits-spacer"></div>
              </div>

              {/* Column 4 */}
              <div className="benefits-w-full">
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <div className="benefits-spacer"></div>
                <div className="benefits-card benefits-card-active">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[3].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[3].title}
                    </h2>
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div>
                <div className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[0].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[0].title}
                    </h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div className="benefits-col-start-2">
                <div className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[1].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[1].title}
                    </h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div>
                <div className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[2].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[2].title}
                    </h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="benefits-grid benefits-grid-cols-2 benefits-lg-hidden">
              <div className="benefits-col-start-2">
                <div className="benefits-card benefits-card-mobile">
                  <span className="benefits-block">
                    <p className="benefits-description">
                      {benefits[3].description}
                    </p>
                  </span>
                  <span className="benefits-block">
                    <h2 className="benefits-title">
                      {benefits[3].title}
                    </h2>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="benefits-cta-container">
              <div className="benefits-lg-col-start-2">
                <span className="benefits-block">
                  <a href={ctaLink} className="benefits-cta-button">
                    <span>{ctaText}</span>
                    <span className="benefits-cta-icon">→</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;