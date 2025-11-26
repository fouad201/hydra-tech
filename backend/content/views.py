from rest_framework import viewsets, generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.core.mail import send_mail
from django.conf import settings
from .models import Service, ProductCategory, Product, Course, SiteSettings, ThreeDPrintingProject, ContactMessage
from .serializers import (
    ServiceSerializer, ProductCategorySerializer, ProductSerializer,
    CourseSerializer, SiteSettingsSerializer, ThreeDPrintingProjectSerializer, ContactMessageSerializer
)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for services.
    Supports list and detail views.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for product categories.
    """
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for products.
    Supports filtering by category slug and featured status.
    """
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'is_featured']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', 'name_en']


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for courses.
    Supports filtering by level and featured status.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['level', 'is_featured']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', 'title_en']


class SiteSettingsView(generics.RetrieveAPIView):
    """
    API endpoint for site settings (singleton).
    """
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return SiteSettings.load()


class ThreeDPrintingProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for 3D printing projects.
    Supports filtering by featured status.
    """
    queryset = ThreeDPrintingProject.objects.all()
    serializer_class = ThreeDPrintingProjectSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_featured']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', 'title_en']


class ContactMessageView(generics.CreateAPIView):
    """
    API endpoint for contact form submissions.
    Accepts POST requests and sends email notification.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the contact message
        contact_message = serializer.save()
        
        # Send email notification
        try:
            site_settings = SiteSettings.load()
            recipient_email = site_settings.email
            
            # Email to admin
            admin_subject = f'New Contact Form Submission: {contact_message.subject}'
            admin_message = f"""
New contact form submission from Hydratech website:

Name: {contact_message.name}
Email: {contact_message.email}
Phone: {contact_message.phone or 'Not provided'}
Subject: {contact_message.subject}

Message:
{contact_message.message}

---
Received at: {contact_message.created_at}
            """
            
            send_mail(
                admin_subject,
                admin_message,
                settings.DEFAULT_FROM_EMAIL,
                [recipient_email],
                fail_silently=False,
            )
            
            # Auto-reply to customer
            customer_subject = 'Thank you for contacting Hydratech'
            customer_message = f"""
Dear {contact_message.name},

Thank you for contacting Hydratech. We have received your message regarding "{contact_message.subject}".

Our team will review your inquiry and get back to you as soon as possible.

Best regards,
Hydratech Team

---
This is an automated response. Please do not reply to this email.
            """
            
            send_mail(
                customer_subject,
                customer_message,
                settings.DEFAULT_FROM_EMAIL,
                [contact_message.email],
                fail_silently=True,
            )
            
        except Exception as e:
            print(f"Error sending email: {e}")
            # Don't fail the request if email fails
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                'success': True,
                'message': 'Thank you for your message. We will contact you soon!',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )
