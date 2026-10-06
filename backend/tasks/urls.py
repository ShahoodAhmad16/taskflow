from django.urls import path
from .views import task_list, delete_task, update_task


urlpatterns = [
    path('tasks/', task_list),
    path('tasks/<int:task_id>/', delete_task),
    path('tasks/<int:task_id>/update/', update_task),
]
