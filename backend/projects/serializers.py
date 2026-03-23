from rest_framework import serializers
from .models import Project, UserProject

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class UserProjectSerializer(serializers.ModelSerializer):
    project_name = serializers.ReadOnlyField(source='project.name')
    user_name = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = UserProject
        fields = ['id', 'user', 'user_name', 'project', 'project_name', 'role_in_project']
