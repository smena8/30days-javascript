from django.urls import path

from . import views

app_name = "Day2"

urlpatterns = [
    path('', views.index, name='Index')
]
