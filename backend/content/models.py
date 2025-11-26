from django.db import models
from django.utils.translation import gettext_lazy as _


class Service(models.Model):
    """Service offered by Hydratech"""
    title_en = models.CharField(max_length=200, verbose_name=_('Title (English)'))
    title_ar = models.CharField(max_length=200, verbose_name=_('Title (Arabic)'))
    description_en = models.TextField(verbose_name=_('Description (English)'))
    description_ar = models.TextField(verbose_name=_('Description (Arabic)'))
    icon = models.CharField(max_length=50, blank=True, help_text=_('Icon name or emoji'))
    order = models.IntegerField(default=0, help_text=_('Display order'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title_en']
        verbose_name = _('Service')
        verbose_name_plural = _('Services')

    def __str__(self):
        return self.title_en


class ProductCategory(models.Model):
    """Product category"""
    name_en = models.CharField(max_length=200, verbose_name=_('Name (English)'))
    name_ar = models.CharField(max_length=200, verbose_name=_('Name (Arabic)'))
    slug = models.SlugField(unique=True, help_text=_('URL-friendly identifier'))
    order = models.IntegerField(default=0, help_text=_('Display order'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name_en']
        verbose_name = _('Product Category')
        verbose_name_plural = _('Product Categories')

    def __str__(self):
        return self.name_en


class Product(models.Model):
    """Product or equipment"""
    category = models.ForeignKey(
        ProductCategory,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name=_('Category')
    )
    name_en = models.CharField(max_length=200, verbose_name=_('Name (English)'))
    name_ar = models.CharField(max_length=200, verbose_name=_('Name (Arabic)'))
    description_en = models.TextField(verbose_name=_('Description (English)'))
    description_ar = models.TextField(verbose_name=_('Description (Arabic)'))
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name=_('Image'))
    is_featured = models.BooleanField(default=False, verbose_name=_('Featured'))
    order = models.IntegerField(default=0, help_text=_('Display order'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name_en']
        verbose_name = _('Product')
        verbose_name_plural = _('Products')

    def __str__(self):
        return self.name_en


class Course(models.Model):
    """Training course"""
    LEVEL_CHOICES = [
        ('beginner', _('Beginner')),
        ('intermediate', _('Intermediate')),
        ('advanced', _('Advanced')),
    ]

    title_en = models.CharField(max_length=200, verbose_name=_('Title (English)'))
    title_ar = models.CharField(max_length=200, verbose_name=_('Title (Arabic)'))
    description_en = models.TextField(verbose_name=_('Description (English)'))
    description_ar = models.TextField(verbose_name=_('Description (Arabic)'))
    duration = models.CharField(max_length=100, blank=True, help_text=_('e.g., "3 weeks" or "40 hours"'))
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner', verbose_name=_('Level'))
    is_featured = models.BooleanField(default=False, verbose_name=_('Featured'))
    icon = models.CharField(max_length=50, blank=True, help_text=_('Icon name or emoji'))
    order = models.IntegerField(default=0, help_text=_('Display order'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title_en']
        verbose_name = _('Course')
        verbose_name_plural = _('Courses')

    def __str__(self):
        return self.title_en


class SiteSettings(models.Model):
    """Site-wide settings (singleton)"""
    company_name_en = models.CharField(max_length=200, default='Hydra Tech', verbose_name=_('Company Name (English)'))
    company_name_ar = models.CharField(max_length=200, default='هيدرا تك', verbose_name=_('Company Name (Arabic)'))
    short_about_en = models.TextField(blank=True, verbose_name=_('Short About (English)'))
    short_about_ar = models.TextField(blank=True, verbose_name=_('Short About (Arabic)'))
    address_en = models.TextField(verbose_name=_('Address (English)'))
    address_ar = models.TextField(verbose_name=_('Address (Arabic)'))
    email = models.EmailField(verbose_name=_('Email'))
    phone1 = models.CharField(max_length=50, verbose_name=_('Phone 1'))
    phone2 = models.CharField(max_length=50, blank=True, verbose_name=_('Phone 2'))
    footer_text_en = models.CharField(max_length=500, blank=True, verbose_name=_('Footer Text (English)'))
    footer_text_ar = models.CharField(max_length=500, blank=True, verbose_name=_('Footer Text (Arabic)'))
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Site Settings')
        verbose_name_plural = _('Site Settings')

    def __str__(self):
        return self.company_name_en

    def save(self, *args, **kwargs):
        # Ensure only one instance exists (singleton pattern)
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class ThreeDPrintingProject(models.Model):
    """3D Printing project or showcase"""
    title_en = models.CharField(max_length=200, verbose_name=_('Title (English)'))
    title_ar = models.CharField(max_length=200, verbose_name=_('Title (Arabic)'))
    description_en = models.TextField(verbose_name=_('Description (English)'))
    description_ar = models.TextField(verbose_name=_('Description (Arabic)'))
    image = models.ImageField(upload_to='3d-printing/', blank=True, null=True, verbose_name=_('Image'))
    is_featured = models.BooleanField(default=False, verbose_name=_('Featured'))
    material = models.CharField(max_length=100, blank=True, help_text=_('e.g., PLA, ABS, PETG'))
    print_time = models.CharField(max_length=100, blank=True, help_text=_('Estimated print time'))
    order = models.IntegerField(default=0, help_text=_('Display order'))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title_en']
        verbose_name = _('3D Printing Project')
        verbose_name_plural = _('3D Printing Projects')

    def __str__(self):
        return self.title_en


class ContactMessage(models.Model):
    """Contact form submissions"""
    STATUS_CHOICES = [
        ('new', _('New')),
        ('read', _('Read')),
        ('replied', _('Replied')),
        ('archived', _('Archived')),
    ]

    name = models.CharField(max_length=200, verbose_name=_('Name'))
    email = models.EmailField(verbose_name=_('Email'))
    phone = models.CharField(max_length=50, blank=True, verbose_name=_('Phone'))
    subject = models.CharField(max_length=300, verbose_name=_('Subject'))
    message = models.TextField(verbose_name=_('Message'))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name=_('Status'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Received At'))
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Contact Message')
        verbose_name_plural = _('Contact Messages')

    def __str__(self):
        return f"{self.name} - {self.subject}"
