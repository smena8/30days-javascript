from django.urls import path
from . import views

app_name='Day7'
urlpatterns = [
    path('', views.index, name='Index'),
]
