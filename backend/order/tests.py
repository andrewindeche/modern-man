from django.test import TestCase
from .models import Product, Order,CartItem, Cart, Customer
import unittest

# Create your tests here.
class TestShopping(unittest.TestCase):
    def setUp(self):
        self.user = Customer.objects.create_user('non_admin', 'non_admin@example.com')
        self.product = Product.objects.create(name="Test Product", price=10.0)
        self.cart = Cart.objects.create(user=self.user)
        self.cart.products.add(self.product)
        self.cart.save() 
        
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
