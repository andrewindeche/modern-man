import requests
from requests.auth import HTTPBasicAuth
from django.conf import settings
import datetime
import base64
import json
from django.http import JsonResponse
from django.contrib.auth.models import User as DjangoUser 
from order.models import MpesaTransaction, Customer

def get_mpesa_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    if settings.MPESA_ENV == 'production':
        api_url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    json_response = response.json()
    access_token = json_response.get('access_token')
    return access_token

def lipa_na_mpesa_online(phone_number, amount, account_reference, transaction_desc):
    access_token = get_mpesa_access_token()
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    if settings.MPESA_ENV == 'production':
        api_url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode(f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}".encode()).decode('utf-8')
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": "https://example.com/callback",
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()

def process_mpesa_callback(request):
    data = json.loads(request.body.decode('utf-8'))
    callback_data = data['Body']['stkCallback']
    
    phone_number = callback_data['CallbackMetadata']['Item'][4]['Value']
    amount = callback_data['CallbackMetadata']['Item'][0]['Value']
    transaction_id = callback_data['CallbackMetadata']['Item'][1]['Value']
    status = callback_data['ResultDesc']
    
    user = Customer.objects.first() 

    MpesaTransaction.objects.create(
        user=user,
        phone_number=phone_number,
        amount=amount,
        transaction_id=transaction_id,
        status=status
    )

    return JsonResponse({"status": "success"})