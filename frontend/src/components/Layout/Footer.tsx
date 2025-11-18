import React from 'react';
import './Footer.css';
import { SiteSettings } from '../../services/api';

interface FooterProps {
  settings: SiteSettings | null;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const publicUrl = import.meta.env.BASE_URL;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Social Column */}
          <div className="footer-column">
            <div className="footer-brand">
              <h2 className="footer-brand-heading">Shambala Homes</h2>
            </div>
            <div className="footer-social">
              {settings?.social?.instagram && (
                <a href={settings.social.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <span>Instagram</span>
                </a>
              )}
              {settings?.social?.facebook && (
                <a href={settings.social.facebook} className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <span>Facebook</span>
                </a>
              )}
              {settings?.social?.linkedin && (
                <a href={settings.social.linkedin} className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                </a>
              )}
              {settings?.social?.youtube && (
                <a href={settings.social.youtube} className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <span>YouTube</span>
                </a>
              )}
              {settings?.social?.twitter && (
                <a href={settings.social.twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <span>Twitter</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-column">
            <div className="footer-links">
              <a href={`${publicUrl}/portfolio`} className="footer-link">PORTFOLIO</a>
              <a href={`${publicUrl}/services`} className="footer-link">Services</a>
              <a href={`${publicUrl}/about`} className="footer-link">Studio</a>
              <a href={`${publicUrl}/blog`} className="footer-link">Blog</a>
              <a href={`${publicUrl}/contact`} className="footer-link">Inquire</a>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="footer-column footer-contact-column">
            <div className="footer-contact-info">
              {settings?.contact?.address && (
                <a href="#" className="footer-contact-item">
                  <span dangerouslySetInnerHTML={{ __html: settings.contact.address.replace(/\n/g, '<br/>') }} />
                </a>
              )}
              {!settings?.contact?.address && (
                <a href="#" className="footer-contact-item">
                  123 Garden Street<br/>Melbourne, VIC 3000
                </a>
              )}
              
              {settings?.contact?.phone && (
                <a href={`tel:${settings.contact.phone}`} className="footer-contact-item">
                  {settings.contact.phone}
                </a>
              )}
              {!settings?.contact?.phone && (
                <a href="tel:+61312345678" className="footer-contact-item">
                  +61 3 1234 5678
                </a>
              )}
              
              {settings?.contact?.email && (
                <a href={`mailto:${settings.contact.email}`} className="footer-contact-item">
                  {settings.contact.email.toUpperCase()}
                </a>
              )}
              {!settings?.contact?.email && (
                <a href="mailto:info@shambalahomes.com" className="footer-contact-item">
                  INFO@SHAMBALAHOMES.COM
                </a>
              )}
              
              <a href={`${publicUrl}/privacy`} className="footer-contact-item">
                privacy policy
              </a>
            </div>
          </div>
        </div>
        
        {/* Large Brand Name at Bottom */}
        <div className="footer-brand-large">
          <h1 className="footer-brand-text">
            <span className="footer-letter">S</span>
            <span className="footer-letter">H</span>
            <span className="footer-letter">A</span>
            <span className="footer-letter">M</span>
            <span className="footer-letter">B</span>
            <span className="footer-letter">A</span>
            <span className="footer-letter">L</span>
            <span className="footer-letter">A</span>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
