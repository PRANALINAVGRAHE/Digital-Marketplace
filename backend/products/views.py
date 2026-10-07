from django.db import models
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from .models import Product
from .permissions import IsSellerOrReadOnly
from .serializers import ProductSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    permission_classes = [
        IsSellerOrReadOnly
    ]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "is_active",
        "seller",
    ]

    search_fields = [
        "title",
        "description",
        "seller__username",
    ]

    ordering_fields = [
        "price",
        "created_at",
        "title",
    ]

    ordering = [
        "-created_at"
    ]

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return Product.objects.filter(
                models.Q(is_active=True) |
                models.Q(seller=user)
            ).select_related("seller")

        return Product.objects.filter(
            is_active=True
        ).select_related("seller")

    def perform_create(self, serializer):
        serializer.save(
            seller=self.request.user
        )

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated])
    def mine(self, request):
        products = Product.objects.filter(
            seller=request.user
        ).select_related("seller")

        serializer = self.get_serializer(
            products,
            many=True
        )

        return Response(serializer.data)