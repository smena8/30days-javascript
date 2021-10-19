from django.urls import path
from . import views

app_name = 'Day6'
urlpatterns = [
    path('', views.index, name='Index'),
]
