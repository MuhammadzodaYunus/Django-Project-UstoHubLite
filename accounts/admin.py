from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = ['username', 'email', 'phone_number', 'user_type', 'is_staff', 'is_active']
    search_fields = ['username', 'email', 'phone_number']
    list_filter = ['user_type', 'is_staff', 'is_active']

    fieldsets =  UserAdmin.fieldsets + (
        (
            "UstoHub information",
            {"fields": ('phone_number', 'user_type',)},
        ),
    )


    add_fieldsets =  UserAdmin.add_fieldsets + (
        (
            "UstoHub information",
            {"fields": ('email', 'phone_number', 'user_type',)},
        ),
    )