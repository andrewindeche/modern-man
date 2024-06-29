from rest_framework import serializers
from .models import Product, Cart, Order, CoverImages, MpesaTransaction,CartItem,Customer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail
from django.conf import settings
from .utils.utils import send_verification_email, generate_verification_code

class ProductSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = fields = '__all__'
        
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def get_discounted_price(self, obj):
        return obj.apply_discount()

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        
class EmailSerializer(serializers.Serializer):
    to = serializers.EmailField()
    subject = serializers.CharField(max_length=255)
    text = serializers.CharField()
        
class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)

    def validate_product_id(self, value):
        try:
            Product.objects.get(id=value)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found")
        return value

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'subtotal']
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CoverImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverImages
        fields = ('id', 'title', 'image')
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['username', 'email', 'password', 'name', 'location', 'city', 'country']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        verification_code = generate_verification_code()
        user = Customer.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            location=validated_data.get('location', ''),
            city=validated_data.get('city', ''),
            country=validated_data.get('country', ''),
            verification_code=verification_code
        )
        send_verification_email(validated_data['email'], verification_code)
        send_mail(
            'Welcome to Modern Man',
            'Your account has been created successfully!',
            settings.EMAIL_HOST_USER,
            [validated_data['email']],
            fail_silently=False,
        )
        return Customer
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)
    
class ChargeSerializer(serializers.Serializer):
    stripe_token = serializers.CharField(max_length=255)
    amount = serializers.IntegerField()
    currency = serializers.CharField(max_length=3, default='usd')
    description = serializers.CharField(max_length=255, required=False)
    
class MpesaTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaTransaction
        fields = '__all__'
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = Customer
        fields = ('username', 'email',  'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        return Customer.objects.create_user(**validated_data)