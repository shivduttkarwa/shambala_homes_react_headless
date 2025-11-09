from django.db import models
from wagtail.models import Page, Collection, Orderable
from django_extensions.db.fields import AutoSlugField
from pages.fields import content_holder_stream_fields
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, InlinePanel,MultipleChooserPanel
from wagtail.images.models import Image
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.models import ClusterableModel
from wagtail.admin.panels import PageChooserPanel
from wagtail.images import get_image_model_string
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from pages.fields import generalpage_stream_fields,landingpage_stream_fields
from django import forms
from home.models import HeroAbstract, PageAbstract
from wagtail.contrib.forms.models import AbstractEmailForm, AbstractFormField, FORM_FIELD_CHOICES
from wagtail.admin.panels import (
    FieldPanel, FieldRowPanel,
    InlinePanel, MultiFieldPanel
)

import json
from os.path import splitext
from wagtail.contrib.forms.forms import FormBuilder
from wagtail.images.fields import WagtailImageField
from django.core.serializers.json import DjangoJSONEncoder
from wagtail.images import get_image_model
from wagtail.documents import get_document_model
from django.utils.html import format_html
from django.urls import reverse
from django.forms import FileField, CharField, ChoiceField
from django import forms
from wagtail.contrib.forms.views import SubmissionsListView
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.template import Context,Template
from pages.utils import is_email_valid

class BlockCatalog(models.Model):
    title = models.CharField(null=True,blank=False,max_length=500)
    image = models.ForeignKey(
        Image, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='+'
    )
     
    @property
    def image_preview(self):
        if self.image:
            return format_html(
                '<img src="{}"  width=300  style="object-fit: cover; border-radius:4px;" />',
                self.image.get_rendition("original").url
            )
        return "No Image"
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Block Catalog'
        verbose_name_plural = 'Blocks Catalog'


# Create your models here.
class ContentHolder(models.Model):
    title = models.CharField(null=True,blank=False,max_length=255)
    slug = AutoSlugField(populate_from='title',editable=True, null=True,max_length=500)
    content = models.TextField(null=True,blank=True)

    def download_button(self):
        url = reverse("download_contentholder", args=[self.pk])
        return format_html('<a class="button button-small" href="{}">Download</a>', url)

    download_button.short_description = "Backup"

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Content Holders"

class DynamicContentSnippet(models.Model):
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="title", editable=True)
    content = StreamField(content_holder_stream_fields, null=True, blank=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('slug'),
        FieldPanel('content'),
    ]

    class Meta:
        verbose_name = 'Dynamic Content Snippet'
        verbose_name_plural = 'Dynamic Content Snippets'

    def __str__(self):
        return self.title 
    

class PhotoGallery(ClusterableModel,models.Model):
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="title", editable=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('slug'),
        MultipleChooserPanel(
            'photo_gallery', label="Gallery images", chooser_field_name="image"
        )
    ]

    def get_images(self):
        if self.photo_gallery.all():
            return self.photo_gallery.all()
        
        return False

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Photo Gallery"
        verbose_name_plural = "Photo Galleries"

class GalleryImage(Orderable):
    page = ParentalKey('pages.PhotoGallery', on_delete=models.CASCADE, related_name='photo_gallery')
    image = models.ForeignKey('wagtailimages.Image', on_delete=models.CASCADE)
    caption = models.CharField(max_length=255, blank=True)

    panels = [
        FieldPanel('image'),
        FieldPanel('caption'),
    ]    

class LandingpageHero(HeroAbstract):
    page = ParentalKey('LandingPage', related_name='landingpage_hero')

class LandingPage(PageAbstract, Page):
    body = StreamField(landingpage_stream_fields,null=True,blank=True)

    template = 'pages/landing_page.html'
    class Meta:
        verbose_name = 'Landing Page'

    def get_hero(self):
        if self.landingpage_hero.all():
            return self.landingpage_hero.all()
        else:
            return False
        
    def get_hero_image(self):
        if self.get_hero():
            return self.get_hero()[0]
        
    
    def get_child_pages(self):
        return self.get_children().live().filter(show_in_menus=True)
        
     

class GeneralpageHero(HeroAbstract):
    page = ParentalKey('GeneralPage', related_name='generalpage_hero')

class GeneralPage(PageAbstract, Page):
    body = StreamField(generalpage_stream_fields,null=True,blank=True)

    class Meta:
        verbose_name = "Internal Page"

    def get_hero(self):
        if self.generalpage_hero.all():
            return self.generalpage_hero.all()
        else:
            return False
    
    def get_hero_image(self):
        if self.get_hero():
            return self.get_hero()[0]
        

"""
Form page template
"""        




class CustomFormBuilder(FormBuilder):
    def create_image_field(self, field, options):
        return WagtailImageField(**options)

    def create_document_field(self, field, options):
        return FileField(**options)
    
    def create_heading_field(self, field, options):
        return CharField(widget=forms.HiddenInput(attrs={'data_type': 'heading'}), **options)    

    
class FormField(AbstractFormField):
    field_type = models.CharField(
        verbose_name='field type',
        max_length=16,
        choices=list(FORM_FIELD_CHOICES) +
        [
            ('image', 'Upload Image'), ('document', 'File Upload'),
            ('heading', 'Heading')
        ]
    )
    page = ParentalKey('FormPage', on_delete=models.CASCADE, related_name='form_fields')   
    autoresponder_email_field = models.BooleanField("Autoresponder email field", default=False)
    autoresponder_salutation_field = models.BooleanField("Autoresponder salutation field", default=False)
    autoresponder_first_name_field = models.BooleanField("Autoresponder first name field", default=False)
    autoresponder_last_name_field = models.BooleanField("Autoresponder last name field", default=False)

    panels = AbstractFormField.panels + [
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('autoresponder_email_field', classname='col6'),
                FieldPanel('autoresponder_salutation_field', classname='col6'),
            ]),
            FieldRowPanel([
                FieldPanel('autoresponder_first_name_field', classname='col6'),
                FieldPanel('autoresponder_last_name_field', classname='col6'),
            ]),
        ])
    ]

class CustomSubmissionsListView(SubmissionsListView):

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if not self.is_export:
            # generate a list of field types, the first being the injected 'submission date'
            field_types = ['submission_date'] + \
                [field.field_type for field in self.form_page.get_form_fields()]
            data_rows = context['data_rows']

            ImageModel = get_image_model()
            DocumentModel = get_document_model()

            for data_row in data_rows:

                fields = data_row['fields']

                for idx, (value, field_type) in enumerate(zip(fields, field_types)):
                    if field_type == 'image' and value:
                        image = ImageModel.objects.get(pk=value)
                        rendition = image.get_rendition(
                            'fill-100x75|jpegquality-40')
                        preview_url = rendition.url
                        url = reverse('wagtailimages:edit', args=(image.id,))
                        # build up a link to the image, using the image title & id
                        fields[idx] = format_html(
                            "<a href='{}'><img alt='Uploaded image - {}' src='{}' /></a>",
                            url,
                            image.title,
                            preview_url,
                        )
                    elif field_type == 'document' and value:
                        document = DocumentModel.objects.get(pk=value)
                        url = reverse('wagtaildocs:edit', args=(document.id,))
                        fields[idx] = format_html(
                            "<a href='{}'>{}</a>",
                            url,
                            document.title,
                        )

        return context
    
class FormPage(PageAbstract, AbstractEmailForm):
    form_builder = CustomFormBuilder
    submissions_list_view_class = CustomSubmissionsListView
    top_body = StreamField(generalpage_stream_fields,null=True,blank=True)
    bottom_body = StreamField(generalpage_stream_fields,null=True,blank=True)
    thankyou_message = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        InlinePanel('form_fields', label="Form fields"),
        FieldPanel('thankyou_message'),
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('from_address', classname="col6"),
                FieldPanel('to_address', classname="col6"),
            ]),
            FieldPanel('subject'),
        ], "Email"),
    ]

    def get_form_fields(self):
        return self.form_fields.all()

    def get_uploaded_image_collection(self):
        """
        Returns a Wagtail Collection, using this form's saved value if present,
        otherwise returns the 'Root' Collection.
        """
       # collection = self.uploaded_image_collection
        collection = Collection.objects.get(name__exact='uploads')
        return collection or Collection.get_first_root_node()

    @staticmethod
    def get_image_title(filename):
        """
        Generates a usable title from the filename of an image upload.
        Note: The filename will be provided as a 'path/to/file.jpg'
        """

        if filename:
            result = splitext(filename)[0]
            result = result.replace('-', ' ').replace('_', ' ')
            return result.title()
        return ''    

    def process_form_submission(self, form):
        """
        Processes the form submission, if an Image upload is found, pull out the
        files data, create an actual Wgtail Image and reference its ID only in the
        stored form response.
        """

        cleaned_data = form.cleaned_data
        document_list = []
        images_list = []
        for name, field in form.fields.items():
            if isinstance(field, WagtailImageField):
                image_file_data = cleaned_data[name]
                if image_file_data:
                    ImageModel = get_image_model()

                    kwargs = {
                        'file': cleaned_data[name],
                        'title': self.get_image_title(cleaned_data[name].name),
                        'collection': self.get_uploaded_image_collection(),
                    }

                    if form.user and not form.user.is_anonymous:
                        kwargs['uploaded_by_user'] = form.user

                    image = ImageModel(**kwargs)
                    image.save()
                    # saving the image id
                    # alternatively we can store a path to the image via image.get_rendition
                    cleaned_data.update({name: image.pk})
                    print(image)
                    images_list.append(image.pk)
                else:
                    # remove the value from the data
                    del cleaned_data[name]

            elif isinstance(field, FileField):
                document_file_data = cleaned_data[name]
                if document_file_data:
                    DocumentModel = get_document_model()
                    kwargs = {
                        'file': cleaned_data[name],
                        'title': self.get_image_title(cleaned_data[name].name),
                        'collection': self.get_uploaded_image_collection(),
                    }

                    if form.user and not form.user.is_anonymous:
                        kwargs['uploaded_by_user'] = form.user

                    document = DocumentModel(**kwargs)
                    document.save()
                   # print(document)
                    document_list.append(document.pk)
                    cleaned_data.update({name: document.pk})
                else:
                    # remove the value from the data
                    del cleaned_data[name]

        submission = self.get_submission_class().objects.create(
            form_data=form.cleaned_data, # new
            page=self
        )
        self.send_autoresponder(form)
        self.send_mail(form,document_list,images_list)
        return submission    

    class Meta:
        verbose_name = "Form Page"

    
    def send_mail(self, form):
        addresses = [x.strip() for x in self.to_address.split(',')]
        content = []
        for field in form:
            if not field.name == 'wagtailcaptcha':
                value = field.value()
                if isinstance(value, list):
                    value = ', '.join(value)
                content.append('<p><strong>{}:</strong> {}</p>'.format(field.label, value))

        content = '\n'.join(content)
        content = content.replace("<br>", "").replace("<br />", "")
        text_content = strip_tags(content)
        mail = EmailMultiAlternatives(self.subject, text_content, self.from_address, addresses)
        html_message = content
        if html_message:
            mail.attach_alternative(html_message, 'text/html')
        return mail.send()
        # send_mail(self.subject, content, addresses, self.from_address, html_message=content)

    def send_autoresponder(self, form):
        auto_responder_field = self.custom_form_fields.filter(autoresponder_email_field=True).first()
        salutation = self.custom_form_fields.filter(autoresponder_salutation_field=True).first()
        first_name = self.custom_form_fields.filter(autoresponder_first_name_field=True).first()
        last_name = self.custom_form_fields.filter(autoresponder_last_name_field=True).first()
        salutation_value = form.cleaned_data.get(salutation.clean_name) if salutation else ""
        first_name_value = form.cleaned_data.get(first_name.clean_name) if first_name else ""
        last_name_value = form.cleaned_data.get(last_name.clean_name) if last_name else ""
        if self.autoresponder_from_email and auto_responder_field:
            from_address = self.autoresponder_from_email.strip()
            html = self.autoresponder_content
            context = {'salutation': salutation_value, 'first_name': first_name_value, 'last_name': last_name_value}
            html_content = Template(html).render(Context(context))
            text_content = strip_tags(html_content)
            auto_field_name = auto_responder_field.clean_name
            to_email = form.cleaned_data.get(auto_field_name)
            if to_email and is_email_valid(to_email):
                mail = EmailMultiAlternatives(self.autoresponder_subject, text_content, from_address, [to_email])
                if html_content:
                    mail.attach_alternative(html_content, 'text/html')
                mail.send(fail_silently=True)  

        