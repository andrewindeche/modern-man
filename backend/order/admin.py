from django.contrib import admin
from .models import Customer,Category,Product,Order,Cart,OrderItem,CartItem,CoverImages,MpesaTransaction

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

