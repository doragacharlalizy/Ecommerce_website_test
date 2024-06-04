from rest_framework import serializers
from .models import Login, Classifications, Products, CartItem,Purchase

class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = '__all__'

    def get_id(self, obj):
        return obj.id


    def get_product(self, cart_item):
        product = cart_item.product
        return {
            'id': product.id,
            'name': product.name,  # Assuming name is the field for product name
            'price': product.price,
            'image_url': self.context['request'].build_absolute_uri(product.image.url) if product.image else None
        }
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ['id', 'user', 'product', 'quantity', 'address', 'payment_options']
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

class ClassificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classifications
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'
