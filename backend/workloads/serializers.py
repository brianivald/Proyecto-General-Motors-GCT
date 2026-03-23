from rest_framework import serializers
from .models import WeeklyRecord

class WeeklyRecordSerializer(serializers.ModelSerializer):
    project_name = serializers.ReadOnlyField(source='project.name')
    user_name = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = WeeklyRecord
        fields = ['id', 'user', 'user_name', 'project', 'project_name', 'week_start_date', 'percentage_allocated', 'hours_calculated']
