from django.urls import path
from . import views

app_name = 'Day29'
urlpatterns = [
    path('', views.index, name='Index'),
]
