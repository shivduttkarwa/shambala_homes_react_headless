import React from 'react';
import { StaggeredMenu } from './StaggeredMenu';
import { SiteSettings } from '../../services/api';

interface HeaderProps {
  settings: SiteSettings | null;
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  const publicUrl = import.meta.env.BASE_URL;

  // Fixed menu items with anchor links to home page sections
  const menuItems = [
    { 
      label: 'HOME', 
      ariaLabel: 'Go to home page', 
      link: '#hero' 
    },
    { 
      label: 'SERVICES', 
      ariaLabel: 'View our services', 
      link: '#services'
    },
    { 
      label: 'PROJECTS', 
      ariaLabel: 'View our projects', 
      link: '#projects'
    },
    { 
      label: 'VISION', 
      ariaLabel: 'Learn about our vision', 
      link: '#vision'
    },
    { 
      label: 'CONTACT US', 
      ariaLabel: 'Get in touch', 
      link: '#contact' 
    }
  ];

  

  return (
    <StaggeredMenu
      position="left"
      items={menuItems}
      logoText="Shambala Homes"
      logoAlt="Shambala Homes"
      displayItemNumbering={true}
      menuButtonColor="#2C2C2C"
      openMenuButtonColor="#FAF8F3"
      changeMenuColorOnOpen={true}
      colors={['#5B7C4F', '#2C2C2C']}
      accentColor="#5B7C4F"
      isFixed={true}
      onMenuOpen={() => {}}
      onMenuClose={() => {}}
    />
  );
};

export default Header;
