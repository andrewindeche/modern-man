# Generated by Django 5.0.6 on 2024-05-20 13:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0029_product_added_by_admin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='added_by_admin',
        ),
    ]
