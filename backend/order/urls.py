from django.urls import path, include
from .views import CoverImagesViewSet,ButtonImagesViewSet,ProductListCreateAPIView, ProductDetailAPIView, CartCreateAPIView, OrderCreateAPIView,CustomTokenObtainPairView, DoubleAuthView, VerifyCodeView, HighestDiscountProduct,DiscountedProductListAPIView,ProductSearchView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'images', CoverImagesViewSet)
router.register(r'button-images', ButtonImagesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<str:category>/', ProductListCreateAPIView.as_view(), name='product_list_by_category'),
    path('highest-discount-product/', HighestDiscountProduct.as_view(), name='highest-discount-products'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('discounted-products/', DiscountedProductListAPIView.as_view(), name='discounted-products'),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    path('cart/add/', CartCreateAPIView.as_view(), name='cart-create'),
    path('cart/checkout/', OrderCreateAPIView.as_view(), name='order-create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('second-step-auth/', DoubleAuthView.as_view(), name='second_step_auth'),
    path('verify-code/', VerifyCodeView.as_view(), name='verify_code'),
] 