from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    buyer_name = serializers.CharField(
        source="buyer.username",
        read_only=True
    )

    product_title = serializers.CharField(
        source="product.title",
        read_only=True
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "buyer",
            "buyer_name",
            "product",
            "product_title",
            "price",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "buyer",
            "price",
            "status",
            "created_at",
        ]