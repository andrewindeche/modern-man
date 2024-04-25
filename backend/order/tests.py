from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from .models import Product, Order,CartItem,OrderItem, Cart, Customer
import unittest

Customer = get_user_model()

# Create your tests here.
class TestShopping(unittest.TestCase):
    def setUp(self):
        Customer = get_user_model()
        Customer.objects.filter(username__in=['userx', 'non_admin']).delete()
        self.user = Customer.objects.create_user(username='testuser', email='testuser@example.com', password='testpassword')
        self.product = Product.objects.create(name="Test Product", price=10.0)
        self.cart = Cart.objects.create(user=self.user)
        self.cart.products.add(self.product)
        self.cart.products.clear()
        
    def test_create_user(self):
        # Ensure unique username by appending a timestamp, UUID, or using a unique attribute
        import uuid
        username = f"non_admin_{uuid.uuid4().hex}"
        self.assertEqual(self.user.email, 'testuser@example.com')
        Customer.objects.create_user(username=username, email=f"{username}@example.com")
        
    def test_user_creation(self):
        Customer.objects.create_user(username='userx', email='userx@example.com')
        Customer.objects.create_user(username='non_admin', email='non_admin@example.com')

    def test_create_duplicate_user(self):
        username = "testuser"
        Customer.objects.create_user(username=username, email="testuser1@example.com")
        with self.assertRaises(IntegrityError):
            # This should raise an IntegrityError because the username is the same
            Customer.objects.create_user(username=username, email="testuser2@example.com")
        
    def test_duplicate_username(self):
        """Test creating a user with a duplicate username to see if it raises IntegrityError."""
        with self.assertRaises(IntegrityError):
            Customer.objects.create_user('non_admin', 'another_email@example.com')

    def test_duplicate_email(self):
        """Test creating a user with a duplicate email to see if it raises IntegrityError."""
        with self.assertRaises(IntegrityError):
            Customer.objects.create_user('new_user', 'non_admin@example.com')
        
    def test_user_can_pick_product(self):
        customer = Customer("test_customer")
        self.assertEqual(len(customer.cart), 0)  # Customer's cart should be empty initially
        customer.add_to_cart(Product("Test Product", 10.0))
        self.assertEqual(len(customer.cart), 1)  # After adding a product, cart should have one item
        pass
        
    def test_user_can_add_order(self):
        self.assertEqual(self.user.orders.count(), 0)
        self.assertEqual(self.user.orders.count(), 1)
        self.assertEqual(len(self.user.orders), 0)  # User's orders should be empty initially
        self.cart.add_product(self.product)
        self.cart.checkout()  # Use the checkout method to add an order
        self.assertEqual(len(self.user.orders), 1)  # After checkout, user should have one order

    def test_user_can_put_product_into_cart(self):
        self.assertEqual(len(self.cart.products), 0)  # Cart should be empty initially
        self.cart.add_product(self.product)
        self.assertEqual(len(self.cart.products), 1)  # After adding a product, cart should have one item
        pass
    def test_add_to_cart(self):
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=2)
        self.assertEqual(self.cart.cartitem_set.count(), 1)
        self.assertEqual(self.cart.cartitem_set.first().quantity, 2)

    def test_apply_discount(self):
        self.product.is_discounted = True
        self.product.discount_percentage = 10
        self.product.save()
        discounted_price = self.product.apply_discount()
        self.assertEqual(discounted_price, 90.00)

    def test_order_total_with_discount(self):
        order = Order.objects.create(user=self.user)
        OrderItem.objects.create(order=order, product=self.product, quantity=1)
        self.product.is_discounted = True
        self.product.discount_percentage = 10
        self.product.save()
        total = order.get_total()
        self.assertAlmostEqual(total, 90.00)

class TestProductCreation(unittest.TestCase):      
    def test_non_admin_cannot_create_product(self):
        try:
            non_admin_user = Customer.objects.create(username="non_admin")
            print("Non-admin user:", non_admin_user)  # Debugging: Print the non-admin user
            product_name = "Test Product"
            product_price = 10.0
            product_description = "This is a test product."

            # Attempt to create a product using the non-admin user
            product = Product.create_product(non_admin_user, product_name, product_price, product_description)
            print("Created product:", product)  # Debugging: Print the created product

            # Assert that the product creation fails (returns None)
            self.assertIsNone(product)
        except Exception as e:
            print(e)

if __name__ == '__main__':
    unittest.main()
