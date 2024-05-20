from rest_framework import serializers
from .models import Product, Cart, Order, ButtonImages, CoverImages, VerificationCode
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProductSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = fields = '__all__'

    def get_discounted_price(self, obj):
        return obj.apply_discount()

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CoverImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverImages
        fields = ('id', 'title', 'image')

class ButtonImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ButtonImages
        fields = ('id', 'title', 'image')
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)