from django.urls import path
from . import views

app_name = 'Day15'

urlpatterns = [
    path('', views.index, name="Index"),
]