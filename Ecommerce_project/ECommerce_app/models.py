from django.db import models
from django.contrib.postgres.fields import ArrayField

class Login(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  
    confirm_password = models.CharField(max_length=128) 

class Classifications(models.Model):
    classification_name = models.CharField(max_length=255)
  

class Products(models.Model):
    classification = models.ForeignKey(Classifications, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')  
    name = models.TextField(max_length=255, default='')  
    sizes_available = ArrayField(models.CharField(max_length=50))
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    quantity = models.PositiveIntegerField(default=0) 

    def __str__(self):
        return f"{self.name} - {self.classification.classification_name} - Product ID: {self.pk}"
class CartItem(models.Model):
    user = models.ForeignKey(Login, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username}'s Cart - Product ID: {self.product.pk}"
class Purchase(models.Model):
    user = models.ForeignKey(Login, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    address = models.TextField()
    payment_options = models.CharField(max_length=100)  # Assuming you want a text field for payment options

    def __str__(self):
        return f"Purchase: {self.user.username} bought {self.quantity} of {self.product.name}"