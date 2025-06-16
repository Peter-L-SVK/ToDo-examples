from django.urls import path
from . import views

urlpatterns = [
    path('api/csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('api/tasks/', views.task_list, name='task_list'),
    path('api/tasks/<uuid:pk>/', views.task_detail, name='task_detail'),
]
