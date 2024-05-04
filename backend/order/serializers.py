from rest_framework import serializers
from .models import Product, Cart, Order, ButtonImages, CoverImages

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

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