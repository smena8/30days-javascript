from django.urls import path
from . import views

app_name = 'Day30'
urlpatterns = [
    path('', views.index, name='Index'),
]
