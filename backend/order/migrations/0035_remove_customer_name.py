# Generated by Django 5.0.6 on 2024-06-27 18:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0034_alter_customer_managers_customer_verification_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='name',
        ),
    ]
