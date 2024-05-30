from django.contrib import admin
from .models import Customer,Category,Product,Order,Cart,OrderItem,CartItem,CoverImages,MpesaTransaction
from .utils.email_utils import send_email
from .forms import EmailMessageForm
from django.core.mail import EmailMessage

def send_email_action(modeladmin, request, queryset):
    form = EmailMessageForm(request.POST)
    if form.is_valid():
        subject = form.cleaned_data['subject']
        body = form.cleaned_data['body']
        
        for customer in queryset:
            message = f"Dear {customer.username},\n\n{body}"
            email = EmailMessage(subject, message, to=[customer.email])
            email.send()

send_email_action.short_description = "Send Email"

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category', 'image', 'discount_percentage']
    search_fields = ['name', 'description']
    readonly_fields = ['discounted_price'] 
    
class MpesaTransactionAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'amount', 'transaction_id', 'status', 'transaction_date')
    search_fields = ('user__username', 'phone_number', 'transaction_id', 'status')
    list_filter = ('status', 'transaction_date')
    
# Register your models here.
admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Product,ProductAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(CoverImages)
admin.site.register(MpesaTransaction, MpesaTransactionAdmin)

