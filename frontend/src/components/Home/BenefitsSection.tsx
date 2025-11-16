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
  sectionTitle = "Our Benefits",
  benefits = [
    {
      id: 1,
      title: "Emotional well-being",
      description: "We design environments that inspire calm and balance."
    },
    {
      id: 2,
      title: "Design that connects with you",
      description: "Unique projects, designed to reflect your essence."
    },
    {
      id: 3,
      title: "Spaces that work and flow",
      description: "We improve your everyday life with functional and harmonious design."
    },
    {
      id: 4,
      title: "Positive energy, always",
      description: "We apply Feng Shui to enhance well-being in every corner."
    }
  ],
  ctaText = "More about Shambala",
  ctaLink = "#"
}) => {
  return (
    <section data-block-type="blockBenefits">
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
                    <span className="benefits-cta-bg"></span>
                    <span className="benefits-cta-icon-wrapper">
                      <span className="benefits-cta-icon">
                        <svg
                          className="benefits-icon-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 17 17"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M8.93 11.317a.333.333 0 0 1 0-.471l2.43-2.431-2.43-2.43a.333.333 0 0 1 .471-.472l2.667 2.666c.13.13.13.342 0 .472L9.4 11.317a.333.333 0 0 1-.471 0"
                            clipRule="evenodd"
                          ></path>
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M4.832 8.416c0-.184.15-.334.333-.334h6.667a.333.333 0 1 1 0 .667H5.165a.333.333 0 0 1-.333-.333"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <span className="benefits-cta-icon">
                        <svg
                          className="benefits-icon-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 17 17"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M8.93 11.317a.333.333 0 0 1 0-.471l2.43-2.431-2.43-2.43a.333.333 0 0 1 .471-.472l2.667 2.666c.13.13.13.342 0 .472L9.4 11.317a.333.333 0 0 1-.471 0"
                            clipRule="evenodd"
                          ></path>
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M4.832 8.416c0-.184.15-.334.333-.334h6.667a.333.333 0 1 1 0 .667H5.165a.333.333 0 0 1-.333-.333"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </span>
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