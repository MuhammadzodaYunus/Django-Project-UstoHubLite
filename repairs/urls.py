from django.urls import path
from . import views

urlpatterns = [
    path('', views.repair_list_view, name="repair_list"),
    path('create/', views.repair_create_view, name="repair_create"),
    path('<int:pk>/', views.repair_detail_view, name="repair_detail"),
    path('<int:pk>/edit/', views.repair_update_view, name="repair_update"),
    path('<int:pk>/delete/', views.repair_delete_view, name="repair_delete"),
    path('professional/requests/', views.professional_request_list_view, name='professional_request_list'),
    path("<int:pk>/accept/", views.professional_accept_request_view, name="professional_accept_request"),
    path('professional/assigned/', views.professional_assigned_request_list_view, name='professional_assigned_request_list'),
    path("<int:pk>/complete/", views.professional_complete_request_view, name="professional_complete_request"),
    path("professional/completed/",views.professional_completed_request_list_view,name="professional_completed_request_list",),
]

