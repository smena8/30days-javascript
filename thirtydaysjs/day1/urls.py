from django.urls import path

from . import views

app_name = "Day1"

urlpatterns = [
    path('', views.index, name='Index')
]
