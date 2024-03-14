from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class CustomUser(AbstractUser):
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
