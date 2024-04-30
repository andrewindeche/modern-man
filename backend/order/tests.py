from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Product, Order,CartItem,OrderItem, Cart, Customer,Category

class TestShopping(TestCase):
    def setUp(self):
        self.user = Customer.objects.create_user(username='testuser',email='testuser@example.com',password='testpassword')
        self.cart = Cart.objects.create(user=self.user)
        self.category = Category.objects.create(name="Electronics")
        self.product = Product.objects.create(
            name="Test Product", 
            description="Description", 
            price=10.0, 
            category=self.category
    )
        
    def test_user_can_pick_product(self):
        cart = Cart.objects.create(user=self.user)
        self.assertEqual(cart.products.count(), 0) 
        cart.add_product(self.product)
        self.assertEqual(cart.products.count(), 1) 
        pass
        
    def test_user_can_add_order(self):
        self.assertEqual(self.user.orders.count(), 0)
        self.cart.add_product(self.product)
        self.cart.checkout()
        self.assertEqual(self.user.orders.count(), 1) 

    def test_user_can_put_product_into_cart(self):
        self.assertEqual(self.cart.products.count(), 0)
        self.cart.add_product(self.product)
        self.assertEqual(self.cart.products.count(), 1) 
        pass
    
    def test_add_to_cart(self):
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=2)
        self.assertEqual(self.cart.cartitem_set.count(), 1)
        self.assertEqual(self.cart.cartitem_set.first().quantity, 2)
        pass

    def test_apply_discount(self):
        self.product.is_discounted = True
        self.product.discount_percentage = 10
        self.product.save()
        discounted_price = self.product.apply_discount()
        self.assertEqual(discounted_price, 9.00)
        pass

    def test_order_total_with_discount(self):
        order = Order.objects.create(user=self.user)
        OrderItem.objects.create(order=order, product=self.product, quantity=1)
        self.product.is_discounted = True
        self.product.discount_percentage = 10
        self.product.save()
        total = order.get_total()
        self.assertAlmostEqual(total, 9.00)
        pass
    
    def test_user_can_add_product_to_favorites(self):
        self.user.favorites.add(self.product)
        self.assertTrue(self.user.favorites.filter(id=self.product.id).exists())

class TestProductCreation(TestCase):      
    def test_non_admin_cannot_create_product(self):
        try:
            category, created = Category.objects.get_or_create(name="test_product")
            print("Category:", category, "Created:", created)
            non_admin_user = Customer.objects.create(username="non_admin")
            print("Non-admin user:", non_admin_user)  
            product_name = "Test Product"
            product_price = 10.0
            product_description = category
            Product.objects.create(name="Test Product", price=10.00, category=category)
            product = Product.create_product(non_admin_user, product_name, product_price, product_description)

            self.assertIsNone(product)
        except Exception as e:
            print("Expected error:", e)
       