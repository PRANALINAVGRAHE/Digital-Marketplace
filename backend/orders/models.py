from django.db import models

# Create your models here.
from django.conf import settings

from products.models import Product


class Order(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name="orders"
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.COMPLETED
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["buyer", "product"],
                name="unique_buyer_product",
            )
        ]

    def __str__(self):
        return f"Order #{self.id} - {self.product.title}"