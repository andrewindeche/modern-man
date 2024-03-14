from django.views.generic import ListView, DetailView, CreateView
from django.urls import path
from .models import Product, Order, Cart

# Create your views here.
class ProductListView(ListView):
    model = Product
    template_name = 'product_list.html'

class ProductDetailView(DetailView):
    model = Product
    template_name = 'product_detail.html'

class AddToCartView(CreateView):
    model = Cart
    fields = ['products']
    template_name = 'add_to_cart.html'
    success_url = '/cart/'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

class CheckoutView(CreateView):
    model = Order
    fields = ['products']
    template_name = 'checkout.html'
    success_url = '/thank-you/'

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.instance.is_ordered = True
        return super().form_valid(form)
