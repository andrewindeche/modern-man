import random
from rest_framework import generics, viewsets,status
from django.utils import timezone
from rest_framework.response import Response
from .utils.utils import send_verification_email
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product, Order, Cart, CoverImages, VerificationCode,ProductDiscountFilter
from .serializers import ProductSerializer, CustomTokenObtainPairSerializer, CartSerializer, OrderSerializer, CoverImagesSerializer,EmailSerializer, VerifyCodeSerializer, ChargeSerializer, MpesaTransactionSerializer
from .utils.mpesa_utils import lipa_na_mpesa_online 
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.csrf import csrf_exempt
from .utils.mpesa_utils import process_mpesa_callback


stripe.api_key = settings.STRIPE_SECRET_KEY

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
    
class ProductSearchView(generics.GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query', '')
        products = Product.objects.filter(name__icontains=query)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
class DiscountedProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = ProductDiscountFilter

    def get_queryset(self):
        return Product.objects.filter(discount_percentage__gt=0)
        
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
    
class StripeChargeView(generics.GenericAPIView):
    serializer_class = ChargeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stripe_token = serializer.validated_data['stripe_token']
        amount = serializer.validated_data['amount']
        currency = serializer.validated_data['currency']
        description = serializer.validated_data.get('description', 'A Django charge')

        try:
            charge = stripe.Charge.create(
                amount=amount,
                currency=currency,
                description=description,
                source=stripe_token,
            )
            return Response({'charge': charge}, status=status.HTTP_200_OK)
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MpesaChargeView(generics.GenericAPIView):
    serializer_class = MpesaTransactionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data.get('phone_number')
            amount = serializer.validated_data.get('amount')
            account_reference = serializer.validated_data.get('account_reference', 'Test123')
            transaction_desc = serializer.validated_data.get('transaction_desc', 'Payment for XYZ')

            # Initiate the M-Pesa transaction
            response = lipa_na_mpesa_online(phone_number, amount, account_reference, transaction_desc)

            # Save transaction in the database
            if response.get('ResponseCode') == '0':  # assuming '0' is success
                serializer.save(status='Success')
            else:
                serializer.save(status='Failed')

            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
def mpesa_callback(request):
    return process_mpesa_callback(request)