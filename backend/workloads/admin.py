from django.contrib import admin
from .models import WeeklyRecord

@admin.register(WeeklyRecord)
class WeeklyRecordAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'week_start_date', 'percentage_allocated', 'hours_calculated')
    list_filter = ('week_start_date', 'project', 'user')
    search_fields = ('user__username', 'project__name')
