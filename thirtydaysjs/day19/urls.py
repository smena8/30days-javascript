from django.urls import path
from . import views

app_name = 'Day19'
urlpatterns = [
    path('', views.index, name='Index'),
]
