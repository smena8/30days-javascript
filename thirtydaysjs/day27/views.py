from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'day27/index.html', {'app_name': 'day27'})
