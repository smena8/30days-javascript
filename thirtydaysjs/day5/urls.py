from django.urls import path
from . import views

app_name = 'Day5'
urlpatterns = [
    path('', views.index, name='Index'),
]
