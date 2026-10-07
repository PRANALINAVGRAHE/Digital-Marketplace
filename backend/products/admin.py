from django.contrib import admin

# Register your models here.
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "seller",
        "price",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "seller__username",
    )

    ordering = (
        "-created_at",
    )