from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist


# Create your models here.
class Customer(AbstractUser):
    name = models.CharField(_('Name'), max_length=150)
    email = models.EmailField(_('Email address'), unique=True)
    location = models.CharField(_('Location'), max_length=255, blank=True)
    city = models.CharField(_('City'), max_length=100, blank=True)
    country = models.CharField(_('Country'), max_length=100, blank=True)
    favorites = models.ManyToManyField('Product', related_name='favorited_by', blank=True)
    products = models.ManyToManyField('Product', related_name='customers')
    
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
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
    )

    def add_order(self, order):
        self.orders.add(order)
        
    def create_order(self):
        """Creates an empty order for the customer."""
        order = Order.objects.create(user=self)
        return order

    def add_to_cart(self, product, quantity=1):
        try:
            cart, created = Cart.objects.get_or_create(user=self)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if created:
                cart_item.quantity = quantity
            else:
                cart_item.quantity += quantity
            cart_item.subtotal = cart_item.quantity * product.price
            cart_item.save()
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
        except ObjectDoesNotExist:
            raise ValueError("The product does not exist.")
    
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
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    is_discounted = models.BooleanField(default=False)
    discount_percentage = models.PositiveIntegerField(default=0, help_text="Percentage of the discount")
    
    def apply_discount(self):
        if self.is_discounted:
            return self.price * (100 - self.discount_percentage) / 100
        return self.price

    def __str__(self):
        return f"{self.name} - ${self.price}"
    
    @classmethod
    def create_product(cls, name, description, price, category, image=None, added_by_admin=False, average_rating=0.00, is_discounted=False, discount_percentage=0):
        return cls.objects.create(
            name=name,
            description=description,
            price=price,
            category=category,
            image=image,
            added_by_admin=added_by_admin,
            average_rating=average_rating,
            is_discounted=is_discounted,
            discount_percentage=discount_percentage
        )
    def is_favorited_by(self, user):
        return self.favorited_by.filter(id=user.id).exists()

class Order(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    products = models.ManyToManyField(Product, through='OrderItem')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_ordered = models.BooleanField(default=False)
    
    def get_total(self):
        total = 0
        items = self.orderitem_set.all() 
        for item in items:
            if item.product.is_discounted:
                discount = (item.product.price * item.product.discount_percentage) / 100
                total += (item.product.price - discount) * item.quantity
            else:
                total += item.product.price * item.quantity
        return total
    
    def __str__(self):
        return f"Order #{self.pk}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    
    def save(self, *args, **kwargs):
        if not self.subtotal:
            self.subtotal = self.quantity * self.product.apply_discount()
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"Order Item #{self.pk} for {self.order}"
    
class Cart(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='carts')
    products = models.ManyToManyField(Product, through='CartItem')
    
    def __str__(self):
        return f"{self.user.username}'s Cart"
    
    @transaction.atomic
    def add_product(self, product):
        cart_item, created = CartItem.objects.get_or_create(cart=self, product=product)
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        else:
            cart_item.quantity = 1
            cart_item.subtotal = product.price
            cart_item.save()

    @transaction.atomic
    def remove_product(self, product):
        CartItem.objects.filter(cart=self, product=product).delete()
    
    @transaction.atomic
    def checkout(self):
        """Transforms all cart items into an order."""
        order = self.user.create_order()
        for item in self.cartitem_set.all():
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, subtotal=item.subtotal)
        self.cartitem_set.all().delete()
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if not self.subtotal: 
            self.subtotal = self.quantity * self.product.price
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"CartItem for {self.product.name} in {self.cart}"
    
class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])

    def __str__(self):
        return f"Rating {self.rating} by {self.user.username} for {self.product.name}"