import requests
from django.conf import settings

class AfricaTalkingSMS:
    def __init__(self):
        self.username = getattr(settings, 'AT_USERNAME', 'sandbox')
        self.api_key = getattr(settings, 'AT_API_KEY', '')
        self.base_url = 'https://api.africastalking.com/version1'
        
    def send_sms(self, phone_number, message):
        """Send SMS to a phone number"""
        if not self.api_key:
            print('AT_API_KEY not configured - SMS skipped')
            return {'status': 'error', 'message': 'AT_API_KEY not configured'}
        
        url = f"{self.base_url}/messaging"
        headers = {
            'ApiKey': self.api_key,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
        
        # Ensure phone number is in format 254712345678
        if phone_number.startswith('+'):
            phone_number = phone_number[1:]
        if phone_number.startswith('0'):
            phone_number = '254' + phone_number[1:]
            
        data = {
            'username': self.username,
            'to': phone_number,
            'message': message
        }
        
        try:
            response = requests.post(url, data=data, headers=headers)
            return response.json()
        except Exception as e:
            return {'status': 'error', 'message': str(e)}

def send_order_sms(phone_number, order_details):
    """Send order confirmation SMS"""
    sms = AfricaTalkingSMS()
    message = f"ModernMan Order Confirmation\n"
    message += f"Order ID: {order_details.get('order_id', 'N/A')}\n"
    message += f"Amount: KES {order_details.get('amount', 0)}\n"
    message += f"Thank you for shopping with us!"
    
    return sms.send_sms(phone_number, message)

def send_payment_sms(phone_number, amount, status):
    """Send payment notification SMS"""
    sms = AfricaTalkingSMS()
    message = f"ModernMan Payment {status}\n"
    message += f"Amount: KES {amount}\n"
    
    if status.lower() == 'success':
        message += "Your payment was received. Order processing..."
    else:
        message += "Payment failed. Please try again."
    
    return sms.send_sms(phone_number, message)