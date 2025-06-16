from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer, CreateTaskSerializer, UpdateTaskSerializer

@api_view(['GET'])
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})

@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CreateTaskSerializer(data=request.data)
        if serializer.is_valid():
            task = Task.objects.create(title=serializer.validated_data['title'])
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = UpdateTaskSerializer(data=request.data)
        if serializer.is_valid():
            if 'title' in serializer.validated_data:
                task.title = serializer.validated_data['title']
            if 'completed' in serializer.validated_data:
                task.completed = serializer.validated_data['completed']
            task.save()
            return Response(TaskSerializer(task).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
