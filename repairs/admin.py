from django.contrib import admin

from .models import RepairRequest


@admin.register(RepairRequest)
class RepairRequestAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "customer",
        "category",
        "urgency",
        "status",
        "created_at",
    ]
    list_filter = ["category", "urgency", "status"]
    search_fields = ["title", "description", "address", "customer__username"]