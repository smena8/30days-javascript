from django.urls import path
from . import views

app_name = 'Day16'
urlpatterns = [
    path('', views.index, name='Index'),
]
