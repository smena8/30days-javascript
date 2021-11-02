from django.urls import path
from . import views

app_name = 'Day20'
urlpatterns = [
    path('', views.index, name='Index'),
]
