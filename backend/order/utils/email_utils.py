# utils.py
from django.core.mail import send_mail

def send_email(email):
    subject = 'Special Discount Offer!'
    message = f'Hi there,\n\nWe are pleased to offer you a 20% discount on our products. Don`t miss out!'
    sender = 'your_email@example.com' 
    send_mail(subject, message, sender, [email])