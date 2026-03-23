from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Información GM (SGCT)', {'fields': ('department', 'weekly_capacity')}),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'department', 'weekly_capacity', 'is_staff')

admin.site.register(User, CustomUserAdmin)
