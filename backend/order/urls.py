from django.urls import path
from .views import ProductListView, ProductDetailView, AddToCartView, CheckoutView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/checkout/', CheckoutView.as_view(), name='checkout'),
]