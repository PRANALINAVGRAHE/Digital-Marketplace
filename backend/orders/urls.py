from django.urls import path

from .views import (
    DownloadProductAPIView,
    MyPurchasesAPIView,
    MySalesAPIView,
    PurchaseProductAPIView,
    OrderDownloadAPIView,
)


urlpatterns = [
    path(
        "products/<int:product_id>/purchase/",
        PurchaseProductAPIView.as_view(),
        name="purchase-product",
    ),

    path(
        "my-purchases/",
        MyPurchasesAPIView.as_view(),
        name="my-purchases",
    ),

    path(
        "sales/",
        MySalesAPIView.as_view(),
        name="my-sales",
    ),

    path(
        "orders/<int:order_id>/download/",
        OrderDownloadAPIView.as_view(),
        name="order-download",
    ),
]