import React from 'react';
import { BodyBlock, HorizontalSliderBlock, ResidentialProjectsBlock, CommercialProjectsBlock, MultiImageContentBlock } from '../services/api';
import { MediaComparator } from './Home';
import StudioSection from './Home/StudioSection';

interface BodyRendererProps {
  blocks: BodyBlock[];
}


interface MediaComparatorData {
  id: string;
  title?: string;
  slides: Array<{
    image: string;
    title: string;
    subtitle: string;
  }>;
  direction: 'rtl' | 'ltr';
}

const BodyRenderer: React.FC<BodyRendererProps> = ({ blocks }) => {
  // Debug logging
  console.log('BodyRenderer received blocks:', blocks);

  // Handle empty blocks array
  if (!blocks || blocks.length === 0) {
    console.log('No blocks to render');
    return null;
  }

  const renderBlock = (block: BodyBlock, index: number) => {
    console.log(`Rendering block ${index}:`, block);
    
    switch (block.type) {
      case 'horizontal_slider':
        return renderHorizontalSliderBlock(block);
      case 'residential_projects':
        return renderResidentialProjectsBlock(block);
      case 'commercial_projects':
        return renderCommercialProjectsBlock(block);
      case 'multi_image_content':
        return renderMultiImageContentBlock(block);
      default:
        console.warn('Unknown block type:', (block as any).type);
        return null;
    }
  };


  const renderHorizontalSliderBlock = (block: HorizontalSliderBlock) => {
    const { value } = block;
    const API_BASE = import.meta.env.VITE_API_URL?.replace('/api/v2', '') || 'http://127.0.0.1:8000';
    
    // Transform Wagtail data to MediaComparator props
    const comparatorData: MediaComparatorData = {
      id: `horizontal_slider_${block.id}`,
      title: value.title,
      direction: 'rtl', // Can be made configurable in the block if needed
      slides: value.slides
        .sort((a, b) => parseInt(a.order || '0') - parseInt(b.order || '0')) // Sort by order
        .map((slide) => ({
          title: slide.title || '',
          subtitle: slide.description || '',
          image: slide.image?.desktop ? 
            (slide.image.desktop.startsWith('http') ? slide.image.desktop : `${API_BASE}${slide.image.desktop}`) :
            `${import.meta.env.BASE_URL || '/'}images/placeholder.jpg`
        }))
    };

    return (
      <MediaComparator
        key={block.id}
        id={comparatorData.id}
        title={comparatorData.title}
        slides={comparatorData.slides}
        direction={comparatorData.direction}
        showComparatorLine={true}
        showOverlayAnimation={true}
      />
    );
  };

  const renderResidentialProjectsBlock = (block: ResidentialProjectsBlock) => {
    const { value } = block;
    const API_BASE = import.meta.env.VITE_API_URL?.replace('/api/v2', '') || 'http://127.0.0.1:8000';
    
    // Transform Wagtail data to MediaComparator props
    const slides = value.projects.map((project) => {
      console.log('Processing residential project:', project);
      console.log('Project image:', project.image);
      
      let imageUrl = `${import.meta.env.BASE_URL || '/'}images/placeholder.jpg`;
      
      if (project.image?.desktop) {
        if (project.image.desktop.startsWith('http')) {
          imageUrl = project.image.desktop;
        } else if (project.image.desktop.startsWith('/')) {
          imageUrl = `${API_BASE}${project.image.desktop}`;
        } else {
          imageUrl = `${API_BASE}/${project.image.desktop}`;
        }
        console.log('Final residential image URL:', imageUrl);
      }
      
      return {
        title: project.title || '',
        subtitle: project.description || '',
        image: imageUrl,
        buttonText: project.button_text,
        buttonUrl: project.is_external_link ? project.external_url : project.page_link?.url
      };
    });

    console.log('Rendering MediaComparator with props:', {
      id: "residential_projects_comparator",
      title: value.title,
      subtitle: value.subtitle,
      slidesCount: slides.length,
      direction: "rtl"
    });

    return (
      <MediaComparator
        key={block.id}
        id="residential_projects_comparator"
        title={value.title}
        subtitle={value.subtitle}
        slides={slides}
        direction="rtl"
        showComparatorLine={true}
        showOverlayAnimation={true}
      />
    );
  };

  const renderCommercialProjectsBlock = (block: CommercialProjectsBlock) => {
    const { value } = block;
    const API_BASE = import.meta.env.VITE_API_URL?.replace('/api/v2', '') || 'http://127.0.0.1:8000';
    
    // Transform Wagtail data to MediaComparator props
    const slides = value.projects.map((project) => ({
      title: project.title || '',
      subtitle: project.description || '',
      image: project.image?.desktop ? 
        (project.image.desktop.startsWith('http') ? project.image.desktop : `${API_BASE}${project.image.desktop}`) :
        `${import.meta.env.BASE_URL || '/'}images/placeholder.jpg`,
      buttonText: project.button_text,
      buttonUrl: project.is_external_link ? project.external_url : project.page_link?.url
    }));

    return (
      <MediaComparator
        key={block.id}
        id="commercial_projects_comparator"
        title={value.title}
        subtitle={value.subtitle}
        slides={slides}
        direction="ltr"
        showComparatorLine={true}
        showOverlayAnimation={true}
      />
    );
  };

  const renderMultiImageContentBlock = (block: MultiImageContentBlock) => {
    const { value } = block;
    
    // Transform CTA data for StudioSection
    let ctaHref = '#contact';
    if (value.cta) {
      if (value.cta.is_external_link && value.cta.external_url) {
        ctaHref = value.cta.external_url;
      } else if (!value.cta.is_external_link && value.cta.page_link?.url) {
        ctaHref = value.cta.page_link.url;
      }
    }

    // Update StudioSection to accept cta props by passing the button text and href
    const updatedImages = value.images.length >= 2 ? value.images : [
      ...value.images,
      // Add default image if only one image provided
      { src: `${import.meta.env.BASE_URL || '/'}images/placeholder.jpg`, alt: 'Placeholder' }
    ];

    console.log('Rendering MultiImageContentBlock:', {
      title: value.title,
      subtitle: value.subtitle,
      description: value.description,
      images: updatedImages,
      cta: value.cta
    });

    return (
      <StudioSection
        key={block.id}
        title={value.title}
        subtitle={value.subtitle}
        description={value.description}
        images={updatedImages}
        ctaText={value.cta?.button_text}
        ctaHref={ctaHref}
      />
    );
  };

  return (
    <div className="body-content" style={{ margin: 0, padding: 0 }}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default BodyRenderer;