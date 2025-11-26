from django.contrib import admin
from .models import Service, ProductCategory, Product, Course, SiteSettings, ThreeDPrintingProject, ContactMessage


# Customize the default admin site
admin.site.site_header = "Hydratech Administration"
admin.site.site_title = "Hydratech Admin"
admin.site.index_title = "Welcome to Hydratech Admin Panel"


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_ar', 'icon', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    list_filter = ['created_at']
    ordering = ['order', 'title_en']
    
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar')
        }),
        ('Settings', {
            'fields': ('icon', 'order')
        }),
    )


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_ar', 'slug', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['name_en', 'name_ar']
    prepopulated_fields = {'slug': ('name_en',)}
    ordering = ['order', 'name_en']
    
    fieldsets = (
        ('English Content', {
            'fields': ('name_en',)
        }),
        ('Arabic Content', {
            'fields': ('name_ar',)
        }),
        ('Settings', {
            'fields': ('slug', 'order')
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_ar', 'category', 'is_featured', 'order', 'created_at']
    list_filter = ['category', 'is_featured', 'created_at']
    list_editable = ['order', 'is_featured']
    search_fields = ['name_en', 'name_ar', 'description_en', 'description_ar']
    ordering = ['order', 'name_en']
    
    fieldsets = (
        ('Category', {
            'fields': ('category',)
        }),
        ('English Content', {
            'fields': ('name_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('name_ar', 'description_ar')
        }),
        ('Media & Settings', {
            'fields': ('image', 'is_featured', 'order')
        }),
    )


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_ar', 'level', 'duration', 'is_featured', 'order', 'created_at']
    list_filter = ['level', 'is_featured', 'created_at']
    list_editable = ['order', 'is_featured']
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    ordering = ['order', 'title_en']
    
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar')
        }),
        ('Course Details', {
            'fields': ('duration', 'level', 'icon')
        }),
        ('Settings', {
            'fields': ('is_featured', 'order')
        }),
    )


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Singleton pattern - only one instance allowed
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion
        return False
    
    fieldsets = (
        ('Company Information (English)', {
            'fields': ('company_name_en', 'short_about_en', 'address_en')
        }),
        ('Company Information (Arabic)', {
            'fields': ('company_name_ar', 'short_about_ar', 'address_ar')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone1', 'phone2')
        }),
        ('Footer', {
            'fields': ('footer_text_en', 'footer_text_ar')
        }),
    )


@admin.register(ThreeDPrintingProject)
class ThreeDPrintingProjectAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_ar', 'material', 'print_time', 'is_featured', 'order', 'created_at']
    list_filter = ['is_featured', 'created_at']
    list_editable = ['order', 'is_featured']
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    ordering = ['order', 'title_en']
    
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar')
        }),
        ('Project Details', {
            'fields': ('material', 'print_time', 'image')
        }),
        ('Settings', {
            'fields': ('is_featured', 'order')
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    list_editable = ['status']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message Details', {
            'fields': ('subject', 'message', 'created_at')
        }),
        ('Status', {
            'fields': ('status',)
        }),
    )
    
    def has_add_permission(self, request):
        # Don't allow adding messages through admin (they come from form)
        return False
