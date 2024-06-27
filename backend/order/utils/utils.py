# utils.py
import requests
import random

SMTP_BUCKET_URL = 'https://www.smtpbucket.com/api/v1/messages'

def send_verification_email(email, code):
    email_data = {
        "to": email,
        "from": "no-reply@example.com",
        "subject": "Your Verification Code",
        "text": f"Your verification code is {code}"
    }
    response = requests.post(SMTP_BUCKET_URL, json=email_data)
    if response.status_code != 201:
        raise Exception('Failed to send email')
    
def generate_verification_code():
    return random.randint(100000, 999999)
