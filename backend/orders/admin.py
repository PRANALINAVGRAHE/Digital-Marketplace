from django.contrib import admin

# Register your models here.
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "buyer",
        "product",
        "price",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "buyer__username",
        "product__title",
    )

    ordering = (
        "-created_at",
    )