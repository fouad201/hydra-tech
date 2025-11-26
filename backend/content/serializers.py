from rest_framework import serializers
from .models import Service, ProductCategory, Product, Course, SiteSettings, ThreeDPrintingProject, ContactMessage


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title_en', 'title_ar', 'description_en', 'description_ar',
            'icon', 'order', 'created_at', 'updated_at'
        ]


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = [
            'id', 'name_en', 'name_ar', 'slug', 'order',
            'created_at', 'updated_at'
        ]


class ProductSerializer(serializers.ModelSerializer):
    category_name_en = serializers.CharField(source='category.name_en', read_only=True)
    category_name_ar = serializers.CharField(source='category.name_ar', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_name_en', 'category_name_ar', 'category_slug',
            'name_en', 'name_ar', 'description_en', 'description_ar',
            'image', 'is_featured', 'order', 'created_at', 'updated_at'
        ]


class CourseSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title_en', 'title_ar', 'description_en', 'description_ar',
            'duration', 'level', 'level_display', 'is_featured', 'icon',
            'order', 'created_at', 'updated_at'
        ]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'id', 'company_name_en', 'company_name_ar',
            'short_about_en', 'short_about_ar',
            'address_en', 'address_ar',
            'email', 'phone1', 'phone2',
            'footer_text_en', 'footer_text_ar',
            'updated_at'
        ]


class ThreeDPrintingProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreeDPrintingProject
        fields = [
            'id', 'title_en', 'title_ar', 'description_en', 'description_ar',
            'image', 'is_featured', 'material', 'print_time',
            'order', 'created_at', 'updated_at'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

