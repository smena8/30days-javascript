from django.urls import path
from . import views

app_name = 'Day17'
urlpatterns = [
    path('', views.index, name='Index'),
]
