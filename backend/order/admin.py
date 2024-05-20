from django.contrib import admin
from .models import Customer,Category,Product,Order,Cart,OrderItem,CartItem,CoverImages,ButtonImages

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category', 'image', 'is_discounted', 'discount_percentage']
    search_fields = ['name', 'description']
    readonly_fields = ['discounted_price'] 
    
# Register your models here.
admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Product,ProductAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(CoverImages)
admin.site.register(ButtonImages)

