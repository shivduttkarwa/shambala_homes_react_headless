from wagtail import blocks
from wagtail.snippets.blocks import SnippetChooserBlock
from wagtail.blocks import PageChooserBlock
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.contrib.table_block.blocks import TableBlock
import re
import urllib.parse

column_width = [
    ('col-lg-1','col-1'),
    ('col-lg-2','col-2'),
    ('col-lg-3','col-3'),
    ('col-lg-4','col-4'),
    ('col-lg-5','col-5'),
    ('col-lg-6','col-6'),
    ('col-lg-7','col-7'),
    ('col-lg-8','col-8'),
    ('col-lg-9','col-9'),
    ('col-lg-10','col-10'),
    ('col-lg-11','col-11'),
    ('col-lg-12','col-12'),
]
column_offset = [
    ('offset-lg-1','offset-1'),
    ('offset-lg-2','offset-2'),
    ('offset-lg-3','offset-3'),
    ('offset-lg-4','offset-4'),
    ('offset-lg-5','offset-5'),
    ('offset-lg-6','offset-6'),

]

top_padding_list =[
    ('pt-0','No padding'),
    ('pt-1','1x'),
    ('pt-2','2x'),
    ('pt-3','3x'),
    ('pt-4','4x'),
    ('pt-5','5x'),
    ('pt-6','6x'),
    ('pt-7','7x'),
]
bottom_padding_list =[
    ('pb-0','No padding'),
    ('pb-1','1x'),
    ('pb-2','2x'),
    ('pb-3','3x'),
    ('pb-4','4x'),
    ('pb-5','5x'),
    ('pb-6','6x'),
    ('pb-7','7x'),
]

button_themes = [
    ('btn btn-solid-white','White Button'),
    #('btn btn-white-outline','White Outline Button'),
    #('btn btn-dark-outline','Dark Green Outline Button'),
    ('btn btn-solid-red','Red Button'),
    ('btn btn-solid-black','Black Button'),
    ('btn-read-more','Link With Icon'),
]
background_list=[
    ('wireframes-image-bg','Grey'),
    ('bg-white','White'),
    ('primary-dark-grey-bg','Eerie Black')
]

class TableItemBlock(blocks.StreamBlock):
    table = TableBlock()


class CustomTableBlock(blocks.StructBlock):
    table_item = TableItemBlock()
    css_class = blocks.CharBlock(required=False, help_text='Table container css class.')

    class Meta:
        label = 'Table'
        template = "pages/blocks/table_block.html"

class HtmlSourceBlock(blocks.StructBlock):
    block_label = blocks.CharBlock(required=False, help_text="This label is for internal reference only and will not be displayed in the output.")
    source = blocks.TextBlock()

    class Meta:
        label = "Html Source"
        icon = "code"
        collapsed = True
        template = "pages/blocks/html_source.html"


class SpaceBlock(blocks.StructBlock):
    height = blocks.IntegerBlock(default=50)
    class Meta:
        label = "Space"
        template = "pages/blocks/space.html"

class DividerBlock(blocks.StructBlock):
    class Meta:
        label = "Divider"
        template = "pages/blocks/divider.html"


class DynamicSnippetChooserBlock(blocks.StructBlock):
    css_class = blocks.CharBlock(required=False, help_text='(optional)')
    content = SnippetChooserBlock('pages.DynamicContentSnippet')

    class Meta:
        label = "Dynamic Content Snippet"
        icon = "snippet"
        # closed =True
        template = "pages/blocks/dynamic_snippet_chooser_block.html"

class ContentBlock(blocks.StructBlock):
    list_style = blocks.ChoiceBlock([
        ('check-list','Checklist'),
    ],default="check-list",required=False)
    content = blocks.RichTextBlock()
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Content"
        template = "pages/blocks/content.html"


class LeadBlock(blocks.StructBlock):
    content = blocks.TextBlock()
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Lead Text"
        template = "pages/blocks/lead_text.html"


class HrefStructValue(blocks.StructValue):
    """Additional logic for our urls."""

    def target(self):
        page_link = self.get('page_link')
        external_link = self.get('external_link')
        document_link = self.get('document_link')
        free_link = self.get('free_link')
        if page_link:
            return ''
        elif external_link:
            return 'target="_blank"'
        elif document_link:
            return 'target="_blank"'
        elif free_link:
            return ''

        return ''

    def detail(self):
        page_link = self.get('page_link')
        external_link = self.get('external_link')
        document_link = self.get('document_link')
        free_link = self.get('free_link')

        if document_link:
            document_size = document_link.file.size / 1024 #bytes to kb
            size_type = 'KB'
            if (document_size  > 1024):
                document_size = document_size / 1024 #kb to mb
                size_type = 'MB'

            if (document_size > 1024):
                document_size = document_size / 1024 #mb to gb
                size_type = 'gb'

            return {'size':float(document_size),'type':str(size_type)}
        elif external_link:
            return ''
        elif page_link:
            return ''
        elif free_link:
            return ''

    def url(self):
        page_link = self.get('page_link')
        external_link = self.get('external_link')
        document_link = self.get('document_link')
        free_link = self.get('free_link')
        if page_link:
            return page_link.url
        elif external_link:
            return external_link
        elif document_link:
            return document_link.url
        elif free_link:
            return free_link
        return 'javascript:void(0);'

    def is_url(self):
        page_link = self.get('page_link')
        external_link = self.get('external_link')
        document_link = self.get('document_link')
        free_link = self.get('free_link')
        if page_link:
            return True
        elif external_link:
            return True
        elif document_link:
            return True
        elif free_link:
            return True
        return False



class HrefBlock(blocks.StructBlock):
    page_link = PageChooserBlock(required=False)
    external_link = blocks.URLBlock(required=False)
    document_link = DocumentChooserBlock(required=False)
    free_link = blocks.CharBlock(required=False,help_text='eg. email or phone or #hash')

    class Meta:
        icon = "link"
        label = "Urls"
        #form_template = "pages/blocks/admin/href_block.html"
        value_class = HrefStructValue

"""
#Note- do not add theme option to this block.
make new block for theme buttons
"""
class HeadingBlock(blocks.StructBlock):
    heading = blocks.RichTextBlock(features=['h1','h2','h3','h4','h5','h6','italic'])
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label= "Heading"
        template = "pages/blocks/heading_block.html"

class SimpleButton(blocks.StructBlock):
    text = blocks.CharBlock(required=False)
    href =  HrefBlock()
    class Meta:
        label = "Simple Button"
        template = "pages/blocks/simple_button.html"


class ThemeButton(blocks.StructBlock):
    theme = blocks.ChoiceBlock(button_themes, required=False)
    text = blocks.CharBlock(label="Button Label", required=False)
    href = HrefBlock()
    class Meta:
        label = "Theme Button"
        template = "pages/blocks/theme_button.html"

class MultipleButtons(blocks.StructBlock):
    buttons = blocks.ListBlock(blocks.StructBlock([
        ('button',ThemeButton())
    ]))
    class Meta:
        label = "Multiple theme buttons"
        template = "pages/blocks/multiple_theme_button.html"

class LeadTextWithButtonBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    text = blocks.TextBlock()
    button = SimpleButton()
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Lead Text With Button"
        template = "pages/blocks/lead_text_with_button.html"

class DynamicSnippetChooserBlock(blocks.StructBlock):
    css_class = blocks.CharBlock(required=False, help_text='(optional)')
    content = SnippetChooserBlock('pages.DynamicContentSnippet')

    class Meta:
        label = "Dynamic Content Snippet"
        icon = "snippet"
        # closed =True
        template = "pages/blocks/dynamic_snippet_chooser_block.html" 

class QuoteBlock(blocks.StructBlock):
    quote = blocks.TextBlock()
    class Meta:
        label = "Quote"
        template = "pages/blocks/quote_block.html"

class QuotewithAuthorBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    title = blocks.CharBlock()
    quote = blocks.TextBlock()
    avtar_image = ImageChooserBlock(required=False)
    author = blocks.CharBlock(required=False)
    position = blocks.CharBlock(required=False)
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Quote with Author"
        template = "pages/blocks/quote_with_author_block.html"

class FullWidthQuoteBlock(blocks.StructBlock):
    quote = blocks.TextBlock()
    avtar_image = ImageChooserBlock(required=False)
    author = blocks.CharBlock(required=False)
    position = blocks.CharBlock(required=False)
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Fullwidth Quote with Author"
        template = "pages/blocks/quote_fullwidth_block.html"

class TwoColumnContent(blocks.StructBlock):
    left_column = blocks.StreamBlock([
        ('heading',HeadingBlock()),
        ('content',ContentBlock()),
        ('html',HtmlSourceBlock())
    ])
    right_column = blocks.StreamBlock([
        ('heading',HeadingBlock()),
        ('content',ContentBlock()),
        ('html',HtmlSourceBlock())
    ])

    class Meta:
        template = 'pages/blocks/two_column_content.html'
        icon = 'grip'
        label = 'Two Column content'

class VideoInformation(blocks.StructValue):
    def is_youtube(self):
        video_url = self.get('video_url')
        parsed_url = urllib.parse.urlparse(video_url)
        domain = parsed_url.netloc.lower()

        # Check for YouTube
        youtube_patterns = [
            r'youtube\.com',
            r'youtu\.be',
            r'youtube-nocookie\.com'
        ]

        flag = False

        for pattern in youtube_patterns:
            if re.search(pattern, domain):
                flag = True

        return flag

    def is_html5(self):
        video_url = self.get('video_url')
        flag = False
        if any(ext in video_url.lower() for ext in ['.mp4', '.webm', '.ogg', '.mov']):
            flag = True

        return flag

    def is_vimeo(self):
        video_url = self.get('video_url')
        parsed_url = urllib.parse.urlparse(video_url)
        domain = parsed_url.netloc.lower()
        # Vimeo patterns
        flag = False
        if 'vimeo.com' in domain:
            flag = True

        return flag



    def video_type(self):
        if self.is_youtube():
            return 'youtube'

        if self.is_html5():
            return 'html5'

        if self.is_vimeo():
            return 'vimeo'

        # Default if no match
        return 'unknown'

class VideoBlock(blocks.StructBlock):
    video_url = blocks.TextBlock(help_text="Enter the video URL")
    poster_image = ImageChooserBlock(required=False)
    is_autoplay = blocks.BooleanBlock(required=False, help_text="Make this video autoplay")
    class Meta:
        label = "Video"
        template = "pages/blocks/video_block.html"
        value_class = VideoInformation

class ProfileBlock(blocks.StructBlock):
    signature = ImageChooserBlock(required=False)
    name = blocks.CharBlock()
    position = blocks.CharBlock(required=False)
    image = ImageChooserBlock(required=False)

    class Meta:
        template = 'pages/blocks/profile_block.html'
        label = 'Profile'

class AccordionBlock(blocks.StructBlock):
    items = blocks.ListBlock(blocks.StructBlock([
            ('title',blocks.CharBlock()),
            ('content_blocks',blocks.StreamBlock([
                ('html',HtmlSourceBlock()),
                ('content',ContentBlock()),
                ('heading',HeadingBlock()),
                ('space',SpaceBlock()),
                ('table',CustomTableBlock()),
                ('button',ThemeButton()),
                ('multiple_button',MultipleButtons()),
            ])),
        ])
    )
    class Meta:
        label = "Accordion"
        template = "pages/blocks/accordion_block.html"

class ContentStreamBlock(blocks.StreamBlock):
    html = HtmlSourceBlock()
    heading =HeadingBlock()
    content = ContentBlock()
    space = SpaceBlock()
    accordion = AccordionBlock()
    quote = QuoteBlock()
    table = CustomTableBlock()
    button =ThemeButton()
    multiple_button =MultipleButtons()
    lead=LeadBlock()
    divider=DividerBlock()
    two_column=TwoColumnContent()
    profile = ProfileBlock()

class ContentWithVariableWidthBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    column_width = blocks.ChoiceBlock(column_width,default="col-lg-12")
    column_offset = blocks.ChoiceBlock(column_offset,required=False)
    background = blocks.ChoiceBlock(background_list,required=False)
    content_blocks = ContentStreamBlock()
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Content with variable width"
        template = "pages/blocks/content_with_variable_width_block.html"


class TwoColumnBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    background = blocks.ChoiceBlock(background_list,required=False)
    left_column_width = blocks.ChoiceBlock(column_width,required=False,default='col-lg-6')
    left_column_offset = blocks.ChoiceBlock(column_offset,required=False)
    left_column = ContentStreamBlock()
    right_column_width = blocks.ChoiceBlock(column_width,required=False,default='col-lg-6')
    right_column_offset = blocks.ChoiceBlock(column_offset,required=False)
    right_column = ContentStreamBlock()
    css_class = blocks.CharBlock(required=False)

    class Meta:
        template = 'pages/blocks/two_column_block.html'
        icon = 'grip'
        label = 'Two Columns'


class SliderGalleryBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    items = blocks.ListBlock(blocks.StructBlock([
        ('image',ImageChooserBlock()),
        ('caption',blocks.CharBlock(required=False))
    ]))
    class Meta:
        label = "Center Slider"
        template = "pages/blocks/slider_gallery_block.html"



class FullwidthImageBlock(blocks.StructBlock):
    image = ImageChooserBlock()
    caption= blocks.CharBlock(required=False)
    class Meta:
        label = "Fullwidth Image"
        template = "pages/blocks/fullwidth_image_block.html"


class ContentWithImageAlignmentOption(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    background = blocks.ChoiceBlock(background_list,required=False,default="primary-dark-grey-bg")
    image = ImageChooserBlock()
    alignment = blocks.ChoiceBlock([
        ('left','Left image with right content'),
        ('right','Left content with right image')
    ])
    content = blocks.StreamBlock([
        ('heading',HeadingBlock()),
        ('html',HtmlSourceBlock()),
        ('content',ContentBlock()),
        ('quote',QuoteBlock()),
        ('button',ThemeButton()),
    ])
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Content with image alignment option"
        template = "pages/blocks/content_with_image_alignment_option_block.html"


class ContentWithVideoAlignmentOption(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    background = blocks.ChoiceBlock(background_list,required=False,default="primary-dark-grey-bg")
    video_url = blocks.URLBlock()
    poster_image = ImageChooserBlock(required=False)
    alignment = blocks.ChoiceBlock([
        ('left','Left video with right content'),
        ('right','Left content with right video')
    ])
    content = blocks.StreamBlock([
        ('heading',HeadingBlock()),
        ('html',HtmlSourceBlock()),
        ('content',ContentBlock()),
        ('quote',QuoteBlock()),
        ('button',ThemeButton()),
    ])
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Content with video alignment option"
        template = "pages/blocks/content_with_video_alignment_option_block.html"


class NextPreviousBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=False)
    class Meta:
        label = "Previous / Next Grid"
        template = "pages/blocks/prev_next_block.html"

class QuickLinksGridBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=False)
    items = blocks.ListBlock(blocks.StructBlock([
        ('page',PageChooserBlock()),
    ]))
    class Meta:
        label = "Quick Links Grid"
        group = 'Card Grid'
        template = "pages/blocks/quick_links_grid_block.html"

class GalleryBlock(blocks.StructBlock):
    layout = blocks.ChoiceBlock([
        ('col-lg-4','Three Column'),
        ('col-lg-3','Four Column')
    ],label="layout",default="col-lg-3")
    title = blocks.CharBlock(required=False)
    photo_gallery = SnippetChooserBlock('pages.PhotoGallery')
    class Meta:
        label = "Photo Gallery Grid (snippet)"
        template = "pages/blocks/photo_gallery_grid.html"


class FullwidthImagewithButtonBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    items = blocks.ListBlock(blocks.StructBlock([
        ('title',blocks.CharBlock()),
        ('text',blocks.TextBlock(required=False)),
        ('image',ImageChooserBlock()),
        ('left_button',SimpleButton()),
        ('right_button',ThemeButton()),
    ]))
    css_class = blocks.CharBlock(required=False)

    class Meta:
        template = 'pages/blocks/fullwidth_image_with_button_block.html'
        label = 'Fullwidth Image With overlay and Buttons (Slider)'


class ExploreMoreGridBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    title = blocks.CharBlock(required=False)
    landing_page = PageChooserBlock()
    limit = blocks.IntegerBlock(default=10)
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Child Pages Thumbnail Grid"
        group = 'Card Grid'
        template = "pages/blocks/explore_more_grid_block.html"


class CardGridwithTitleBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    title = blocks.CharBlock(required=False)
    button = SimpleButton()
    items = blocks.ListBlock(blocks.StructBlock([
        ('title',blocks.CharBlock()),
        ('image',ImageChooserBlock()),
        ('href',HrefBlock()),
    ]))
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Card Grid with Title (Slider)"
        group = 'Card Grid'
        template = "pages/blocks/card_grid_with_title.html"


class CardGridwithTitleandTextBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(bottom_padding_list,required=False)
    title = blocks.CharBlock(required=False)
    button = SimpleButton()
    items = blocks.ListBlock(blocks.StructBlock([
        ('title',blocks.CharBlock()),
        ('text',blocks.TextBlock(required=False)),
        ('image',ImageChooserBlock()),
        ('video_url',blocks.TextBlock(required=False)),
        ('href',HrefBlock()),
    ]))
    css_class = blocks.CharBlock(required=False)
    class Meta:
        label = "Card Grid with Title and Text (Slider)"
        group = 'Card Grid'
        template = "pages/blocks/card_grid_with_title_and_text.html"

class LatestNewsBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(choices=top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(choices=bottom_padding_list,required=False)
    title = blocks.CharBlock(required=False)
    button = SimpleButton()
    category = SnippetChooserBlock('news.Category',required=False)
    limit = blocks.IntegerBlock(required=False, default=3, help_text="Number of items to show")

    class Meta:
        label = "Latest News"
        closed = True
        template = "pages/blocks/latest_news_block.html"


class LatestBlogBlock(blocks.StructBlock):
    top_padding = blocks.ChoiceBlock(choices=top_padding_list,required=False)
    bottom_padding = blocks.ChoiceBlock(choices=bottom_padding_list,required=False)
    title = blocks.CharBlock(required=False)
    button = SimpleButton()
    category = SnippetChooserBlock('blog.Category',required=False)
    limit = blocks.IntegerBlock(required=False, default=3, help_text="Number of items to show")
    is_slider = blocks.BooleanBlock(required=False, help_text="Enable this option to display items in a slider carousel.")

    class Meta:
        label = "Latest Blog"
        closed = True
        template = "pages/blocks/latest_blog_block.html"