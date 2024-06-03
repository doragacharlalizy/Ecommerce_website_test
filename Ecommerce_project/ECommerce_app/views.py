# views.py
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Login, Classifications, Products, CartItem,Purchase
from .serializers import (
    LoginSerializer,
    ClassificationsSerializer,
    ProductSerializer,
    CartItemSerializer,
    PurchaseSerializer
)
import os
import uuid
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class UploadImages(APIView):
    def post(self, request):
        if not 'image' in request.FILES:
            return Response({'error': 'No image uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        image = request.FILES['image']
        image_id = str(uuid.uuid4())
        file_path = os.path.join(settings.MEDIA_ROOT, 'product_images', f'{image_id}.jpg')

        with open(file_path, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)

        image_url = f'{settings.MEDIA_URL}product_images/{image_id}.jpg'
        product_data = {
            'image': image_url,
            'sizes_available': request.data.getlist('sizes_available'),
            'price': request.data.get('price'),
            'description': request.data.get('description'),
            'classification': request.data.get('classification')
        }
        serializer = ProductSerializer(data=product_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
            userId=serializer.validated_data['id']

        )
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

class ImageListAPIView(APIView):
    def get(self, request):
        image_dir = os.path.join(settings.MEDIA_ROOT, 'product_images')
        image_list = [{'id': os.path.splitext(filename)[0], 'url': os.path.join(settings.MEDIA_URL, 'product_images', filename)}
                      for filename in os.listdir(image_dir) if filename.endswith('.jpg')]
        return Response(image_list)

class LoginListCreateAPIView(generics.ListCreateAPIView):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer

class LoginRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer
class CartbyId(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
class ClassificationsListCreateAPIView(generics.ListCreateAPIView):
    queryset = Classifications.objects.all()
    serializer_class = ClassificationsSerializer

    def create(self, request, *args, **kwargs):
        classification_name = request.data.get('classification_name')

        if Classifications.objects.filter(classification_name=classification_name).exists():
            return Response({'error': 'Classification name already exists'}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)

class CartItemsByUserAPIView(APIView):
    def get(self, request, user_id):
        cart_items = CartItem.objects.filter(user_id=user_id)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

class CartWithProductAPIView(APIView):
    def get(self, request, user_id):
        cart_items = CartItem.objects.filter(user_id=user_id)
        cart_data = []
        for cart_item in cart_items:
            serializer = ProductSerializer(cart_item.product, context={'request': request})
            cart_item_data = {'cart_item_id': cart_item.id, 'quantity': cart_item.quantity, 'product': serializer.data}
            cart_data.append(cart_item_data)
        return Response(cart_data)
class ClassificationsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Classifications.objects.all()
    serializer_class = ClassificationsSerializer

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

class ProductListByClassificationAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        classification_id = self.kwargs['classification_id']
        return Products.objects.filter(classification_id=classification_id)

class ProductDetailAPIView(APIView):
    def put(self, request, pk):
        product = get_object_or_404(Products, pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = get_object_or_404(Products, pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CartItemCreateView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def perform_create(self, serializer):
        # Assuming 'product_id' and 'quantity' are provided in the request data
        product_id = self.request.data.get('product_id')
        quantity = self.request.data.get('quantity')
        user_id=self.request.data.get('user')

        # Create the CartItem instance with the provided data
        serializer.save(product_id=product_id, quantity=quantity,user_id=user_id)

class CartItemUpdateView(generics.UpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class CartItemDeleteView(generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
class AllCartItemsAPIView(APIView):
    def get(self, request):
        cart_items = CartItem.objects.all()
        serializer = CartItemSerializer(cart_items, many=True, context={'request': request})
        return Response(serializer.data)
class PurchaseListCreateView(generics.ListCreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class PurchaseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
class PurchaseListByUserAPIView(APIView):
    def get(self, request, user_id):
        purchases = Purchase.objects.filter(user_id=user_id)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

class ProductSearchAPIView(APIView):
    def get(self, request):
        search_query = request.query_params.get('query')
        if not search_query:
            return Response({'error': 'No search query provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Perform the search based on the query
        classifications = Classifications.objects.filter(classification_name__icontains=search_query)
        serializer = ClassificationsSerializer(classifications, many=True)
        return Response(serializer.data)
