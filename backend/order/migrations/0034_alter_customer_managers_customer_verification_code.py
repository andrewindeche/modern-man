# Generated by Django 5.0.6 on 2024-06-26 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0033_mpesatransaction_transaction_id'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customer',
            managers=[
            ],
        ),
        migrations.AddField(
            model_name='customer',
            name='verification_code',
            field=models.CharField(blank=True, max_length=6, null=True, verbose_name='Verification Code'),
        ),
    ]
