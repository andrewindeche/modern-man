from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Customer(AbstractUser):
    name = models.CharField(_('Name'), max_length=150)
    email = models.EmailField(_('Email address'), unique=True)
    location = models.CharField(_('Location'), max_length=255)
    city = models.CharField(_('City'), max_length=100)
    country = models.CharField(_('Country'), max_length=100)
    
    PAYMENT_METHOD_CHOICES = (
        ('visa', 'Visa'),
        ('mpesa', 'M-Pesa'),
        ('paypal', 'PayPal'),
    )
    payment_method = models.CharField(_('Payment Method'), max_length=20, choices=PAYMENT_METHOD_CHOICES)
    
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        related_name='customers'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        related_name='customers'
    )
    
    def __str__(self):
        return self.username
    
class Category(models.Model):
    CATEGORY_CHOICES = [
        ('suits', 'Suits'),
        ('shirts', 'Shirts'),
        ('neckwear', 'Neckwear & Accessories'),
        ('shoes', 'Shoes')
    ]
    name = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.get_name_display()
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    added_by_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderItem')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_ordered = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Order #{self.pk}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"Order Item #{self.pk} for {self.order}"
    
class Cart(models.Model):
    user = models.OneToOneField(Customer, on_delete=models.CASCADE)
    items = models.ManyToManyField('Product', through='CartItem')

    def __str__(self):
        return f"Shopping Cart for {self.user.username}"
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"CartItem for {self.product.name} in {self.cart}"