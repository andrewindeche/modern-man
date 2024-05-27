from django.urls import path, include
from .views import CoverImagesViewSet,ProductListCreateAPIView, ProductDetailAPIView, CartCreateAPIView, OrderCreateAPIView,CustomTokenObtainPairView, DoubleAuthView, VerifyCodeView,DiscountedProductListAPIView,ProductSearchView,StripeChargeView,MpesaChargeView,mpesa_callback
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'images', CoverImagesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<str:category>/', ProductListCreateAPIView.as_view(), name='product_list_by_category'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('discounted-products/', DiscountedProductListAPIView.as_view(), name='discounted-products'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    path('cart/add/', CartCreateAPIView.as_view(), name='cart-create'),
    path('cart/checkout/', OrderCreateAPIView.as_view(), name='order-create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('second-step-auth/', DoubleAuthView.as_view(), name='second_step_auth'),
    path('verify-code/', VerifyCodeView.as_view(), name='verify_code'),
    path('stripe/', StripeChargeView.as_view(), name='stripe_charge'),
    path('mpesa/', MpesaChargeView.as_view(), name='mpesa_charge'),
    path('mpesa/callback/', mpesa_callback, name='mpesa_callback'),
] 