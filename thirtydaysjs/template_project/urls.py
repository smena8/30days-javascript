from django.urls import path
from . import views

app_name = '{{ camel_case_app_name }}'
urlpatterns = [
    path('', views.index, name='Index'),
]
