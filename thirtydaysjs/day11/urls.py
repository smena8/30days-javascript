from django.urls import path
from . import views

app_name = 'Day11'
urlpatterns = [
    path('', views.index, name='index')
]
