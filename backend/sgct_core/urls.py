from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Inyectamos los Endpoints en el router central de Django
    path('api/users/', include('users.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/workloads/', include('workloads.urls')),
]
