from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField

# Import blocks and image configuration
from .blocks import BodyStreamBlock, HeroSectionBlock
from .image_config import generate_responsive_image_data


class HomePage(Page):
    """
    Modern HomePage with flexible content blocks and hero section
    """
    
    # Hero section (single block)
    hero_section = StreamField(
        [('hero', HeroSectionBlock())],
        max_num=1,
        blank=True,
        default=list,
        help_text="Hero section with video background and slider"
    )
    
    # Page body content (flexible blocks)
    body = StreamField(
        BodyStreamBlock(),
        blank=True,
        default=list,
        help_text="Main page content using flexible blocks"
    )
    
    # Admin panel configuration
    content_panels = Page.content_panels + [
        FieldPanel("hero_section", heading="Hero Section"),
        FieldPanel("body", heading="Page Content"),
    ]
    
    # API fields for headless frontend
    api_fields = [
        APIField("title"),
        APIField("slug"),
        APIField("hero_section_data"),  # Custom property
        APIField("body_content_data"),  # Custom property for proper serialization
    ]
    
    @property
    def hero_section_data(self):
        """
        Transform hero section StreamField to frontend-compatible format
        """
        if not self.hero_section:
            return None
            
        # Get the first (and only) hero block
        hero_block = None
        for block in self.hero_section:
            if block.block_type == 'hero':
                hero_block = block.value
                break
                
        if not hero_block:
            return None
        
        # Transform slides data
        slides_data = []
        for slide in hero_block.get('slides', []):
            slide_data = {
                'id': len(slides_data) + 1,  # Simple incremental ID
                'title': slide.get('title', ''),
                'description': slide.get('description', ''),
            }
            
            # Handle button configuration
            button_text = slide.get('button_text', 'Read more')
            is_external = slide.get('is_external_link', False)
            
            # Check if this is an old slide with just a 'link' field
            legacy_link = slide.get('link', '')
            
            if is_external and slide.get('external_url'):
                slide_data['button'] = {
                    'text': button_text,
                    'url': slide.get('external_url'),
                    'is_external': True
                }
            elif not is_external and slide.get('page_link'):
                # Get the page URL
                page_url = '/'
                try:
                    if hasattr(slide['page_link'], 'url'):
                        page_url = slide['page_link'].url
                    elif hasattr(slide['page_link'], 'get_url'):
                        page_url = slide['page_link'].get_url()
                except:
                    page_url = '/'
                    
                slide_data['button'] = {
                    'text': button_text,
                    'url': page_url,
                    'is_external': False
                }
            elif legacy_link:
                # Handle legacy slides that only have the 'link' field
                slide_data['button'] = {
                    'text': button_text,
                    'url': legacy_link,
                    'is_external': True  # Assume external for legacy links
                }
            else:
                # Default button for slides without any link configuration
                slide_data['button'] = {
                    'text': button_text,
                    'url': '#',
                    'is_external': False
                }
            
            # Main slider image - using global config
            if slide.get('image'):
                slide_data['image'] = generate_responsive_image_data(
                    slide['image'], 'hero', 'slides.image'
                )
            
            # Full image for lightbox/fullscreen - using global config
            if slide.get('full_image'):
                slide_data['full_image'] = generate_responsive_image_data(
                    slide['full_image'], 'hero', 'slides.full_image'
                )
            elif slide.get('image'):
                # Use main image as fallback
                slide_data['full_image'] = generate_responsive_image_data(
                    slide['image'], 'hero', 'slides.full_image'
                )
            
            slides_data.append(slide_data)
        
        # Background media
        background_data = {}
        if hero_block.get('background_video'):
            background_data['video_url'] = hero_block['background_video']
            
        if hero_block.get('background_image'):
            background_data['image'] = generate_responsive_image_data(
                hero_block['background_image'], 'hero', 'background_image'
            )
        
        # Parse autoplay delay (convert string to int)
        autoplay_delay = 5000
        try:
            if hero_block.get('autoplay_delay'):
                autoplay_delay = int(hero_block['autoplay_delay'])
        except (ValueError, TypeError):
            autoplay_delay = 5000
        
        return {
            'title': hero_block.get('hero_title', 'Transform your<br/>outdoor dreams'),
            'cta': {
                'text': hero_block.get('cta_text', 'Get a Free Site Visit'),
                'link': hero_block.get('cta_link', '#contact'),
            },
            'background': background_data,
            'slides': slides_data,
            'settings': {
                'autoplay_enabled': hero_block.get('autoplay_enabled', True),
                'autoplay_delay': autoplay_delay,
            }
        }

    @property
    def body_content_data(self):
        """
        Transform body StreamField blocks to frontend-compatible format with proper image URLs
        """
        if not self.body:
            return []
            
        body_data = []
        
        for block in self.body:
            block_data = {
                'type': block.block_type,
                'id': f"{block.block_type}_{block.id}",
                'value': {}
            }
            
            if block.block_type == 'residential_projects':
                block_data['value'] = self._serialize_projects_block(block.value)
            elif block.block_type == 'commercial_projects':
                block_data['value'] = self._serialize_projects_block(block.value)
            elif block.block_type == 'horizontal_slider':
                block_data['value'] = self._serialize_horizontal_slider_block(block.value)
            elif block.block_type == 'multi_image_content':
                block_data['value'] = self._serialize_multi_image_content_block(block.value)
            else:
                # Fallback for unknown block types
                block_data['value'] = dict(block.value) if hasattr(block.value, 'items') else block.value
                
            body_data.append(block_data)
            
        return body_data
    
    def _serialize_projects_block(self, block_value):
        """Serialize residential/commercial projects blocks with proper image URLs"""
        projects_data = []
        
        for project in block_value.get('projects', []):
            project_data = {
                'title': project.get('title', ''),
                'description': project.get('description', ''),
                'button_text': project.get('button_text', 'Learn More'),
                'is_external_link': project.get('is_external_link', False),
                'external_url': project.get('external_url', ''),
            }
            
            # Handle page link
            if project.get('page_link'):
                try:
                    page_url = '/'
                    if hasattr(project['page_link'], 'url'):
                        page_url = project['page_link'].url
                    elif hasattr(project['page_link'], 'get_url'):
                        page_url = project['page_link'].get_url()
                    project_data['page_link'] = {
                        'id': project['page_link'].id,
                        'title': project['page_link'].title,
                        'url': page_url
                    }
                except:
                    project_data['page_link'] = None
            else:
                project_data['page_link'] = None
            
            # Handle project image with global config - detect block type dynamically  
            if project.get('image'):
                # Use the correct block type for this serialization call
                block_type = 'commercial_projects' if 'commercial' in str(type(self)).lower() else 'residential_projects'
                project_data['image'] = generate_responsive_image_data(
                    project['image'], 'residential_projects', 'projects.image'  # Both use same config anyway
                )
            else:
                project_data['image'] = None
                
            projects_data.append(project_data)
        
        return {
            'title': block_value.get('title', ''),
            'subtitle': block_value.get('subtitle', ''),
            'projects': projects_data
        }
    
    
    def _serialize_horizontal_slider_block(self, block_value):
        """Serialize horizontal slider block"""
        slides_data = []
        
        for slide in block_value.get('slides', []):
            slide_data = {
                'order': slide.get('order', '1'),
                'title': slide.get('title', ''),
                'description': slide.get('description', ''),
                'button_text': slide.get('button_text', 'Learn More'),
                'is_external_link': slide.get('is_external_link', False),
                'external_url': slide.get('external_url', ''),
            }
            
            # Handle page link
            if slide.get('page_link'):
                try:
                    page_url = '/'
                    if hasattr(slide['page_link'], 'url'):
                        page_url = slide['page_link'].url
                    elif hasattr(slide['page_link'], 'get_url'):
                        page_url = slide['page_link'].get_url()
                    slide_data['page_link'] = {
                        'id': slide['page_link'].id,
                        'title': slide['page_link'].title,
                        'url': page_url
                    }
                except:
                    slide_data['page_link'] = None
            else:
                slide_data['page_link'] = None
            
            # Handle slide image with global config
            if slide.get('image'):
                slide_data['image'] = generate_responsive_image_data(
                    slide['image'], 'horizontal_slider', 'slides.image'
                )
            else:
                slide_data['image'] = None
                
            slides_data.append(slide_data)
        
        return {
            'title': block_value.get('title', ''),
            'description': block_value.get('description', ''),
            'slides': slides_data,
            'autoplay_enabled': block_value.get('autoplay_enabled', True),
            'autoplay_delay': block_value.get('autoplay_delay', '3000'),
        }
    
    def _serialize_multi_image_content_block(self, block_value):
        """Serialize multi-image content block for StudioSection.tsx"""
        
        # Serialize images with global configuration
        images_data = []
        for image_block in block_value.get('images', []):
            if image_block.get('image'):
                image_data = generate_responsive_image_data(
                    image_block['image'], 'multi_image_content', 'images.image'
                )
                # Override alt text if provided in block
                if image_block.get('alt_text'):
                    image_data['alt'] = image_block['alt_text']
                images_data.append(image_data)
        
        # Serialize CTA button
        cta_data = {}
        cta_block = block_value.get('cta', {})
        if cta_block:
            cta_data = {
                'button_text': cta_block.get('button_text', 'Get Started'),
                'is_external_link': cta_block.get('is_external_link', False),
                'external_url': cta_block.get('external_url', ''),
            }
            
            # Handle internal page link
            if cta_block.get('page_link'):
                try:
                    page_url = '/'
                    if hasattr(cta_block['page_link'], 'url'):
                        page_url = cta_block['page_link'].url
                    elif hasattr(cta_block['page_link'], 'get_url'):
                        page_url = cta_block['page_link'].get_url()
                    cta_data['page_link'] = {
                        'id': cta_block['page_link'].id,
                        'title': cta_block['page_link'].title,
                        'url': page_url
                    }
                except:
                    cta_data['page_link'] = None
            else:
                cta_data['page_link'] = None
        
        # Convert rich text to formatted text array (preserve paragraphs and line breaks)
        description_text = []
        if block_value.get('description'):
            import re
            rich_text = str(block_value['description'])
            
            # Split by paragraph tags and preserve line breaks
            # Replace <br> tags with line breaks
            rich_text = re.sub(r'<br\s*/?>', '\n', rich_text)
            
            # Split by paragraph tags
            paragraphs = re.split(r'</?p[^>]*>', rich_text)
            
            # Clean up each paragraph and filter out empty ones
            for paragraph in paragraphs:
                # Remove remaining HTML tags but preserve line breaks
                clean_paragraph = re.sub(r'<[^>]+>', '', paragraph).strip()
                if clean_paragraph:
                    description_text.append(clean_paragraph)
        
        return {
            'title': block_value.get('section_title', 'Bring your dream home to life'),
            'subtitle': block_value.get('section_subtitle', ''),
            'description': description_text,
            'images': images_data,
            'cta': cta_data
        }
    
    class Meta:
        verbose_name = "Home Page"