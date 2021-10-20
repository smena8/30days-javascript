from django.urls import path
from . import views

app_name = 'Day9'
urlpatterns = [
    path('', views.index, name='Index'),
]
