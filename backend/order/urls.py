from django.urls import path, include
from .views import CoverImagesViewSet,ProductListCreateAPIView, ProductDetailAPIView,RegisterView,FavoriteListView
from .views import CartCreateAPIView, OrderCreateAPIView,CustomTokenObtainPairView, FavoriteCountView 
from .views import DiscountedProductListAPIView,ProductSearchView,SearchSuggestionsView,CustomTokenObtainPairView
from .views import StripeChargeView,MpesaChargeView,mpesa_callback,get_stripe_public_key,get_mpesa_public_key
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'images', CoverImagesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<str:category>/', ProductListCreateAPIView.as_view(), name='product_list_by_category'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('discounted-products/', DiscountedProductListAPIView.as_view(), name='discounted-products'),
    path('register/', RegisterView.as_view(), name='register'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    path('cart/add/', CartCreateAPIView.as_view(), name='cart-create'),
    path('cart/checkout/', OrderCreateAPIView.as_view(), name='order-create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('stripe/', StripeChargeView.as_view(), name='stripe_charge'),
    path('mpesa/', MpesaChargeView.as_view(), name='mpesa_charge'),
    path('mpesa/callback/', mpesa_callback, name='mpesa_callback'),
    path('stripe-public-key/', get_stripe_public_key, name='stripe-public-key'),
    path('mpesa-public-key/', get_mpesa_public_key, name='mpesa-public-key'),
    path('suggestions/', SearchSuggestionsView.as_view(), name='search_suggestions'),
    path('send-email/', views.send_email, name='send_email'),
    path('favorites/', FavoriteListView.as_view(), name='favorite_list'),
    path('favorites/count/', FavoriteCountView.as_view(), name='favorite_count'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), 
] 