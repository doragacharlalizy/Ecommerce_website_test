from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

from .views import (
    LoginListCreateAPIView, LoginRetrieveUpdateDestroyAPIView,
    ClassificationsListCreateAPIView, ClassificationsRetrieveUpdateDestroyAPIView,
    ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView,
    ProductListByClassificationAPIView, ProductDetailAPIView,  
    UploadImages,ImageListAPIView,CustomLoginView,PurchaseListByUserAPIView,ProductSearchAPIView,CartItemCreateView, CartItemUpdateView, CartItemDeleteView,CartWithProductAPIView,AllCartItemsAPIView,CartbyId,PurchaseListCreateView,PurchaseDetailView
)

urlpatterns = [
    path('logins/', LoginListCreateAPIView.as_view(), name='login-list'),
    path('logins/<int:pk>/', LoginRetrieveUpdateDestroyAPIView.as_view(), name='login-detail'),
    path('classifications/', ClassificationsListCreateAPIView.as_view(), name='classification-list'),
    path('classifications/<int:pk>/', ClassificationsRetrieveUpdateDestroyAPIView.as_view(), name='classification-detail'),
    path('products/', ProductListCreateAPIView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('products/classification/<int:classification_id>/', ProductListByClassificationAPIView.as_view(), name='product_list_classification'),
    path('products/<int:pk>/update/', ProductDetailAPIView.as_view(), name='product-update'), 
    path('products/<int:pk>/delete/', ProductDetailAPIView.as_view(), name='product-delete'),  
    path('images/', ImageListAPIView.as_view(), name='image-list'),
    path('login/', CustomLoginView.as_view(), name='custom-login'),
 path('cart/add/', CartItemCreateView.as_view(), name='cart-add'),
    path('cart/update/<int:pk>/', CartItemUpdateView.as_view(), name='cart-update'),
    path('cart/delete/<int:pk>/', CartItemDeleteView.as_view(), name='cart-delete'),
    path('api/upload-images/', UploadImages.as_view(), name='upload_images'),  
    path('cart/user/<int:user_id>/', CartWithProductAPIView.as_view(), name='cart-user'),
path('cart/all/', AllCartItemsAPIView.as_view(), name='cart-all'),
path('carts/<int:pk>/', CartbyId.as_view(), name='cart-by-id'),
    path('products/', ClassificationsRetrieveUpdateDestroyAPIView.as_view(), name='products'),
    path('purchases/', PurchaseListCreateView.as_view(), name='purchase-list'),
    path('purchases/<int:pk>/', PurchaseDetailView.as_view(), name='purchase-detail'),
    path('search/', ProductSearchAPIView.as_view(), name='search'),
    path('purchases/user/<int:user_id>/', PurchaseListByUserAPIView.as_view(), name='purchase-list-by-user'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
