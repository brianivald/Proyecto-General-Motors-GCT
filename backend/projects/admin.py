from django.contrib import admin
from .models import Project, UserProject

class UserProjectInline(admin.TabularInline):
    model = UserProject
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'start_date', 'estimated_end_date')
    list_filter = ('status',)
    search_fields = ('name',)
    inlines = [UserProjectInline]

@admin.register(UserProject)
class UserProjectAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'role_in_project')
    list_filter = ('project',)
