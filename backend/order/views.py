import random
from django.db.models import Q
from rest_framework import generics, viewsets,status
from django.utils import timezone
from django.core.cache import cache
from rest_framework.response import Response
from .utils import send_verification_email
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product, Order, Cart, CoverImages,ButtonImages, VerificationCode
from .serializers import ProductSerializer, CustomTokenObtainPairSerializer, CartSerializer, OrderSerializer, CoverImagesSerializer, ButtonImagesSerializer,EmailSerializer, VerifyCodeSerializer
import logging

logger = logging.getLogger(__name__)

class ProductListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        category_name = self.request.query_params.get('category', None)
        if category_name is not None:
            queryset = queryset.filter(category__name=category_name)
        return queryset

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class DiscountedProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.filter(discount_percentage__gt=0)
        return queryset

class HighestDiscountProduct(generics.GenericAPIView):
    serializer_class = ProductSerializer
    queryset = None  

    def get_queryset(self):
        return Product.objects.all().order_by('-discount_percentage')

    def get(self, request, *args, **kwargs):
        logger.debug("Handling GET request for HighestDiscountProduct")
        queryset = self.get_queryset()
        logger.debug(f"Queryset evaluated: {queryset}")
        highest_discount_product = queryset.first() if queryset.exists() else None
        if highest_discount_product:
            serializer = ProductSerializer(highest_discount_product)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class DoubleAuthView(generics.GenericAPIView):
    serializer_class = EmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        
        verification_code = str(random.randint(100000, 999999))
        
        VerificationCode.objects.update_or_create(
            email=email,
            defaults={'code': verification_code, 'created_at': timezone.now()}
        )
        
        try:
            send_verification_email(email, verification_code)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({"detail": "Verification code sent"}, status=status.HTTP_200_OK)

class VerifyCodeView(generics.GenericAPIView):
    serializer_class = VerifyCodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        
        try:
            verification_code = VerificationCode.objects.get(email=email)
        except VerificationCode.DoesNotExist:
            return Response({"error": "Verification code not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        if verification_code.is_expired():
            return Response({"error": "Verification code expired"}, status=status.HTTP_400_BAD_REQUEST)
        
        if verification_code.code != code:
            return Response({"error": "Invalid verification code"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"detail": "Second step authentication passed"}, status=status.HTTP_200_OK)

class CartCreateAPIView(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class CoverImagesViewSet(viewsets.ModelViewSet):
    queryset = CoverImages.objects.all()
    serializer_class = CoverImagesSerializer
    
class ButtonImagesViewSet(viewsets.ModelViewSet):
    queryset = ButtonImages.objects.all()
    serializer_class = ButtonImagesSerializer