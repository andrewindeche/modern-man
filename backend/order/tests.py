from django.test import TestCase
from .models import Product, Order, CartItem, OrderItem, Cart, Customer, Category

class TestShopping(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Suits")
        self.product = Product.objects.create(
            name="Test Product",
            description="Test Description",
            price=100.0,
            category=self.category
        )
        
    def test_product_created(self):
        """Test that a product can be created"""
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(self.product.name, "Test Product")
        
    def test_product_price(self):
        """Test product price is correct"""
        self.assertEqual(self.product.price, 100.0)
        
    def test_product_with_category(self):
        """Test product is linked to category"""
        self.assertEqual(self.product.category, self.category)

    def test_discount_calculation(self):
        """Test discount calculation"""
        self.product.is_discounted = True
        self.product.discount_percentage = 10
        self.product.save()
        
        discounted = self.product.discounted_price
        expected = 90.0  # 100 - 10%
        self.assertEqual(discounted, expected)