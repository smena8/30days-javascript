from django.urls import path
from . import views

app_name = 'Day24'
urlpatterns = [
    path('', views.index, name='Index'),
]
