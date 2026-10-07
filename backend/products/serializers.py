from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(
        source="seller.username",
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "seller",
            "seller_name",
            "title",
            "description",
            "price",
            "image",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "seller",
            "created_at",
            "updated_at",
        ]