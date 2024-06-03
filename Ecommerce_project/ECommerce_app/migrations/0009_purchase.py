# Generated by Django 5.0.3 on 2024-06-02 07:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ECommerce_app', '0008_products_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('address', models.TextField()),
                ('payment_options', models.CharField(max_length=100)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ECommerce_app.products')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ECommerce_app.login')),
            ],
        ),
    ]
