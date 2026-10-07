from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from products.models import Product

from .models import Order
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import OrderSerializer

from django.http import FileResponse


class PurchaseProductAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def create(self, request, *args, **kwargs):
        product = get_object_or_404(
            Product,
            id=kwargs["product_id"],
            is_active=True,
        )

        if product.seller == request.user:
            return Response(
                {
                    "detail": "You cannot purchase your own product."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Order.objects.filter(
            buyer=request.user,
            product=product,
            status=Order.Status.COMPLETED,
        ).exists():
            return Response(
                {
                    "detail": "You already purchased this product."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = Order.objects.create(
            buyer=request.user,
            product=product,
            price=product.price,
            status=Order.Status.COMPLETED,
        )

        serializer = self.get_serializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


class MyPurchasesAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Order.objects.filter(
            buyer=self.request.user
        ).select_related(
            "product",
            "buyer",
        )


class MySalesAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Order.objects.filter(
            product__seller=self.request.user
        ).select_related(
            "product",
            "buyer",
        )

class DownloadProductAPIView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, order_id):
        order = get_object_or_404(
            Order.objects.select_related("product"),
            id=order_id,
            buyer=request.user,
            status=Order.Status.COMPLETED,
        )

        product = order.product

        if not product.digital_file:
            return Response(
                {
                    "detail": "Digital file is not available."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        return FileResponse(
            product.digital_file.open("rb"),
            as_attachment=True,
            filename=product.digital_file.name.split("/")[-1],
        )

class OrderDownloadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):

        try:
            order = Order.objects.select_related("product").get(
                id=order_id,
                buyer=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        product = order.product

        if not product.digital_file:
            return Response(
                {"detail": "Digital file is not available for this product."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            file = product.digital_file.open("rb")

            filename = product.digital_file.name.split("/")[-1]

            return FileResponse(
                file,
                as_attachment=True,
                filename=filename
            )

        except FileNotFoundError:
            return Response(
                {"detail": "The digital file could not be found."},
                status=status.HTTP_404_NOT_FOUND
            )