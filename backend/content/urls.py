from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'services', views.ServiceViewSet)
router.register(r'product-categories', views.ProductCategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'3d-printing', views.ThreeDPrintingProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('site-settings/', views.SiteSettingsView.as_view(), name='site-settings'),
    path('contact/', views.ContactMessageView.as_view(), name='contact'),
]

