from django.urls import path, include
from .views import CoverImagesViewSet,ButtonImagesViewSet,ProductListCreateAPIView, ProductDetailAPIView, CartCreateAPIView, OrderCreateAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'images', CoverImagesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<str:category>/', ProductListCreateAPIView.as_view(), name='product_list_by_category'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('cart/add/', CartCreateAPIView.as_view(), name='cart-create'),
    path('cart/checkout/', OrderCreateAPIView.as_view(), name='order-create'),
] 