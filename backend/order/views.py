from django.views.generic import ListView, DetailView, CreateView
from django.urls import path
from django.db.models import Q
from rest_framework import generics, viewsets
from .models import Product, Order, Cart, CoverImages,ButtonImages
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, CoverImagesSerializer, ButtonImagesSerializer

# Create your views here.
class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = self.queryset
        category_name = self.request.query_params.get('category', None)
        if category_name is not None:
            queryset = queryset.filter(category__name=category_name)
        return queryset

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |  
                Q(description__icontains=search_query)  
            )
        return queryset

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