// Wagtail API service
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Increased timeout to handle image processing
});

export interface WagtailImage {
  url: string;
  width: number;
  height: number;
}

export interface WagtailServiceBox {
  id: number;
  index: number;
  title: string;
  description: string;
  image: {
    url: string;
    small: string;
    full: string;
  } | null;
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  button?: {
    text: string;
    url: string;
    is_external: boolean;
  } | null;
  image: {
    src: string;
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
  full_image?: {
    src: string;
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
}

export interface HeroSectionData {
  title: string;
  cta: {
    text: string;
    link: string;
  };
  background: {
    video_url?: string;
    image?: {
      src: string;
      desktop: string;
      tablet: string;
      mobile: string;
      alt: string;
    };
  };
  slides: HeroSlide[];
  settings: {
    autoplay_enabled: boolean;
    autoplay_delay: number;
  };
}


// Horizontal Slider Block Types
export interface HorizontalSlideItem {
  order: string;
  title: string;
  description: string;
  image: {
    src: string;
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
  button_text: string;
  is_external_link: boolean;
  external_url?: string;
  page_link?: {
    id: number;
    title: string;
    url: string;
  };
}

export interface HorizontalSliderBlock {
  type: 'horizontal_slider';
  value: {
    title: string;
    description?: string;
    slides: HorizontalSlideItem[];
    autoplay_enabled: boolean;
    autoplay_delay: string;
  };
  id: string;
}

// Project Blocks Types
export interface ProjectSlideItem {
  title: string;
  description?: string;
  image: {
    src: string;
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
  button_text: string;
  is_external_link: boolean;
  external_url?: string;
  page_link?: {
    id: number;
    title: string;
    url: string;
  };
}

export interface ResidentialProjectsBlock {
  type: 'residential_projects';
  value: {
    title: string;
    subtitle?: string;
    projects: ProjectSlideItem[];
  };
  id: string;
}

export interface CommercialProjectsBlock {
  type: 'commercial_projects';
  value: {
    title: string;
    subtitle?: string;
    projects: ProjectSlideItem[];
  };
  id: string;
}

// Multi Image Content Block Types
export interface MultiImageContentBlock {
  type: 'multi_image_content';
  value: {
    title: string;
    subtitle?: string;
    description: string[];
    images: Array<{
      src: string;
      desktop?: string;
      tablet?: string;
      mobile?: string;
      alt: string;
    }>;
    cta: {
      button_text: string;
      is_external_link: boolean;
      external_url?: string;
      page_link?: {
        id: number;
        title: string;
        url: string;
      };
    };
  };
  id: string;
}

// Body Content Types
export type BodyBlock = HorizontalSliderBlock | ResidentialProjectsBlock | CommercialProjectsBlock | MultiImageContentBlock;

export interface WagtailHomePage {
  id: number;
  title: string;
  body_content_data: BodyBlock[];
  hero_section_data: HeroSectionData;
  // Legacy fields for backward compatibility
  main_title: string[];
  typed_texts_list: string[];
  description: string;
  cta_text: string;
  cta_link: string;
  background_image: WagtailImage;
  service_boxes_list: WagtailServiceBox[];
  intro?: string;
  hero?: WagtailImage;
}

export interface WagtailApiResponse<T> {
  meta: {
    total_count: number;
  };
  items: T[];
}

// Fetch home page data from Wagtail API
export const fetchHomePage = async (): Promise<WagtailHomePage | null> => {
  try {
    const response = await api.get<WagtailApiResponse<WagtailHomePage>>('/pages/', {
      params: {
        type: 'home.HomePage',
        fields: 'title,hero_section_data,body_content_data',
        limit: 1,
      },
    });

    if (response.data.items.length > 0) {
      return response.data.items[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching home page:', error);
    throw error;
  }
};

export default api;