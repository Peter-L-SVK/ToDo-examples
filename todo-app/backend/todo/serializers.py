from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'completed', 'created_at']

class CreateTaskSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)

class UpdateTaskSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100, required=False)
    completed = serializers.BooleanField(required=False)
