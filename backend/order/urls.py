from django.urls import path, include
from .views import CoverImagesViewSet,ButtonImagesViewSet,ProductListCreateAPIView, ProductDetailAPIView, CartCreateAPIView, OrderCreateAPIView,CustomTokenObtainPairView, DoubleAuthView, VerifyCodeView, HighestDiscountProduct,DiscountedProductListAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'images', CoverImagesViewSet)
router.register(r'button-images', ButtonImagesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<str:category>/', ProductListCreateAPIView.as_view(), name='product_list_by_category'),
    path('products/highest-discount-product', HighestDiscountProduct.as_view(), name='highest-discount-product'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('products/discounted-products', DiscountedProductListAPIView.as_view(), name='discounted-products'),
    path('cart/add/', CartCreateAPIView.as_view(), name='cart-create'),
    path('cart/checkout/', OrderCreateAPIView.as_view(), name='order-create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('second-step-auth/', DoubleAuthView.as_view(), name='second_step_auth'),
    path('verify-code/', VerifyCodeView.as_view(), name='verify_code'),
] 