from django.urls import path
from .views import ProductListCreateAPIView, ProductDetailAPIView, CartCreateAPIView, OrderCreateAPIView

urlpatterns = [
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('cart/add/', CartCreateAPIView.as_view(), name='cart-create'),
    path('cart/checkout/', OrderCreateAPIView.as_view(), name='order-create'),
]